import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/Persona';
import { AuthService } from '../Usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private auth:AuthService) { }
  urlEndpoint = "http://localhost:5050/EX3/usuario";

  getuser(idusuario):Observable<Persona>{
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('x-token', this.auth.token);
    return this.http.get<Persona>(this.urlEndpoint + '/' + idusuario,{headers:headers});
  }
}
