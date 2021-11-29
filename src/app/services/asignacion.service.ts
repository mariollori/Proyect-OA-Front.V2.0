import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  constructor(private http: HttpClient ) { }

  urlEndpoint = "http://localhost:5050/asignacion/get";

  getAsignaciones(estado): Observable<any[]> {
    let params = new HttpParams().set("estado",estado);
    return this.http.get<any[]>(this.urlEndpoint+"/estado" , { params:params});

  }
  urlEndpoint2 = "http://localhost:5050/asignacion/";

  
  getpsi_asignado(id): Observable<any> {
    
    return this.http.get<any>(this.urlEndpoint2 + "psi_asignado/"+ id);
  }
 
  get_last_condition(id): Observable<any> {
    
    return this.http.get<any>(this.urlEndpoint2 + "ultima_cond/"+ id);
  }
  getpersonalayuda(estado): Observable<any> {
    let params = new HttpParams().set("estado",estado);
    return this.http.get<any>(this.urlEndpoint2 + "personal_ayuda" , {params:params});
  }


  asignarpac_psi(idpersonal,idpaciente):Observable<any>{
      return this.http.post<any>(this.urlEndpoint2 + 'asignar_psi' ,{idpersonal,idpaciente});
  }
  asignarpac_estud(idpersonal,idpaciente):Observable<any>{
      return this.http.post<any>(this.urlEndpoint2 + 'asignar_est' ,{idpersonal,idpaciente});
  }

}
