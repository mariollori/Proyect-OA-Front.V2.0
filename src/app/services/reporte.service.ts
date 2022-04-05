import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http:HttpClient) { }

  urlEndpoint = "http://localhost:5050/EX3/reporte/";
  urlEndpoint2 = "http://localhost:5050/EX3/usuario/";

  getAsignaciones(tipo): Observable<any[]> {
    let params = new HttpParams().set("tipo",tipo);
    return this.http.get<any[]>(this.urlEndpoint + "buscarpersonal/tipo" , { params:params});
  }
 
  getAsignaciones_sede(tipo,sede): Observable<any[]> {
    let params = new HttpParams().set("tipo",tipo).append('sede',sede);
    return this.http.get<any[]>(this.urlEndpoint + "buscarpersonal/sede" , { params:params});
  }

  get_estadisticas_genero(genero){
    return this.http.get<any[]>(this.urlEndpoint + "estadisticas/genero/" + genero);
  }
  
  getestadistica(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "estadistica/" + id);
  }
  getestadistica_fecha(id,fechai,fechaf): Observable<any[]> {
    let params = new HttpParams().set("id",id).append("fechai",fechai).append("fechaf",fechaf);
    return this.http.get<any[]>(this.urlEndpoint + "estadisticas/fecha" ,{params:params});
  }
  getestadisticatotal(tipo,sede): Observable<any[]> {
    let params = new HttpParams().set("tipo",tipo).append("sede",sede);
    return this.http.get<any[]>(this.urlEndpoint + "estadisticastotales/tipo" ,{params:params});
  }

  getestadisticatotal_fecha(tipo,sede,fechai,fechaf): Observable<any[]> {

    let params = new HttpParams().set("tipo",tipo).append("fechai",fechai).append("fechaf",fechaf).append("sede",sede);
    return this.http.get<any[]>(this.urlEndpoint2   + "estadisticastotales/fecha" ,{params:params});
  }


  get_info_personal(id,tipo):Observable<any>{
    let params = new HttpParams().set("tipo",tipo).append("id",id);
   return this.http.get<any>(this.urlEndpoint + "info_personal" ,{params:params} );
  }


  get_pacientes_finalizados(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "get_pacientes/" + id);
  }
  get_atenciones_by_id(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "get_atenciones/" + id);
  }
}
