import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dominio } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class BandejaService {

  url =  `${dominio}/EX3/bandeja`;
  url2 =  `${dominio}/EX3/paciente`;
  constructor(private http:HttpClient) { }

  get_asignaciones_pendientes(sede):Observable<any[]>{
    return this.http.get<any[]>(this.url + 'get_asignacion_pendientes/' + sede);
  }
  get_personal_data(id):Observable<any[]>{
    return this.http.get<any[]>(this.url + 'get_personal/' + id);
  }
  get_paciente_data(id):Observable<any[]>{
    return this.http.get<any[]>(this.url + 'get_paciente/' + id);
  }
  update_asignacion(idpersonal,idasignacion,codex):Observable<any>{
   
    return this.http.put<any>(this.url + 'update_asignacion' , {idpersonal,idasignacion,codex});
  }


}
