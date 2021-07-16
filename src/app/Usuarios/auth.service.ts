import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlEndpoint = "http://localhost:5050/EX3/auth";

  constructor(private http: HttpClient) { }
  private _usuario: number;
  private _token :string;

  public get usuario():number{
    if(this._usuario!=null){
      return this._usuario;
    }else if(this._usuario==null && sessionStorage.getItem('usuario')){
      this._usuario=Number(sessionStorage.getItem('usuario'));
       return this._usuario;
    }
    return null;

  }
  public get token():string{
    if(this._token!=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem('token')){
      this._token=sessionStorage.getItem('token') ;
       return this._token;
    }
    return null;
  }


  login(usuario: Usuario): Observable<any> {
   return this.http.post<any>(this.urlEndpoint + '/login', usuario);
  }

  guardarusuario(accestoken:string):void{
    let payload =this.obtenerdatostoken(accestoken);
    
    this._usuario=payload.idusuario;
    
    console.log(payload)
    /**no acepta objetos jason por eso con la stringify lo pasamos a texto */
    sessionStorage.setItem('usuario',this._usuario.toString())

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
    console.log(payload)
    if(payload != null && payload.idusuario ){
      return true;

    }
    
    return false;
  }
  logout():void{
    
    this._usuario=null;
    this._token=null;
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    
  
  }
  httpAutenticated():HttpHeaders{
    let httpheaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    if(this.token!=null){
      console.log(httpheaders.append('Authorization','Bearer' + this.token))
      return  httpheaders.append('Authorization','Bearer' + this.token)
    }
    return httpheaders;
  }
}
