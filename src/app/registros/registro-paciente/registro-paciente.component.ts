import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';

import { Paciente } from 'src/app/models/Paciente';
import { Persona } from 'src/app/models/Persona';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {
  check1: boolean = false; check2: boolean = false;
  mayor: boolean = false; adulto: boolean = false;
  joven: boolean = false; niño: boolean = false;
  check3: boolean = false;   check4: boolean = false;
  check5: boolean = false

  
  persona:Persona;
  paciente:Paciente;
  

  private array : Map<String,HTMLElement> = new Map();
  private array2: Map<String,HTMLElement> = new Map();

 
  firstFormGroup: FormGroup;

  secondFormGroup: FormGroup;

  registerform:FormGroup;
  edad:string;
  motivo:string;
  
  descripcion2 = new FormControl('', Validators.required);
  constructor(private _formBuilder: FormBuilder,private route: Router, private pacienteserv:PersonaService) { }

  ngOnInit() {
   
    this.firstFormGroup = new FormGroup({
      firstCtrl : new FormControl('', Validators.requiredTrue)
    });
    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl('', Validators.requiredTrue)
    });
    
    this.registerform = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required,Validators.email]),
      genero: new FormControl('', ),
      dni: new FormControl('',Validators.maxLength(8) ),
      telefono: new FormControl('', Validators.required)
      
    });
  }


  seleccionaritems(i: number) {
    this.crearlista1();
    switch (i) {
      case 1:
        this.check1 = !this.check1;
        this.check2 = false, this.check3 = false;
        this.check4 = false, this.check5 = false;
        
      
       
        this.cambiarclases("alimentacion",this.check1);
        break;
      case 2:
        this.check2 = !this.check2;
        this.check1 = false, this.check3 = false;
        this.check4 = false,
        this.check5 = false
       
        
        this.cambiarclases("ansiedad",this.check2);
        break;
      case 3:
        this.check3 = !this.check3;
        this.check1 = false, this.check2 = false;
        this.check4 = false,
        this.check5 = false
      
        this.cambiarclases("depresion",this.check3);
        break;
      case 4:
        this.check4 = !this.check4;
        this.check1 = false, this.check3 = false;
        this.check2 = false,
        this.check5 = false
      
        this.cambiarclases("suicidio",this.check4);
        break;
      case 5:
        this.check5 =!this.check5;
        this.check1 = false, this.check3 = false;
        this.check4 = false,
        this.check2 = false
      
        this.cambiarclases("familiar",this.check5);
        break;
    
     
      default:
        break;
    }
  }
  seleccionaredad(i: number) {
    switch (i) {
      case 1:
        this.mayor = !this.mayor;
        this.adulto = false, this.joven = false;
        this.niño = false,
        this.cambiarclasesedad("mayor",this.mayor);
        break;
      case 2:
        this.adulto = !this.adulto;
        this.mayor = false, this.joven = false;
        this.niño = false,
        this.cambiarclasesedad("adulto",this.adulto);
        break;
      case 3:
        this.joven = !this.joven;
        this.adulto = false, this.mayor = false;
        this.niño = false,
        this.cambiarclasesedad("joven",this.joven);
        break;
      case 4:
        this.niño = !this.niño;
        this.adulto = false, this.joven = false;
        this.mayor = false,
        this.cambiarclasesedad("niño",this.niño);
        break;
      default:
        break;
    }
  }

  
  cambiarclases(nombre:string, valor:boolean){
    this.motivo=nombre;
    this.array.forEach(element=>{  
      if(element.classList.contains(nombre) && valor!=false){
        element.style.backgroundColor="#00a99d";
        element.style.color="white";
        element.style.border=" 3px solid white"
       this.verificarchecks()
      }else{
        element.style.backgroundColor="white";
        element.style.color="black";
      
        this.verificarchecks()
      }
    });
   }

   cambiarclasesedad(nombre:string, valor:boolean){
     this.edad =nombre ;
    this.array2.forEach(element=>{  
      if(element.classList.contains(nombre) && valor!=false){
        element.style.backgroundColor="#00a99d";
        element.style.color="white";
        element.style.border=" 3px solid white"
       this.verificaredad()
      }else{
       
        element.style.backgroundColor="white";
        element.style.color="black";
        this.verificaredad()
      }
    });
   }


  verificarchecks() {
    if (this.check1 == false && this.check2 == false && this.check3 == false && this.check4 == false && this.check5 == false  ) {
      this.firstFormGroup.get('firstCtrl').setValidators(Validators.required);
      this.firstFormGroup.get('firstCtrl').updateValueAndValidity();
    } else {
      this.firstFormGroup.get('firstCtrl').clearValidators();
      this.firstFormGroup.get('firstCtrl').updateValueAndValidity();
    }

  }
  verificaredad() {
    if (this.mayor == false && this.joven == false && this.adulto == false && this.niño == false) {
      this.secondFormGroup.get('secondCtrl').setValidators(Validators.required);
      this.secondFormGroup.get('secondCtrl').updateValueAndValidity();
    } else {
      this.secondFormGroup.get('secondCtrl').clearValidators();
      this.secondFormGroup.get('secondCtrl').updateValueAndValidity();
    }

  }
  crearlista1(){
    
    this.array.set("ansiedad",document.getElementById("ansiedad"));
    this.array.set("depresion",document.getElementById("depresion"));
    this.array.set("suicidio",document.getElementById("suicidio"));
    this.array.set("alimentacion",document.getElementById("alimentacion"));
    this.array.set("familiar",document.getElementById("familiar"));
  

  }

  crearlista2(){
    this.array2.set("joven",document.getElementById("joven"));
    this.array2.set("mayor",document.getElementById("mayor"));
    this.array2.set("adulto",document.getElementById("adulto"));
    this.array2.set("niño",document.getElementById("niño"));
  }
  cerrar2(){
    this.crearlista2();
  }

  volver(){
    this.route.navigate(['home'])
  }

  guardarpaciente(){
    this.persona=this.registerform.value;
    this.paciente = new Paciente();
    this.paciente.descripcion= this.descripcion2.value;
    this.paciente.edad = this.edad;
    this.paciente.motivo = this.motivo;

    this.pacienteserv.crearpersona(this.persona,this.paciente).subscribe(
      (data)=>{
        Swal.fire({
          icon: 'success',
          title: '',
          text: data.toString(),
        })
        this.reset()
       


      }
    )


    
  
    }

    reset(){
      this.check1=  false; this.check2 = false;
      this.mayor= false; this.adulto = false;
      this.joven= false; this.niño = false;
      this.check3=  false;   this.check4 = false;
      this.check5= false;
      this.verificaredad();
      this.verificarchecks();
      this.cambiarclases("",false);
      this.cambiarclasesedad("",false);
      this.registerform.reset();
      this.descripcion2.reset();
      
    }
}
