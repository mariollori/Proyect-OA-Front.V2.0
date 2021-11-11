import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Opciones } from 'src/app/models/Opciones';
import { Rol } from 'src/app/models/Rol';
import { RolOpService } from 'src/app/services/rol-op.service';
import Swal from 'sweetalert2';

export interface UsuarioData {
  idusuario:number;
  nombre: string;
  username: string;
  apellido: string;
}

@Component({
  selector: 'app-gest-op',
  templateUrl: './gest-op.component.html',
  styleUrls: ['./gest-op.component.css']
})
export class GestOpComponent implements OnInit {

  constructor(private rolserv:RolOpService) { }
  // Variables para asignar opc a rol
  opcionesdisponibles:Opciones[]=[];
  opciondisp;
  // Variables para gestion rol
  roles :Rol[] = [];
  rolupd:Rol = new Rol();
  rolactual;
  // Variables para gestion de opciones
  opciones:Opciones[]=[];
  opcionupd:Opciones = new Opciones();
  opcionactual;
  idusuarioactual;
 // Variables para asignar rol a usuario
  rolesdisponibles:Rol[]=[];
  rolactualdisp;
  rolesactualesdeluser:Rol[]=[];
  opcionesactualesdelrol:Opciones[]=[];

  datausuario:UsuarioData[]=[];
  dataSource;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = ['nro', 'usuario', 'nombres', 'opciones','opciones2'];
  ngOnInit(){
    this.listarusuarios();
    this.getroles();
    this.getopciones();
  }

  getroles(){
    this.rolserv.getroles().subscribe(
      (data)=>{
                 console.log(data)
                this.roles= data as Rol[];
      }
    )
  }

  getopciones(){
    this.rolserv.getopciones().subscribe(
      (data)=>{
                 console.log(data)
                this.opciones= data as Opciones[];
      }
    )
  }

 eliminarrol(){
  Swal.fire({
    title: 'Esta seguro?',
    text: "No se puede deshacer una vez eliminado.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(this.rolactual)
      this.rolserv.eliminarrol(this.rolactual).subscribe(
        (data)=>{

          Swal.fire(
            'Eliminado',
            data,
            'success'
          )
          this.getroles();
            
        },(e)=>{
         
            Swal.fire(
              'Opss',
              'No se pudo eliminar',
              'error'
            )
          
          
        }
      )
    }
  })
   

 }

 eliminaropc(){
  Swal.fire({
    title: 'Esta seguro?',
    text: "No se puede deshacer una vez eliminado.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(this.rolactual)
      this.rolserv.eliminaropcion(this.opcionactual).subscribe(
        (data)=>{

          Swal.fire(
            'Eliminado',
            data,
            'success'
          )
          this.getopciones();
            
        },(e)=>{
         
            Swal.fire(
              'Opss',
              'No se pudo eliminar',
              'error'
            )
          
          
        }
      )
    }
  })
   

 }
  

  getrol(){
    this.rolserv.getrolid(this.rolactual).subscribe(
      (data)=>{
           
        this.rolupd = data[0] as Rol;
        console.log(this.rolupd)
   
      }
    )
  }


  
  getopcion(){
    this.rolserv.getopcionid(this.opcionactual).subscribe(
      (data)=>{
           
        this.opcionupd = data[0] as Opciones;
        console.log(this.opcionupd)
   
      }
    )
  }

  modificarRol(){
    this.rolserv.modificarrol(this.rolupd.idrol,this.rolupd.nombre).subscribe(
      (data)=>{
        
        Swal.fire(
          'Modificado',
          data.toString(),
          'success'

        )
        this.getroles();
        this.rolupd=new Rol();
      },(e)=>{
        Swal.fire(
          'Erro',
          'no se pudo modificar',
          'error'
        )
      }
    )
  }

  agregarrol(){
    this.rolserv.agregarrol(this.rolupd.nombre).subscribe(
      (data)=>{
        Swal.fire(
          'Registrado',
          data.toString(),
          'success'

        )
        this.getroles();
        this.rolupd=new Rol();
      },(e)=>{
        Swal.fire(
          'Erro',
          'no se pudo registrar',
          'error'
        )
      }
    )

  }

  modificarOpc(){
    this.rolserv.modificarop(this.opcionupd).subscribe(
      (data)=>{
        
        Swal.fire(
          'Modificado',
          data.toString(),
          'success'

        )
        this.getopciones();
        this.opcionupd=new Opciones();
      },(e)=>{
        Swal.fire(
          'Erro',
          'no se pudo modificar',
          'error'
        )
      }
    )
  }

  agregarOpc(){
    this.rolserv.agregaropc(this.opcionupd).subscribe(
      (data)=>{
        Swal.fire(
          'Registrado',
          data.toString(),
          'success'

        )
        this.getopciones();
        this.opcionupd=new Opciones();
      },(e)=>{
        Swal.fire(
          'Erro',
          'no se pudo registrar',
          'error'
        )
      }
    )

  }

  cerrarrol(){
    this.rolupd = new Rol();
  }
  cerraropc(){
    this.opcionupd = new Opciones();
  }
  cerrarrolactual(){
    this.rolactualdisp='';
    this.opciondisp='';
  }


  getopcionesdisponibles(){
    this.rolserv.getopcionesdisponibles(this.rolactual).subscribe((data)=> this.opcionesdisponibles = data as Opciones[])
  }

  asignarol_usuario(){
    this.rolserv.agregaropc_rol(this.rolactual,this.opciondisp).subscribe(
      (data)=>{
        Swal.fire(
          'Agregado',
          data.toString(),
          'success'

        )
        this.getopciones();
        this.opciondisp='';
      }
    )
  }


  listarusuarios(){
    this.rolserv.listarusuarios().subscribe(
      (data)=>{
        console.log(data)
           this.datausuario= data as UsuarioData[] ;
           this.dataSource=new MatTableDataSource(this.datausuario);
      }
    )
  }

  agregarrol_user(id){
    this.idusuarioactual=id;
    this.rolserv.getrolesdisponibles(id).subscribe(
      (data)=>{
        this.rolesdisponibles= data as Rol[];
      }
    )
  }
  asignaropc_usuario(){
    this.rolserv.agregarrol_user(this.idusuarioactual,this.rolactualdisp).subscribe(
      (data)=>{
        Swal.fire(
          'Agregado',
          data.toString(),
          'success'

        )
        this.rolactualdisp='';
      }
    )

  }

  listarrolesactuales(id){
    this.rolserv.getrolesactuales(id).subscribe(
      (data)=>{
        console.log(data)
           this.rolesactualesdeluser= data as Rol[] ;
      }
    )
  }
  getopcionesrol(){
    this.rolserv.getopcionesactuales(this.rolactual).subscribe(
      (data)=>{
        this.opcionesactualesdelrol= data as Opciones[];
      }
    )

  }
  cerrardata(){
    this.rolesactualesdeluser=[];
  }
  cerraropcionesactuales(){
    this.opcionesactualesdelrol=[];
  }

  eliminaropcion_rol(id){
    Swal.fire({
      title: 'Esta seguro?',
      text: "No se puede deshacer una vez eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.rolserv.deleteopcionrol(id).subscribe(
          (data)=>{
            Swal.fire(
              'Eliminado',
              data,
              'success'
            ) 
          },(e)=>{
           
              Swal.fire(
                'Opss',
                'No se pudo eliminar',
                'error'
              )
          }
        )
      }
    })
  }

  eliminarrol_user(id){
    Swal.fire({
      title: 'Esta seguro?',
      text: "No se puede deshacer una vez eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.rolserv.deleteroluser(id).subscribe(
          (data)=>{
            Swal.fire(
              'Eliminado',
              data,
              'success'
            ) 
          },(e)=>{
           
              Swal.fire(
                'Opss',
                'No se pudo eliminar',
                'error'
              )
          }
        )
      }
    })
  }
}
