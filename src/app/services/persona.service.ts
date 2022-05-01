import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/Paciente';
import { Persona } from '../models/Persona';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http:HttpClient,private auth:AuthService) { }


  urlEndpoint = "http://localhost:5050/EX3/persona";
  urlEndpoint2 = "http://localhost:5050/EX3/paciente";

  crearpersona(persona:Persona,paciente:Paciente):Observable<String>{
    console.log(persona)
    console.log(paciente)
  
    return this.http.post<String>(this.urlEndpoint + '/postpaciente',{persona,paciente});
  }


  registrar_valoracion(puntaje,dni,descripcion,codex):any{
    return this.http.post<String>(this.urlEndpoint2 + '/registrar_valoracion',{puntaje,dni,descripcion,codex});
  }
}
