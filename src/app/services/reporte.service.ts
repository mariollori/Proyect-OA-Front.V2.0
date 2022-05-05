import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dominio } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http:HttpClient) { }

  urlEndpoint =`${dominio}/EX3/reporte/`;  
  urlEndpoint2 = `${dominio}/EX3/usuario/`; 

  getAsignaciones(tipo): Observable<any[]> {
    let params = new HttpParams().set("tipo",tipo);
    return this.http.get<any[]>(this.urlEndpoint + "buscarpersonal/tipo" , { params:params});
  }
 
  getAsignaciones_sede(tipo,sede): Observable<any[]> {
    let params = new HttpParams().set("tipo",tipo).append('sede',sede);
    return this.http.get<any[]>(this.urlEndpoint + "buscarpersonal/sede" , { params:params});
  }
  get_personal_menor_4(tipo,sede): Observable<any[]> {
    let params = new HttpParams().set("tipo",tipo).append('sede',sede);
    return this.http.get<any[]>(this.urlEndpoint + "buscarpersonal_4/sede" , { params:params});
  }

  get_estadisticas_genero(genero){
    return this.http.get<any[]>(this.urlEndpoint + "estadisticas/genero/" + genero);
  }
  
  getestadistica(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "estadistica/" + id);
  }
  getestadistica_fecha(id,fechai,fechaf): Observable<any[]> {
    let params = new HttpParams().set("id",id).append("fechai",fechai).append("fechaf",fechaf);
    return this.http.get<any[]>(this.urlEndpoint2 + "estadisticas/fecha" ,{params:params});
  }
  getestadisticatotal(tipo,sede): Observable<any[]> {
    let params = new HttpParams().set("tipo",tipo).append("sede",sede);
    return this.http.get<any[]>(this.urlEndpoint + "estadisticastotales/tipo" ,{params:params});
  }

  getestadisticatotal_fecha(tipo,sede,fechai,fechaf): Observable<any[]> {
       console.log(fechaf)
    let params = new HttpParams().set("tipo",tipo).append("fechai",fechai).append("fechaf",fechaf).append("sede",sede);
    return this.http.get<any[]>(this.urlEndpoint2   + "estadisticastotales/fecha" ,{params:params});
  }


  get_info_personal(id,tipo):Observable<any>{
    let params = new HttpParams().set("tipo",tipo).append("id",id);
   return this.http.get<any>(this.urlEndpoint + "info_personal" ,{params:params} );
  }


  get_pacientes_finalizados(id,tipo): Observable<any[]> {
    let params = new HttpParams().set("tipo",tipo);
    return this.http.get<any[]>(this.urlEndpoint + "get_pacientes/" + id,{params:params});
  }
  get_atenciones_by_id(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "get_atenciones/" + id);
  }

  get_comentarios_by_id(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "get_comentarios/" + id);
  }
  get_puntaje_by_id(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "get_puntaje/" + id);
  }
  get_puntaje_total_by_id(id): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "get_puntaje_total/" + id);
  }
  get_reingresos(): Observable<any> {
    return this.http.get<any>(this.urlEndpoint + "get_reingresos");
  }




  get_comentarios_totales(): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "get_comentarios_totales");
  }
  get_puntaje_totales(): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "get_puntaje_totales");
  }
  get_puntaje_total_totales(): Observable<any[]> {
    return this.http.get<any[]>(this.urlEndpoint + "get_puntaje_totales_by_star" );
  }

}
