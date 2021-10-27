import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';
import { Opciones } from '../models/Opciones';
import { Persona } from '../models/Persona';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private auth:AuthService) { }
  urlEndpoint = "http://localhost:5050/EX3/usuario";
  urlEndpoint2 = "http://localhost:5050/EX3/persona";
  urlEndpoint3 = "http://localhost:5050/EX3/opcion";

  getuser(idusuario):Observable<Persona>{
    const headers = new HttpHeaders().set('x-token', this.auth.token);
    return this.http.get<Persona>(this.urlEndpoint + '/' + idusuario,{headers:headers});
  }


  getopciones(roles:Rol[]):Observable<Opciones[]>{
    const idroles=[];
    for (let index = 0; index < roles.length; index++) {
      idroles.push(roles[index].idrol)
    }
    const headers = new HttpHeaders().set('x-token', this.auth.token);
    let params = new HttpParams();
    params = params.append('roles', JSON.stringify(idroles));
    return this.http.get<Opciones[]>(this.urlEndpoint3 + '/getopciones/', {headers:headers, params:params});
  }
}
