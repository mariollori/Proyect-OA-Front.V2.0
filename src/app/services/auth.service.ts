import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'console';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';
import { dominio } from 'src/environments/environment.prod';
import { Usuario } from '../models/Usuario';
import { ImagenService } from './imagen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  urlEndpoint = `${dominio}/EX3/auth`; 

  constructor(private http: HttpClient,private image:ImagenService) { }
  private _usuario: Usuario;
  private _rol:Rol[];
  private _token :string;

  public get usuario():Usuario{
    if(this._usuario!=null){
      return this._usuario;
    }else if(this._usuario==null && sessionStorage.getItem('token')){
      let payload =this.obtenerdatostoken(sessionStorage.getItem('token'));
      let data = payload.usuario;
      let data2= payload.personal;
      this._usuario = new Usuario();
      this._usuario.id = data.idusuario;
      this._usuario.idpersonal = data2.idpersonal;
     
       return this._usuario;
    }
    return null;

  }
  public get rol():Rol[]{
    if(this._rol!=null){
      return this._rol;
    }else if(this._rol==null && sessionStorage.getItem('token')){
      let payload =this.obtenerdatostoken(sessionStorage.getItem('token'));
      this._rol = payload.roles;
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
  hasRole(role: string): boolean {
    var found = this.rol.filter(x=> x.nombre == role);
    if (found.length > 0) {
      return true;
    }
    return false;
  }
  hasRoles(roles: Array<string>): boolean {
    var cont = 0;
    for (let i = 0; i < this.rol.length; i++) {
      if(roles.includes(this.rol[i].nombre)){
        cont = cont + 1; 
      }
    }
    
    if(cont == 0){
      return false;
    }else{
      return true;
    }
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
  
  login(usuario: Usuario): Observable<any> {
   return this.http.post<any>(this.urlEndpoint + '/login', usuario);
  }

  changepassword(token,newpassword):Observable<any>{
    let headers = new HttpHeaders().set('authorization', token);
    return this.http.put<any>(this.urlEndpoint + '/change-password' ,{newpassword},{headers:headers});
  }
  forgotpassword(email):Observable<any>{
    return this.http.put<any>(this.urlEndpoint + '/forgote-password' ,{email});
  }
}
