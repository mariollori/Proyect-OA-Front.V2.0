import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private firebase:AngularFireStorage) { }

  guardarimagen(imagen : File,name:string):string{
  
    const filePath = imagen.name;
     const task = this.firebase.upload(`img/${name}`, imagen);
     console.log(task)
     return "imagen subida con exito";
  }
  
  mostrarimagenfirebase(nombre:string):Observable<string>{
    
    const ref = this.firebase.ref(`img/${nombre}`);
    console.log(nombre)
    return ref.getDownloadURL();
  }
}
