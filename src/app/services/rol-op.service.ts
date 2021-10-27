import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Rol } from '../models/Rol';
import { Opciones } from '../models/Opciones';
@Injectable({
  providedIn: 'root'
})
export class RolOpService {

  constructor(private auth:AuthService,private http:HttpClient) { }
   url = 'http://localhost:5050/EX3/opcion'
    headers = new HttpHeaders().set('x-token',this.auth.token);


    // <<<<<-------------------------ROLES----------------------->>>>>>>
   getroles():Observable<Rol[]>{
   
     return this.http.get<Rol[]>(this.url + '/listarrol',{headers:this.headers});
   }

   eliminarrol(id:number):Observable<string>{
     return this.http.delete<string>(this.url + '/eliminarrol/' + id ,{headers:this.headers});
   }

   getrolid(id:number):Observable<Rol>{
    return this.http.get<Rol>(this.url + '/listarrolid/' + id ,{headers:this.headers});
  }

   agregarrol(nombre:string):Observable<string>{
     return this.http.post<string>(this.url +'/crearrol', {nombre},{headers:this.headers});

   }

   modificarrol(idrol:number,nombre:string):Observable<String>{
    return this.http.put<string>(this.url +'/modificarrol',{idrol,nombre} ,{headers:this.headers});
   }


   
    // <<<<<-------------------------OPCIONES----------------------->>>>>>>

    getopciones():Observable<Opciones[]>{
   
      return this.http.get<Opciones[]>(this.url + '/listarop',{headers:this.headers});
    }
 
    eliminaropcion(id:number):Observable<string>{
      return this.http.delete<string>(this.url + '/eliminarop/' + id ,{headers:this.headers});
    }
 
    getopcionid(id:number):Observable<Opciones>{
     return this.http.get<Opciones>(this.url + '/listaropid/' + id ,{headers:this.headers});
   }
 
    agregaropc(opcion:Opciones):Observable<string>{
      return this.http.post<string>(this.url +'/crearop', {opcion},{headers:this.headers});
 
    }
 
    modificarop(opcion:Opciones):Observable<String>{
     return this.http.put<string>(this.url +'/modificarop',{opcion} ,{headers:this.headers});
    }
}
