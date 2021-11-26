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

  getPastor(): Observable<any> {
    return this.http.get<any>(this.urlEndpoint2+"pastor");
  }

  getEstudiante(): Observable<any> {
    return this.http.get<any>(this.urlEndpoint2+"estudiante");
  }
  getPsicologo(): Observable<any> {
    return this.http.get<any>(this.urlEndpoint2+"psicologo");
  }
}
