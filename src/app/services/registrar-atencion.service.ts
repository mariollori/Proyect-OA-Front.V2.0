import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarAtencionService {
  urlEndpoint3 = "http://localhost:5050/EX3/paciente";

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
  registrardata1(paciente, atencion, id,fecha):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata1' ,{paciente,atencion,id,fecha});
  }

  registrardata2(atencion, id,fecha):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata2' ,{atencion,id,fecha});
  }
  registrardata3(atencion, id,derivacion):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata3' ,{atencion,id,derivacion});
  }
  getatencion_pend(idpersonal):Observable<any>{
   
    return this.http.get<any>(this.urlEndpoint3 + '/listatencion_pend/' + idpersonal);
  }
 



 

}
