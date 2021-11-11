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
    


    // <<<<<-------------------------ROLES----------------------->>>>>>>
   getroles():Observable<Rol[]>{
   
     return this.http.get<Rol[]>(this.url + '/listarrol');
   }

   eliminarrol(id:number):Observable<string>{
     return this.http.delete<string>(this.url + '/eliminarrol/' + id );
   }

   getrolid(id:number):Observable<Rol>{
    return this.http.get<Rol>(this.url + '/listarrolid/' + id );
  }

   agregarrol(nombre:string):Observable<string>{
     return this.http.post<string>(this.url +'/crearrol', {nombre});

   }

   modificarrol(idrol:number,nombre:string):Observable<String>{
    return this.http.put<string>(this.url +'/modificarrol',{idrol,nombre} );
   }
   getopcionesdisponibles(id:number):Observable<Opciones[]>{
    return this.http.get<Opciones[]>(this.url + '/listaropcdisponibles/' + id );
  }



   
    // <<<<<-------------------------OPCIONES----------------------->>>>>>>

    getopciones():Observable<Opciones[]>{
   
      return this.http.get<Opciones[]>(this.url + '/listarop');
    }
 
    eliminaropcion(id:number):Observable<string>{
      return this.http.delete<string>(this.url + '/eliminarop/' + id );
    }
 
    getopcionid(id:number):Observable<Opciones>{
     return this.http.get<Opciones>(this.url + '/listaropid/' + id );
   }
 
    agregaropc(opcion:Opciones):Observable<string>{
      return this.http.post<string>(this.url +'/crearop', {opcion});
 
    }
 
    modificarop(opcion:Opciones):Observable<String>{
     return this.http.put<string>(this.url +'/modificarop',{opcion} );
    }


    agregaropc_rol(idrol,idopcion):Observable<string>{
      return this.http.post<string>(this.url +'/asignarop', {idrol,idopcion});
 
    }

    listarusuarios():Observable<any>{
      return this.http.get<any>(this.url + '/listarusers');

    }

    agregarrol_user(idusuario,idrol):Observable<string>{
      return this.http.post<string>(this.url +'/asignarrol', {idusuario,idrol});
 
    }


    getrolesdisponibles(id:number):Observable<Rol[]>{
      return this.http.get<Rol[]>(this.url + '/listarrolesdisponibles/' + id );
    }
    getrolesactuales(id:number):Observable<Rol[]>{
      return this.http.get<Rol[]>(this.url + '/listarrolesactuales/' + id );
    }
    getopcionesactuales(id:number):Observable<Opciones[]>{
      return this.http.get<Opciones[]>(this.url + '/listaropcionesactuales/' + id );
    }

   deleteopcionrol(id:number):Observable<any>{
      return this.http.delete<any>(this.url + '/eliminaropcrol/' + id );
    }
    deleteroluser(id:number):Observable<any>{
      return this.http.delete<any>(this.url + '/eliminarroluser/' + id );
    }
}
