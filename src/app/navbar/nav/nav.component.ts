import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/Usuarios/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  nombre;
  action:string='ok';
  apellido;
  constructor(private auth:AuthService,private route:Router,private service:UserService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.service.getuser(this.auth.usuario).subscribe(
      data=>{console.log(data);
      this.nombre= data[0].nombres
    this.apellido =data[0].apellidos
    this.openSnackBar()
  }
  
    )
  }
  logout(){
    this.auth.logout();
    
    this.route.navigate(['login'])
  }
  openSnackBar() {
    this._snackBar.open('Bienvenido ' + this.nombre + ' ' + this.apellido
    , this.action);
  }
}
