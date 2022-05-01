import {  Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

import { Opciones } from 'src/app/models/Opciones';

import { ImagenService } from 'src/app/services/imagen.service';


@Component({
  selector: 'app-nav',
  
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit ,OnDestroy{

  nombre;

  click: boolean = false;
  opciones: Opciones[] = [];
  constructor(private auth: AuthService, private route: Router, private service: UserService, public imagenserv: ImagenService) { }
  ngOnDestroy(): void {
    let script = document.getElementById('side');
    if(script) {
        script.remove();
    } 
  }
  ngOnInit() {
    let body = document.getElementsByTagName("body")[0];
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.id="side";
    s.src = "./assets/js/side.js";
    body.appendChild(s);

    this.service.getopciones(this.auth.rol).subscribe(
      data => {
        this.opciones = data as Opciones[];
      }
    )

    this.service.get_nombre_usuario(this.auth.usuario.idpersonal).subscribe(
      data => {
        this.nombre = data[0].nombre + ' ' + data[0].apellido;
      }
    )
  }
  
  logout() {
    this.auth.logout();
    this.route.navigate(['home/loginpsi'])
  }
  enviarperfil() {
    this.route.navigate(['nav/perfil_user'])
  }
 


}

