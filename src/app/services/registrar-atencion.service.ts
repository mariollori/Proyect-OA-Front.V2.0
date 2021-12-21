import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarAtencionService {
  urlEndpoint3 = "https://proyectooa-backend.herokuapp.com/EX3/paciente";

  constructor(private http:HttpClient) { }

  getlistpac(idpersonal):Observable<any>{
   
    return this.http.get<any>(this.urlEndpoint3 + '/listarpacasig/' + idpersonal);
  }

  getnroregistros(idasignacion):Observable<any>{
   
    return this.http.get<any>(this.urlEndpoint3 + '/numeroregistros/' + idasignacion);
  }

  getidsesion(idasignacion):Observable<any>{
   
    return this.http.get<any>(this.urlEndpoint3 + '/getidatencion/' + idasignacion);
  }
  registrardata1(paciente, atencion, id,fecha,hora):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata1' ,{paciente,atencion,id,fecha,hora});
  }

  registrardata2(atencion, id,fecha,hora):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata2' ,{atencion,id,fecha,hora});
  }
  registrardata3(atencion, id,derivacion,idpersonal):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata3' ,{atencion,id,derivacion,idpersonal});
  }
  getatencion_pend(idpersonal):Observable<any[]>{
   
    return this.http.get<any[]>(this.urlEndpoint3 + '/listatencion_pend/' + idpersonal);
  }
 
  updatefecha(fecha,id,hora):Observable<any>{
    return this.http.put<any>(this.urlEndpoint3 + '/updatefecha',{fecha,id,hora});

  }



 

}
