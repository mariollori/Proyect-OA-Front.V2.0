import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  constructor(private http: HttpClient ) { }


  
  
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
