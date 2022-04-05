import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandejaService {

  url = "http://localhost:5050/EX3/bandeja/";
  constructor(private http:HttpClient) { }

  get_asignaciones_pendientes():Observable<any[]>{
    return this.http.get<any[]>(this.url + 'get_asignacion_pendientes');
  }
  get_personal_data(id):Observable<any[]>{
    return this.http.get<any[]>(this.url + 'get_personal/' + id);
  }
  get_paciente_data(id):Observable<any[]>{
    return this.http.get<any[]>(this.url + 'get_paciente/' + id);
  }
  update_asignacion(idpersonal,idasignacion):Observable<any>{
    let params = new HttpParams().set("idpersonal",idpersonal).append("idasignacion",idasignacion);
    return this.http.put<any>(this.url + 'update_asignacion' , {idpersonal,idasignacion});
  }
}
