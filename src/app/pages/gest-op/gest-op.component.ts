import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Opciones } from 'src/app/models/Opciones';
import { Rol } from 'src/app/models/Rol';
import { RolOpService } from 'src/app/services/rol-op.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gest-op',
  templateUrl: './gest-op.component.html',
  styleUrls: ['./gest-op.component.css']
})
export class GestOpComponent implements OnInit {

  constructor(private rolserv:RolOpService) { }
  roles :Rol[] = [];
  opciones:Opciones[]=[];
  rolupd:Rol = new Rol();
  opcionupd:Opciones = new Opciones();
  rolactual;
  opcionactual;
  ngOnInit(){
    
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
}
