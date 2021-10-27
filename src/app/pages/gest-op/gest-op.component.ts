import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  rolupd:Rol;

  rolactual;
  ngOnInit(){
    this.rolserv.getroles().subscribe(
      (data)=>{
                 console.log(data)
                this.roles= data as Rol[];
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
  mostrar(){
    console.log(this.rolactual);
  }
}
