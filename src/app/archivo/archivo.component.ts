import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Archivo } from '../models/Archivo';
import { ArchivoService } from '../services/archivo.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../Usuarios/auth.service';
import { ModalComponent } from './modal/modal.component';


@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {

ext;
type;
form;

archivo:Archivo=new Archivo();
foto:File;
archivos:Archivo[]=[];
dataSource=null;
@ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  constructor(private auth:AuthService,public dialog: MatDialog,private formBuilder: FormBuilder,private route:Router,private service:UserService,private servicea:ArchivoService) {
    this.form = formBuilder.group({
      nombre: new FormControl('', []),
      tipo: new FormControl({value:this.ext,disabled:true},[]),
      foto:new FormControl('',Validators.required)
    });
   }

  displayedColumns: string[] = ['nro', 'nombre', 'tipo', 'url','eliminar'];
  ngOnInit() {

   
    this.obtenerarchivos();
   
  }
  obtenerarchivos(){
    this.servicea.getarchivos(this.auth.usuario).subscribe(
      data=>{
        this.archivos=data
        console.log(data)
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginador;}
    )
  }
  openDialog(foto,tipo) {
    console.log(foto)
    this.dialog.open(ModalComponent, {
      data: {
        foto: foto,
        tipo:tipo
      }
    });
  }
  mostrar(event){
   this.foto=event.target.files[0]
   let nomarr = this.foto.name.split('.');
   
   this.ext = nomarr.pop();
   this.form.controls['nombre'].setValue(nomarr.toString());
   this.form.controls['tipo'].setValue(this.ext);
  }

 eliminar(id,nombre){
  Swal.fire({
    title: 'Esta seguro?',
    text: "Se eliminara por ocmpleto su archivo!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.servicea.deleteimg(id).subscribe(data1=>{
        let hol = this.servicea.deleteimgfirebase(nombre)
          if(hol){
            Swal.fire(
              'Eliminado!',
              'Su archivo se elimino.',
              'success'
            )
            this.obtenerarchivos()
          }else{
            Swal.fire(
              'Opps!',
              'No se elimino.',
              'error'
            )
          }
         
       
      })
    
    }
  })
 }
  

  logout(){
    this.auth.logout();
    
    this.route.navigate(['login'])
  }
  enviar(){
    this.archivo = this.form.value;
    this.archivo.idusuario = this.auth.usuario;
 
    this.archivo.nombre = this.archivo.nombre;
    this.archivo.tipo=this.ext;
    console.log(this.archivo)
    this.servicea.postarchivo(this.archivo).subscribe(data=>{
      this.servicea.guardarimagen(this.foto,this.archivo.nombre);
      this.cerrar();
      this.obtenerarchivos();
      Swal.fire({
        
        icon: 'success',
        title: 'Archivo guardado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    })
    
       

  }
  cerrar(){
    this.form.reset()

  }
}
