import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Persona } from '../models/Persona';
import { Personal_ayuda } from '../models/personal-ayuda';
import { Horario_psicologo } from '../models/Horario_psicologo';
import { AngularFireStorage } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
firebase.initializeApp(environment.firebase);
@Injectable({
  providedIn: 'root'
})
export class RegDatoPsicologoService {
  storareRef = firebase.app().storage().ref();

  constructor(private http:HttpClient,private auth:AuthService,private firebas:AngularFireStorage) { }

  urlEndpoint = "http://localhost:5050/EX3/datos_psicologo";

  crear_datos_psicologo(persona:Persona,personal_ayuda:Personal_ayuda,horario_psicologo:Horario_psicologo[]):Observable<String>{
    console.log(persona)
    console.log(personal_ayuda)
    console.log(horario_psicologo)
    return this.http.post<String>(this.urlEndpoint + '/register/dato_psicogolo',{persona,personal_ayuda,horario_psicologo});
  }
  changedataschool(personal_ayuda,tipo):Observable<any>{
    return this.http.put<any>(this.urlEndpoint + '/update/dataschool',{personal_ayuda,tipo});

  }
  subirfoto(id,foto):Observable<any>{
    return this.http.put<any>(this.urlEndpoint + '/update/foto',{id,foto});

  }
  gethorarios(id):Observable<Horario_psicologo[]>{
        return this.http.get<Horario_psicologo[]>(this.urlEndpoint + '/horarios/' + id)
  }

  deletehorario(id):Observable<any>{
    return this.http.delete<any>(this.urlEndpoint + '/horario/delete/' + id)
}
crearhorario(horario):Observable<any>{
  return this.http.post<any>(this.urlEndpoint + '/horario/post/' ,{horario})
}

  urlEndpoint2 = "http://localhost:5050/EX3/usuario";
   changedataper(persona):Observable<any>{
     return this.http.put<any>(this.urlEndpoint2 + '/putdataper',{persona});

   }
   getdatapersonal(idpersonal):Observable<Persona>{
   
    return this.http.get<Persona>(this.urlEndpoint2 + '/datapersonal/' + idpersonal);
  }

  getdataschool(idpersonal):Observable<Persona>{
   
    return this.http.get<Persona>(this.urlEndpoint2 + '/dataschool/' + idpersonal);
  }
  async subirImagen(imagen : File) {

    try {
      let respuesta = await this.storareRef.child("img/" + imagen.name).put(imagen);
      console.log(respuesta);
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }

  }
  guardarimagen(imagen : File):string{
  
     const task = this.firebas.upload(`img/${imagen.name}`, imagen);
     return "imagen subida con exito";
  }

  mostrarimagenfirebase(nombre:string):Observable<string>{
  
    const ref = this.firebas.ref(`img/${nombre}`);
    console.log(nombre)
    return ref.getDownloadURL();
  }
  
 
}
