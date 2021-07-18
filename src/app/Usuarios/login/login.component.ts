import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from '../../models/Usuario';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario: Usuario = new Usuario();
  constructor(private auth: AuthService, private route: Router,private _snackBar: MatSnackBar) {}


  ngOnInit() {
  
  }

  login(): void {

    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      alert('Error Login: Username o passwor vacios')

    }
    this.auth.login(this.usuario).subscribe(
      response=>{
        
        console.log(JSON.parse(atob(response.token.split('.')[1])))
        this.auth.guardartoken(response.token);
        this.auth.guardarusuario(response.token)

        
      
        this.route.navigate(['nav/archivos'])
        
      },err=>{
        this._snackBar.open('Usuario o Contraseña incorrectos', 'cerrar',{duration:2*1000});
      
      }
    )
  }

}
