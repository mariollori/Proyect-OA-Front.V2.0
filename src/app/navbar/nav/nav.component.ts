import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Rol } from 'src/app/models/Rol';
import { Opciones } from 'src/app/models/Opciones';
import { DatosUserComponent } from 'src/app/pages/Perfil/datos-user/datos-user.component';
import { ImagenService } from 'src/app/services/imagen.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 
  nombre;
  action:string='ok';
  apellido;
  
  
  items: MenuItem[];
  click:boolean = false;
  roles:Opciones[]=[];
  constructor(private auth:AuthService,private route:Router,private service:UserService,private _snackBar: MatSnackBar,public imagenserv:ImagenService,private messageService:MessageService) { }
 
  ngOnInit() {
    this.items = [
      {label: 'Perfil', icon: 'pi pi-fw pi-user', command: () => {
        this.enviarperfil();
    }},
      {label: 'Logout', icon: 'pi pi-fw pi-power-off', command: () => {
        this.logout();
    }}
  ];
    this.service.getopciones(this.auth.rol).subscribe(
      data=>{
        console.log(data)
        this.roles=data as Opciones[];
      }

    )


    this.service.getuserbyid(this.auth.usuario.idpersonal).subscribe(
      data=>{
        console.log(this.auth.usuario.toString());
      this.nombre= data[0].nombre + ' ' + data[0].apellido;
    this.apellido =data[0].apellido;

    this.showSuccess()
  }
  
    )
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Bienvenido', detail: `Bienvenido   ${this.nombre}  `});
}
  logout(){
    this.auth.logout();
    
    this.route.navigate(['loginpsi'])
  }
  enviarperfil(){
    this.route.navigate(['nav/perfil_user'])
  }
  openSnackBar() {
    this._snackBar.open('Bienvenido ' + this.nombre + ' ' + this.apellido
    , this.action,{ duration: 2 * 1000 });
  }

}
