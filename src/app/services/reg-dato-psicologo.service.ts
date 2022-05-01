import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Persona } from '../models/Persona';
import { Personal_ayuda } from '../models/Personal';
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

  urlEndpoint = "https://oidoamigo.upeu.edu.pe/EX3/datos_psicologo";

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

  urlEndpoint2 = "https://oidoamigo.upeu.edu.pe/EX3/usuario";
   changedataper(persona):Observable<any>{
     return this.http.put<any>(this.urlEndpoint2 + '/putdataper',{persona});

   }
   getdatapersonal(idpersonal):Observable<Persona>{
   
    return this.http.get<Persona>(this.urlEndpoint2 + '/datapersonal/' + idpersonal);
  }

  getdataschool(idpersonal):Observable<Persona>{
   
    return this.http.get<Persona>(this.urlEndpoint2 + '/dataschool/' + idpersonal);
  }
  async subirImagen_delete(imagen : string,archivo:File,delteimg) {

    try {
     
      let eliminar_foto = await  this.storareRef.child(`img/${delteimg}`).delete();
      let respuesta = await this.storareRef.child("img/" + imagen).put(archivo);
    
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
     
      return null;
    }

  }
  async subirImagen(imagen : string,archivo:File) {

    try {
     
      let respuesta = await this.storareRef.child("img/" + imagen).put(archivo);
    
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
     
      return null;
    }

  }
  guardarimagen(imagen : File):string{
  
     const task = this.firebas.upload(`img/${imagen.name}`, imagen);
     return "imagen subida con exito";
  }

  mostrarimagenfirebase(nombre: string):Observable<string>{
  
    const ref = this.firebas.ref(`img/${nombre}`);
   
    return ref.getDownloadURL();
  }
  
 
}
