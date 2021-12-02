import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Persona } from '../models/Persona';
import { Personal_ayuda } from '../models/personal-ayuda';
import { Horario_psicologo } from '../models/Horario_psicologo';

@Injectable({
  providedIn: 'root'
})
export class RegDatoPsicologoService {

  constructor(private http:HttpClient,private auth:AuthService) { }

  urlEndpoint = "http://localhost:5050/EX3/datos_psicologo";

  crear_datos_psicologo(persona:Persona,personal_ayuda:Personal_ayuda,horario_psicologo:Horario_psicologo):Observable<String>{
    console.log(persona)
    console.log(personal_ayuda)
    console.log(horario_psicologo)
    return this.http.post<String>(this.urlEndpoint + '/register/dato_psicogolo',{persona,personal_ayuda,horario_psicologo});
  }
}
