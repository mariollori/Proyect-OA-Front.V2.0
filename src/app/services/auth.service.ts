import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';

import { Usuario } from '../models/Usuario';
import { ImagenService } from './imagen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlEndpoint = "http://localhost:5050/EX3/auth";

  constructor(private http: HttpClient,private image:ImagenService) { }
  private _usuario: Usuario;
  private _rol:Rol[];
  private _token :string;

  public get usuario():Usuario{
    if(this._usuario!=null){
      return this._usuario;
    }else if(this._usuario==null && sessionStorage.getItem('usuario')){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
     
       return this._usuario;
    }
    return null;

  }
  public get rol():Rol[]{
    if(this._rol!=null){
      return this._rol;
    }else if(this._rol==null && sessionStorage.getItem('rol')){
      this._rol = JSON.parse(sessionStorage.getItem('rol')) as Rol[] ;
       return this._rol;
    }
    return null;

  }
  public get token():string{
    if(this._token!=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem('token')){
      this._token=sessionStorage.getItem('token')  ;
       return this._token;
    }
    return null;
  }


  login(usuario: Usuario): Observable<any> {
   return this.http.post<any>(this.urlEndpoint + '/login', usuario);
  }

  guardarrol(accestoken:string):void{
    this._rol = new Array();
    let payload =this.obtenerdatostoken(accestoken);
    let data = payload.roles;
    console.log(data)
    
    for (let index = 0; index < data.length; index++) {
      this._rol.push(data[index]);
    }
    
   
    /**no acepta objetos jason por eso con la stringify lo pasamos a texto */
    sessionStorage.setItem('rol',JSON.stringify(this._rol));
  }

  guardarusuario(accestoken:string):void{
    let payload =this.obtenerdatostoken(accestoken);
    let data = payload.usuario;
    this._usuario=new Usuario();
    this._usuario.id = data.idusuario;
    this._usuario.idpersonal = data.idpersonal
    
    
    /**no acepta objetos jason por eso con la stringify lo pasamos a texto */
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));

  }
  guardartoken(accestoken:string):void{
    this._token=accestoken;
    sessionStorage.setItem('token',this._token)
  }
  obtenerdatostoken(accestoken:string):any{
    if(accestoken!=null){
      return JSON.parse(atob(accestoken.split(".")[1]));
    }
    return null;
  }
  isAuthenticated():boolean{
    let payload=this.obtenerdatostoken(this.token)
    
    if(payload != null && payload.usuario ){
      return true;

    }
    
    return false;
  }
  logout():void{
    this._rol=null;
    this._usuario=null;
    this._token=null;
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('rol');
    localStorage.clear();
    this.image.nombre=''
  
  }

}
