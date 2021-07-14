import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../Usuarios/auth.service';


@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {
nombre;
apellido;
  constructor(private auth:AuthService,private route:Router,private service:UserService) { }

  ngOnInit() {
    this.service.getuser(this.auth.usuario).subscribe(
      data=>{console.log(data);
      this.nombre= data[0].nombres
    this.apellido =data[0].apellidos}
    )
  }

  logout(){
    this.auth.logout();
    
    this.route.navigate(['login'])
  }
}
