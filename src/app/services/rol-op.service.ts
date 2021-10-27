import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Rol } from '../models/Rol';
@Injectable({
  providedIn: 'root'
})
export class RolOpService {

  constructor(private auth:AuthService,private http:HttpClient) { }
   url = 'http://localhost:5050/EX3/opcion'
    headers = new HttpHeaders().set('x-token',this.auth.token);

   getroles():Observable<Rol[]>{
   
     return this.http.get<Rol[]>(this.url + '/listarrol',{headers:this.headers});
   }

   eliminarrol(id:number):Observable<string>{
     return this.http.delete<string>(this.url + '/eliminarrol/' + id ,{headers:this.headers});
   }

   getrolid(id:number):Observable<string>{
    return this.http.get<string>(this.url + '/listarrolid/' + id ,{headers:this.headers});
  }

   agregarrol(nombre:string):Observable<string>{
     return this.http.post<string>(this.url +'/crearrol', nombre,{headers:this.headers});

   }

   modificarrol(idrol:number,nombre:string):Observable<String>{
    return this.http.put<string>(this.url +'/modificarrol',{idrol,nombre} ,{headers:this.headers});
   }
}
