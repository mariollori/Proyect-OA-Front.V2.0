import { Component, OnInit } from '@angular/core';
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
  selector: 'app-gest-users',
  templateUrl: './gest-users.component.html',
  styleUrls: ['./gest-users.component.css']
})
export class GestUsersComponent implements OnInit {
  rolactualdisp;
  constructor(private rolserv:RolOpService) { }
  datausuario:UsuarioData[]=[];
  datapsi:any[]=[];
  dataSource;
  dataSource2;
  rolactual;
  rolesactualesdeluser:Rol[]=[];
  rolesdisponibles:Rol[]=[];
  idusuarioactual;
cargando=false;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = ['nro', 'usuario', 'nombres', 'opciones','opciones2'];
  displayedColumns2: string[] = ['nro', 'nombres', 'tipo', 'grupo','ciclo','opciones','opciones2'];
  ngOnInit() {
    this.listarusuarios();
    this.listarpsicologos();
  }
  cerrarrolactual(){
    this.rolactualdisp='';
   
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
  listarusuarios(){
    this.rolserv.listarusuarios().subscribe(
      (data)=>{
        console.log(data)
           this.datausuario= data as UsuarioData[] ;
           this.dataSource=new MatTableDataSource(this.datausuario);
      }
    )
  }
  listarpsicologos(){
    this.rolserv.getpsicologos().subscribe(
      (data)=>{
        console.log(data)
           this.datapsi= data as any[] ;
           this.dataSource2=new MatTableDataSource(this.datapsi);
      }
    )
  }
  listarrolesactuales(id){
    this.cargando=true
    this.rolserv.getrolesactuales(id).subscribe(
      (data)=>{
        this.cargando=false;
        console.log(data)
           this.rolesactualesdeluser= data as Rol[] ;
      }
    )
  }
  cerrardata(){
    this.rolesactualesdeluser=[];
  }




  agregarrol_user(id){
    this.idusuarioactual=id;
    this.rolserv.getrolesdisponibles(id).subscribe(
      (data)=>{
        this.rolesdisponibles= data as Rol[];
      }
    )
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
