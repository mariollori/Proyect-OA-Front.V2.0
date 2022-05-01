import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';
import { Opciones } from '../models/Opciones';
import { Persona } from '../models/Persona';
import { AuthService } from './auth.service';
import { Usuario } from '../models/Usuario';
import { Cancelacion } from '../models/Cancelacion';
import { ngxChartsPolyfills } from '@swimlane/ngx-charts/release/polyfills';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private auth:AuthService) { }
  urlEndpoint = "http://localhost:5050/usuario";
  urlEndpoint2 = "http://localhost:5050/persona";
  urlEndpoint3 = "http://localhost:5050/opcion";
  urlEndpoint4 = "http://localhost:5050/psicologo";
  urlEndpoint5 = "http://localhost:5050/paciente";
  eliminarsolicitud(idpersonal,idpersona,tipo):Observable<any>{
    return this.http.post<any>(this.urlEndpoint4 + '/deletepersona', { idpersonal,idpersona,tipo})
   }

  get_nombre_usuario(idpersonal):Observable<Persona>{
   
    return this.http.get<Persona>(this.urlEndpoint + '/nombre/' + idpersonal);
  }
  getuserbyid(idusuario):Observable<Persona>{
   
    return this.http.get<Persona>(this.urlEndpoint + '/' + idusuario);
  }
derivacion_ext(id, motivo){
  return this.http.post<any>(this.urlEndpoint5 + '/derivar_externo/' + id,{motivo});
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
   crearusuario(username,password,idpersonal,destino,rol):Observable<any>{
    return this.http.post<any>(this.urlEndpoint4 + '/crearusuario', { username,password,idpersonal,destino,rol})
   }
   desactivar_usuario(id):Observable<any>{
    return this.http.delete<any>(this.urlEndpoint3 + '/desactivar_user/' + id)
   }


   getparams(estado:string):Observable<any>{
    let params = new HttpParams().set("estado",estado);
    return this.http.get<any>(this.urlEndpoint + '/getestados/estado/', { params:params})
   }




   crearcancelacion(motivo,id):Observable<any>{
    return this.http.post<any>(this.urlEndpoint5 + '/cancelar_atencion/' + id, {motivo})
   }


   finalizar_atencion(id,motivo):Observable<any>{
    return this.http.post<any>(this.urlEndpoint5 + '/finalizar_atencion/' + id,{motivo});
   }
   derivar_atencion(id,motivo,idpaciente,codex):Observable<any>{
    return this.http.post<any>(this.urlEndpoint5 + '/derivar_atencion/' + id, {idpaciente,motivo,codex});
   }
}
