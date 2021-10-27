import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
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



  constructor(private auth: AuthService, private route: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }


 
  
  usuario: Usuario = new Usuario();


  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      this._snackBar.open('Porfavor llene los campos', 'Cerrar', { duration: 2 * 1000 });

    }else{
     
      this.auth.login(this.usuario).subscribe(
        response => {
          
          console.log(JSON.parse(atob(response.token.split('.')[1])))
          this.auth.guardartoken(response.token);
          this.auth.guardarrol(response.token);
          this.auth.guardarusuario(response.token)
          this.route.navigate(['nav/perfil_user'])
        }, err => {
          this._snackBar.open('Usuario o Contraseña incorrectos', 'Cerrar', { duration: 2 * 1000 });
        }
      )
    }
    

  
  }
  
  volver(){
    this.route.navigate(['home'])
  }
}
