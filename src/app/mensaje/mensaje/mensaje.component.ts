import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Correo } from 'src/app/models/Correo';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  detalleco:Correo =new Correo();
  correo:Correo = new Correo()
  displayedColumns: string[] = ['nro', 'titulo', 'destinatario', 'fecha','detalle'];
  constructor(private service:UserService,private auth:AuthService,private formBuilder: FormBuilder) { 
    this.form = formBuilder.group({
      titulo: new FormControl('', [Validators.required]),
      destinatario: new FormControl('',[Validators.required]),
      mensaje: new FormControl('',[Validators.required]),
      });
  }
  dataSource=null;
  form;
@ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  ngOnInit() {
    this.obtenerarchivos()
  }

  enviar(){
    this.correo = this.form.value;
    let fecha=  new Date()
    this.correo.idusuario = this.auth.usuario;
    this.correo.fecha=fecha;

    console.log(this.correo)
    this.service.enviarcorre(this.correo).subscribe(data=>{
     
      Swal.fire({
        
        icon: 'success',
        title: 'Mensaje enviado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.obtenerarchivos();
    })
    
       

  }
  obtenerarchivos(){
    this.service.getcorreos(this.auth.usuario).subscribe(data=>{
      this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginador;
    })
  }
mostrar(element){
  this.detalleco =element;
   
}
}
