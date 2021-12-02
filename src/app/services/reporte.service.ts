import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http:HttpClient) { }

  urlEndpoint = "http://localhost:5050/reporte/";

  getAsignaciones(tipo): Observable<any[]> {
    let params = new HttpParams().set("tipo",tipo);
    return this.http.get<any[]>(this.urlEndpoint + "buscarpersonal/tipo" , { params:params});
  }
 
  
  getestadistica(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "estadistica/" + id);
  }
  getestadistica_fecha(id,fechai,fechaf): Observable<any[]> {
  
   
    return this.http.get<any[]>(this.urlEndpoint + "estadisticas/fecha" ,{params:{id:id,fechai:fechai,fechaf:fechaf}});
  }
}
