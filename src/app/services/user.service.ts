import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Correo } from '../models/Correo';
import { Persona } from '../models/Persona';
import { AuthService } from '../Usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private auth:AuthService) { }
  urlEndpoint = "http://localhost:5050/EX3/usuario";
  urlEndpoint2 = "http://localhost:5050/EX3/persona";

  getuser(idusuario):Observable<Persona>{
    const headers = new HttpHeaders().set('x-token', this.auth.token);
    return this.http.get<Persona>(this.urlEndpoint + '/' + idusuario,{headers:headers});
  }

  enviarcorre(correo:Correo):Observable<string>{
    const headers = new HttpHeaders().set('x-token', this.auth.token);
    return this.http.post<string>(this.urlEndpoint2 + '/enviarcorreo',correo,{headers:headers});
  }
  getcorreos(idusuario):Observable<Correo[]>{
    const headers = new HttpHeaders().set('x-token', this.auth.token);
    return this.http.get<Correo[]>(this.urlEndpoint2 + '/getcorreos/' + idusuario,{headers:headers});
  }
}
