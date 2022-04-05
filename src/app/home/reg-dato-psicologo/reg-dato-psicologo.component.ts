
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Horario_psicologo } from '../../models/Horario_psicologo';
import { Persona } from '../../models/Persona';
import { Personal_ayuda } from '../../models/Personal';

import { RegDatoPsicologoService } from '../../services/reg-dato-psicologo.service';
export class Horario{
  dia:string;
  horai:string;
  horaf:string;
}
@Component({
  selector: 'app-reg-dato-psicologo',
  templateUrl: './reg-dato-psicologo.component.html',
  styleUrls: ['./reg-dato-psicologo.component.css']
})
export class RegDatoPsicologoComponent implements OnInit,OnDestroy{
horarios:Horario_psicologo[]=[]
dia;
horai;
otro;
horaf;
dias=['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']
  constructor(private route: Router,private service:RegDatoPsicologoService) { }
 
  registerform:FormGroup;
    tipo;
    persona:Persona= new Persona();
    personal_ayuda = new Personal_ayuda()
  psicologo:FormGroup;
  estudiante:FormGroup;
  pastor:FormGroup;
  ngOnDestroy(): void {
    let script = document.getElementById('step');
    if(script) {
        script.remove();
    } 
  }

  ngOnInit() {
    let body = document.getElementsByTagName("body")[0];
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.id="step";
    s.src = "./assets/js/stepper.js";
    body.appendChild(s);

  

    this.tipo='estudiante'
    this.psicologo = new FormGroup({
     
      grado_academico: new FormControl('', Validators.required),
      n_colegiatura: new FormControl('',Validators.maxLength(4)),
      especialidad: new FormControl(''),
      
    });
    
    this.registerform = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required,Validators.email]),
      genero: new FormControl('', ),
      edad: new FormControl('',Validators.maxLength(8)),
      sede: new FormControl('', Validators.required),
      telefono: new FormControl('',  Validators.compose([Validators.required, Validators.maxLength(9)]))
    });
    
    this.estudiante = new FormGroup({
      grupo: new FormControl('', [Validators.required]),
      ciclo: new FormControl('', Validators.required),
      codigo: new FormControl('', [Validators.maxLength(9),Validators.required]),
    });
    this.pastor = new FormGroup({
      distrito: new FormControl('', [Validators.required]),
      campo: new FormControl('', Validators.required),
    });
  }


  siguiente(){
    
  }
  volver(){
    this.route.navigate(['home/loginpsi'])
  }
agregarhorario(){
  var horarioadd = new Horario_psicologo();
  horarioadd.dia=this.dia;
  horarioadd.horai=this.horai;
  horarioadd.horaf=this.horaf;
  this.horarios.push(horarioadd);
  var i = this.dias.indexOf( this.dia );
  this.dias.splice( i, 1 );
  this.dia = ''
  this.horai=''
  this.horaf=''
  console.log(this.horarios);
  
}
  eliminarhor(dia){
    const indice = this.horarios.findIndex((elemento, indice) => {
      if (elemento.dia == dia) {
        return true;
        
      }
    });
    console.log(indice)
    this.dias.push(dia)
    this.horarios.splice(indice,1)
    console.log(this.horarios)
  }
  
  guardardata(){
    switch (this.tipo) {
      case 'estudiante':
        if(this.registerform.get('sede').value == 'Otra'){
            this.registerform.get('sede').setValue(this.otro);
        }
        this.personal_ayuda = this.estudiante.value;
        this.persona = this.registerform.value;
        this.persona.tipo = this.tipo;
        this.service.crear_datos_psicologo(this.persona,this.personal_ayuda,this.horarios).subscribe(
          data=>{
            Swal.fire({
              icon: 'success',
              title: '',
              text: data.toString(),
            })
            this.reset();
          }
        )
        break;
        case 'psicologo':
          if(this.registerform.get('sede').value == 'Otra'){
            this.registerform.get('sede').setValue(this.otro);
          }
          this.personal_ayuda = this.psicologo.value;
          this.persona = this.registerform.value;
          this.persona.tipo = this.tipo;
          this.service.crear_datos_psicologo(this.persona,this.personal_ayuda,this.horarios).subscribe(
            data=>{
              Swal.fire({
                icon: 'success',
                title: '',
                text: data.toString(),
              })
              this.reset();
            }
          )
          break;
          case 'pastor':
            if(this.registerform.get('sede').value == 'Otra'){
              this.registerform.get('sede').setValue(this.otro);
            }
            this.personal_ayuda = this.pastor.value;
            this.persona = this.registerform.value;
            this.persona.tipo = this.tipo;
            this.service.crear_datos_psicologo(this.persona,this.personal_ayuda,this.horarios).subscribe(
              data=>{
                Swal.fire({
                  icon: 'success',
                  title: '',
                  text: data.toString(),
                })
                this.reset();
              }
            )
            break;
      default:
        break;
    }
  

  }



 reset(){
   this.psicologo.reset();
   this.estudiante.reset();
   this.pastor.reset();
   this.registerform.reset();
   this.horarios = [];
   this.dias=['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']
 }
}
