import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Atencion } from 'src/app/models/Atencion';
import { Paciente } from 'src/app/models/Paciente';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrarAtencionService } from 'src/app/services/registrar-atencion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-atencion',
  templateUrl: './registrar-atencion.component.html',
  styleUrls: ['./registrar-atencion.component.css']
})
export class RegistrarAtencionComponent implements OnInit {
  cargando=false;
  proximafecha;
  idatencionactual;
  counter;
  idpac;
  paciente= new Paciente();
  idasignacion;
  atencion=new Atencion();
  datapaciente:FormGroup;
  fechaatencion:FormGroup;
  datosatencion:FormGroup;
  constructor(private token:AuthService,private registerserv:RegistrarAtencionService ) { }
  datalist:any = [];
  derivacion=false;
  ngOnInit() {
    this.datapaciente = new FormGroup({
      religion: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      edad :new FormControl('', Validators.required),
      ocupacion :new FormControl(''),
      fecha_nacimiento: new FormControl('',  Validators.required),
      grado_educacion: new FormControl('')
      
    });
    this.fechaatencion = new FormGroup({
      fecha: new FormControl('', Validators.required),
    });

    this.datosatencion = new FormGroup({
      nro_sesion: new FormControl({value:'',disabled:true}, Validators.required),
      condicion: new FormControl('', Validators.required),
      evidencia :new FormControl('', Validators.required),
      observaciones :new FormControl('', Validators.required),
    });
    this.llamarpacientes();

  }

  llamarpacientes(){
    this.cargando=true;
    console.log(this.token.usuario.idpersonal)
    this.registerserv.getlistpac(this.token.usuario.idpersonal).subscribe(

      data=>{
        this.cargando=false;
                this.datalist=data; console.log(data)}
    )
  }




  verificarsesiones(idasignacion,idpacc){
    this.cargando=true;
    this.idpac=idpacc;
    this.idasignacion=idasignacion;
    this.registerserv.getnroregistros(idasignacion).subscribe(
      data=>{
       if(data[0]['count']==0) {
        this.counter= Number(data[0]['count'])
         this.datosatencion.get('nro_sesion').setValue(this.counter+1)
        this.cargando=false;
        
       }else{
        
         this.counter= Number(data[0]['count'])
         this.datosatencion.get('nro_sesion').setValue(this.counter+1)
         this.registerserv.getidsesion(idasignacion).subscribe(
           data=>{
            this.cargando=false;
             console.log(data);
             this.idatencionactual= data[0]['idregistro_aten']
           }
         )

       }
    
      })}



      registraratencion(){
        this.cargando=true;
    console.log(this.counter)
    switch (this.counter) {
      case 0:
        this.proximafecha= this.fechaatencion.controls['fecha'].value;
        this.paciente= this.datapaciente.value;
        this.paciente.idpaciente= this.idpac;
        this.atencion= this.datosatencion.value;
        this.atencion.nro_sesion=this.counter+1;
        this.registerserv.registrardata1(this.paciente,this.atencion, this.idasignacion, this.proximafecha).subscribe(data=>{
          console.log(data);
          this.cargando=false;
          this.cerrarmodal();
          this.reset();
          Swal.fire(
            'Registrado',
            data.toString(),
            'success'
  
          )
        
       });
      

        break;
      case 1:   
      this.proximafecha= this.fechaatencion.controls['fecha'].value;
      this.atencion= this.datosatencion.value;
      this.atencion.nro_sesion=this.counter+1;
      this.atencion.idregistro_aten=this.idatencionactual;
      this.registerserv.registrardata2(this.atencion, this.idasignacion, this.proximafecha).subscribe(data=>{
        console.log(data);
        this.cargando=false;
        this.cerrarmodal();
        this.reset();
        Swal.fire(
          'Registrado',
          data.toString(),
          'success'

        )
       
     });
    

        break;
      case 2:
        this.atencion= this.datosatencion.value;
      this.atencion.idregistro_aten=this.idatencionactual;
      this.atencion.nro_sesion=this.counter+1;
      this.registerserv.registrardata3(this.atencion, this.idpac, this.derivacion).subscribe(
        data=>{ 
          console.log(data)

          this.cargando=false;

          this.llamarpacientes();
          this.cerrarmodal();
          this.reset();
          Swal.fire(
            'Registrado',
            data.toString(),
            'success'
  
          )
         
        });
      
        
        break;
      default:
        break;
    }
      
      }


      cerrarmodal(){
        document.getElementById('register_aten').click();
      }

      reset(){
        this.datapaciente.reset();
        this.datosatencion.reset();
        this.fechaatencion.reset();
      }
}
