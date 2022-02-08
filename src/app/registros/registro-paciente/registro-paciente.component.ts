import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
 

 check;
  persona: Persona;
  paciente: Paciente;


  private array:Array<HTMLElement> = new Array(); 
  private array2: Map<String, HTMLElement> = new Map();


  firstFormGroup: FormGroup;



  registerform: FormGroup;

  motivo: string;

  descripcion2 = new FormControl('', Validators.required);
  constructor(private _formBuilder: FormBuilder, private route: Router, private pacienteserv: PersonaService) { }

  ngOnInit() {
    



    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl('', Validators.requiredTrue)
    });


    this.registerform = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      genero: new FormControl('',),
      dni: new FormControl('', Validators.maxLength(8)),
      telefono: new FormControl('', Validators.required)

    });
  }


  seleccionaritems(num: number) {
  
    this.crearlista1();
    
    this.array.forEach(card => {
      if(this.array[num] === card){
        if(this.array[num].classList.contains('animated')){
          this.array[num].classList.remove('animated');
          this.array[num].style.backgroundColor = "white";
          this.array[num].style.color = "black";
          this.check=false;
            this.verificarchecks();
            this.motivo='';
         
        }else{

          for (var i = 0; i < this.array.length; i++) {
            this.array[i].style.backgroundColor = "white";
            this.array[i].style.color = "black";
            this.array[i].classList.remove('animated');
          }
          
          this.array[num].style.backgroundColor = "#00a99d";
           this.array[num].style.color = "white";
           this.array[num].style.border = " 3px solid white"
           this.array[num].className += ' animated';
           this.check=true;
           this.motivo=this.array[num].id;
           this.verificarchecks();
        
        }
      }

    });
    
  }



  


  verificarchecks() {
    if (this.check==false) {
      this.firstFormGroup.get('firstCtrl').setValidators(Validators.required);
      this.firstFormGroup.get('firstCtrl').updateValueAndValidity();
    } else {
      this.firstFormGroup.get('firstCtrl').clearValidators();
      this.firstFormGroup.get('firstCtrl').updateValueAndValidity();
    }

  }

  crearlista1() {
    this.array= new Array(); 
    this.array.push( document.getElementById("alimentacion"));
    this.array.push( document.getElementById("ansiedad"));
    this.array.push( document.getElementById("depresion"));
    this.array.push( document.getElementById("suicidio"));
    this.array.push( document.getElementById("familiar"));
    this.array.push( document.getElementById("bulling"));
    this.array.push( document.getElementById("deficit"));
    this.array.push( document.getElementById("bipolaridad"));
    this.array.push( document.getElementById("fobia"));
    this.array.push( document.getElementById("trastorno"));
  }




  volver() {
    this.route.navigate(['home'])
  }

  guardarpaciente() {
    this.persona = this.registerform.value;
    this.paciente = new Paciente();
    this.paciente.descripcion = this.descripcion2.value;

    this.paciente.motivo = this.motivo;

    this.pacienteserv.crearpersona(this.persona, this.paciente).subscribe(
      (data) => {
        Swal.fire({
          icon: 'success',
          title: '',
          text: data.toString(),
        })
        this.reset()
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Dni duplicado.'
        })
      }
    )




  }

  reset() {
    this.check = false;

    this.verificarchecks();
    

    this.registerform.reset();
    this.descripcion2.reset();

  }
  mostrar(){
    console.log(this.motivo); 
  }
}
