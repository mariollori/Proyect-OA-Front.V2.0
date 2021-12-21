import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  constructor(private http: HttpClient ) { }

  urlEndpoint = "https://proyectooa-backend.herokuapp.com/asignacion/get";

  getAsignaciones(estado): Observable<any[]> {
    let params = new HttpParams().set("estado",estado);
    return this.http.get<any[]>(this.urlEndpoint+"/estado" , { params:params});

  }
  urlEndpoint2 = "https://proyectooa-backend.herokuapp.com/asignacion/";

  
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
  enviarmensaje(idpersonal,nombre):Observable<any>{
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Basic NDEwOWNlZmYtMjAwNy00NDY4LTk1ZTctYjExM2EwZTVkMTEz"
    });
     return this.http.post<any>('https://onesignal.com/api/v1/notifications', { app_id:"0f4599ff-8cbe-4d06-a525-f637d5c40dc0",
     headings:{"en":"Oido amigo le informa","es":"Oido amigo le informa"},
     contents:{"en":`Se le asigno el paciente : ${nombre}`,"es":`Se le asigno el paciente : ${nombre}`},
     channel_for_external_user_ids: "push",
     include_external_user_ids:[idpersonal.toString()]},{headers:headers});
  }
}
