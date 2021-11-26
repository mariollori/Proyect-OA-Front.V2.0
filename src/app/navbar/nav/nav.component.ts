import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Rol } from 'src/app/models/Rol';
import { Opciones } from 'src/app/models/Opciones';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  nombre;
  action:string='ok';
  apellido;
  click:boolean = false;
  roles:Opciones[]=[];
  constructor(private auth:AuthService,private route:Router,private service:UserService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
   
    this.service.getopciones(this.auth.rol).subscribe(
      data=>{
        console.log(data)
        this.roles=data as Opciones[];

      }
    )


    this.service.getuserbyid(this.auth.usuario.idpersonal).subscribe(
      data=>{
        console.log(this.auth.usuario.toString());
      this.nombre= data[0].nombre;
    this.apellido =data[0].apellido;
    this.openSnackBar()
  }
  
    )
  }
  logout(){
    this.auth.logout();
    
    this.route.navigate(['loginpsi'])
  }
  openSnackBar() {
    this._snackBar.open('Bienvenido ' + this.nombre + ' ' + this.apellido
    , this.action,{ duration: 2 * 1000 });
  }

  cerrar(){

    const side: HTMLElement = document.getElementById('container-menu');
    const btn :HTMLElement = document.getElementById('cont-menu');
    console.log(this.click)
    if(this.click!=true){
      side.style.opacity = "1";
      side.style.visibility = 'visible'; //visibility
      btn.style.left = '0'
      this.click=true;
    }else{
      side.style.opacity = '0';
      side.style.visibility = 'hidden'; //visibility
      btn.style.left = '-250px'
      this.click=false;
    }

   
  }
}
