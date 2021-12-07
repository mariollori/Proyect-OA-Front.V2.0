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
  check6: boolean = false; check8: boolean = false;
  check7: boolean = false; check9: boolean = false;
  check3: boolean = false; check4: boolean = false;
  check5: boolean = false; check10: boolean = false;


  persona: Persona;
  paciente: Paciente;


  private array: Map<String, HTMLElement> = new Map();
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


  seleccionaritems(i: number) {
    this.crearlista1();
    switch (i) {
      case 1:
        this.check1 = !this.check1;
       this.check2 = false;
        this.check6 = false; this.check7 = false;
        this.check8 = false; this.check9 = false;
        this.check3 = false; this.check4 = false;
        this.check5 = false; this.check10 = false;



        this.cambiarclases("alimentacion", this.check1);
        break;
      case 2:
        this.check2 = !this.check2;
        this.check1 = false; 
    this.check6 = false; this.check7 = false;
    this.check8 = false; this.check9 = false;
    this.check3 = false; this.check4 = false;
    this.check5 = false; this.check10 = false;


        this.cambiarclases("ansiedad", this.check2);
        break;
      case 3:
        this.check3 = !this.check3;
        this.check1 = false; this.check2 = false;
        this.check6 = false; this.check7 = false;
        this.check8 = false; this.check9 = false;
         this.check4 = false;
        this.check5 = false; this.check10 = false;

        this.cambiarclases("depresion", this.check3);
        break;
      case 4:
        this.check4 = !this.check4;
        this.check1 = false; this.check2 = false;
    this.check6 = false; this.check7 = false;
    this.check8 = false; this.check9 = false;
    this.check3 = false;    this.check5 = false; this.check10 = false;

        this.cambiarclases("suicidio", this.check4);
        break;
      case 5:
        this.check5 = !this.check5;
        this.check1 = false; this.check2 = false;
    this.check6 = false; this.check7 = false;
    this.check8 = false; this.check9 = false;
    this.check3 = false; this.check4 = false;
  this.check10 = false;

        this.cambiarclases("familiar", this.check5);
        break;
      case 6:
        this.check6 = !this.check6;
        this.check1 = false; this.check2 = false;
        this.check5 = false; this.check7 = false;
        this.check8 = false; this.check9 = false;
        this.check3 = false; this.check4 = false;
      this.check10 = false;

        this.cambiarclases("bulling", this.check6);
        break;
      case 7:
        this.check7 = !this.check7;
        this.check1 = false; this.check2 = false;
        this.check6 = false; this.check5 = false;
        this.check8 = false; this.check9 = false;
        this.check3 = false; this.check4 = false;
      this.check10 = false;

        this.cambiarclases("deficit", this.check7);
        break;
      case 8:
        this.check8 = !this.check8;
        this.check1 = false; this.check2 = false;
        this.check6 = false; this.check7 = false;
        this.check5 = false; this.check9 = false;
        this.check3 = false; this.check4 = false;
      this.check10 = false;
        this.cambiarclases("bipolaridad", this.check8);
        break;
      case 9:
        this.check9 = !this.check9;
        this.check1 = false; this.check2 = false;
        this.check6 = false; this.check7 = false;
        this.check8 = false; this.check5 = false;
        this.check3 = false; this.check4 = false;
      this.check10 = false;
        this.cambiarclases("fobia", this.check9);
        break;
      case 10:
        this.check10 = !this.check10;
        this.check1 = false; this.check2 = false;
    this.check6 = false; this.check7 = false;
    this.check8 = false; this.check9 = false;
    this.check3 = false; this.check4 = false;
  this.check5 = false;
        this.cambiarclases("trastorno", this.check10);
        break;


      default:
        break;
    }
  }



  cambiarclases(nombre: string, valor: boolean) {
    this.motivo = nombre;
    this.array.forEach(element => {
      if (element.classList.contains(nombre) && valor != false) {
        element.style.backgroundColor = "#00a99d";
        element.style.color = "white";
        element.style.border = " 3px solid white"
        this.verificarchecks()
      } else {
        element.style.backgroundColor = "white";
        element.style.color = "black";

        this.verificarchecks()
      }
    });
  }



  verificarchecks() {
    if (this.check1 == false && this.check2 == false && this.check3 == false && this.check4 == false && this.check5 == false
      && this.check6 == false && this.check7 == false &&
      this.check8 == false && this.check9 == false && this.check10 == false
    ) {
      this.firstFormGroup.get('firstCtrl').setValidators(Validators.required);
      this.firstFormGroup.get('firstCtrl').updateValueAndValidity();
    } else {
      this.firstFormGroup.get('firstCtrl').clearValidators();
      this.firstFormGroup.get('firstCtrl').updateValueAndValidity();
    }

  }

  crearlista1() {

    this.array.set("ansiedad", document.getElementById("ansiedad"));
    this.array.set("depresion", document.getElementById("depresion"));
    this.array.set("suicidio", document.getElementById("suicidio"));
    this.array.set("alimentacion", document.getElementById("alimentacion"));
    this.array.set("familiar", document.getElementById("familiar"));
    this.array.set("bulling", document.getElementById("bulling"));
    this.array.set("deficit", document.getElementById("deficit"));
    this.array.set("bipolaridad", document.getElementById("bipolaridad"));
    this.array.set("fobia", document.getElementById("fobia"));
    this.array.set("transtorno", document.getElementById("trastorno"));
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
      },(error)=>{
        Swal.fire({
          icon: 'success',
          title: '',
          text: 'Dni duplicado.'
        })
      }
    )




  }

  reset() {
    this.check1 = false; this.check2 = false;
    this.check6 = false; this.check7 = false;
    this.check8 = false; this.check9 = false;
    this.check3 = false; this.check4 = false;
    this.check5 = false; this.check10 = false;

    this.verificarchecks();
    this.cambiarclases("", false);

    this.registerform.reset();
    this.descripcion2.reset();

  }
}
