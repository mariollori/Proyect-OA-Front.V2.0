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
  get_historial(idpaciente):Observable<any>{
    return this.http.get<any>(this.urlEndpoint3 + '/get_historial/' + idpaciente)
    }
  get_paciente_info(idpaciente):Observable<any>{
    return this.http.get<any>(this.urlEndpoint3 + '/paciente_info/' + idpaciente);
  }
  get_atenciones_registradas(idasignacion):Observable<any[]>{
    return this.http.get<any[]>(this.urlEndpoint3 + '/atenciones_registradas/' + idasignacion);
  }

  registrardata1(paciente, atencion, id):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata1' ,{paciente,atencion,id});
  }

  registrardata2(atencion, id):Observable<String>{
   
    return this.http.post<String>(this.urlEndpoint3 + '/registrardata2' ,{atencion,id});
  }





 

}
