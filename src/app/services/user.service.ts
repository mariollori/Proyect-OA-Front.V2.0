import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';
import { Opciones } from '../models/Opciones';
import { Persona } from '../models/Persona';
import { AuthService } from './auth.service';
import { Usuario } from '../models/Usuario';
import { Cancelacion } from '../models/Cancelacion';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private auth:AuthService) { }
  urlEndpoint = "http://localhost:5050/EX3/usuario";
  urlEndpoint2 = "http://localhost:5050/EX3/persona";
  urlEndpoint3 = "http://localhost:5050/EX3/opcion";
  urlEndpoint4 = "http://localhost:5050/EX3/psicologo";

  getuserbyid(idusuario):Observable<Persona>{
   
    return this.http.get<Persona>(this.urlEndpoint + '/' + idusuario);
  }


  getopciones(roles:Rol[]):Observable<Opciones[]>{
    const idroles=[];
    for (let index = 0; index < roles.length; index++) {
      idroles.push(roles[index].idrol)
    }
   
    let params = new HttpParams();
    params = params.append('roles', JSON.stringify(idroles));
    return this.http.get<Opciones[]>(this.urlEndpoint3 + '/getopciones/', {params:params});
  }

  getusers():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlEndpoint + '/getuserstocompare/getdata')
   }
   crearusuario(username,password,idpersonal,destino):Observable<any>{
    return this.http.post<any>(this.urlEndpoint4 + '/crearusuario', { username,password,idpersonal,destino})
   }


   getparams(estado:string):Observable<any>{
    let params = new HttpParams().set("estado",estado);
    return this.http.get<any>(this.urlEndpoint + '/getestados/estado/', { params:params})
   }

   crearcancelacion(cancelacion:Cancelacion,idpaciente):Observable<any>{
    return this.http.post<any>(this.urlEndpoint + '/crearcancelacion/post', { cancelacion,idpaciente})
   }
}
