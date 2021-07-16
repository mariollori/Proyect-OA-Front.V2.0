import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { Archivo } from '../models/Archivo';
import { AuthService } from '../Usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  url:Observable<string>;
  constructor(private firebase:AngularFireStorage,private http:HttpClient,private auth:AuthService) { }
  urlEndpoint = "http://localhost:5050/EX3/archivo";
  guardarimagen(imagen : File,name:string):string{
  

     const task = this.firebase.upload(`img/${name}`, imagen);
     
  
     return 'insertadocorrectamente';
      }
  
  mostrarimagenfirebase(nombre:string):Observable<string>{
    
    const ref = this.firebase.ref(`img/${nombre}`);
    
    console.log(nombre)
    return ref.getDownloadURL();
  }
  deleteimgfirebase(nombre:string):string{
    
    const ref = this.firebase.ref(`img/${nombre}`);
    ref.delete()
    
    return 'eliminado con exito' ;
  }
  getarchivos(idusuario:number):Observable<Archivo[]>{
    const headers = new HttpHeaders()
    .set('x-token', this.auth.token);
    return this.http.get<Archivo[]>(this.urlEndpoint + '/get/' + idusuario,{headers:headers});
  }
  postarchivo(archivo:Archivo):Observable<string>{
    const headers = new HttpHeaders().set('x-token', this.auth.token);
    console.log(archivo)
    return this.http.post<string>(this.urlEndpoint + '/post', archivo ,{headers:headers});
  }
  deleteimg(idarchivo:number):Observable<string>{
    
    const headers = new HttpHeaders().set('x-token', this.auth.token);
   
    return this.http.delete<string>(this.urlEndpoint + '/borrar/'+ idarchivo ,{headers:headers});
  }
}
