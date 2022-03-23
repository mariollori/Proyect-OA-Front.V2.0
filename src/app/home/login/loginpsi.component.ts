import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loginpsi',
  templateUrl: './loginpsi.component.html',
  styleUrls: ['./loginpsi.component.css']
})
export class LoginpsiComponent implements OnInit {
  show_eye: Boolean = false;
  cargando=false;
  show_button: Boolean = false;
  son = document.querySelector('div.modal-backdrop');
  usuario: Usuario = new Usuario();
  constructor(private auth: AuthService, private route: Router, private _snackBar: MatSnackBar) { }


  ngOnInit() {
    if(this.son){

      var body = document.querySelector('body');
      body.removeChild(this.son);
    }
  }


  changeicon(){
   this.show_button=!this.show_button
   this.show_eye=!this.show_eye
  }
  login(): void {
    if (this.usuario.username == null || this.usuario.password == null) {
      this._snackBar.open('Porfavor llene los campos', 'Cerrar', { duration: 2 * 1000 });
    }else{
      this.cargando=true;
      this.auth.login(this.usuario).subscribe(
        response => {
          this.cargando=false;
          this.auth.guardartoken(response.token);
          this.auth.guardarrol(response.token);
          this.auth.guardarusuario(response.token);
          this.route.navigate(['nav/perfil_user']);
        }, err => {
          this.cargando=false;
          this._snackBar.open('Usuario o Contraseña incorrectos', 'Cerrar', { duration: 2 * 1000 });
        }
      )
    }
    

  
  }
  
  volver(){
    this.route.navigate(['home'])
  }
}
