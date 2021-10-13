import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from '../../models/Usuario';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  check1: boolean = false; check2: boolean = false;
  mayor: boolean = false; adulto: boolean = false;
  joven: boolean = false; niño: boolean = false;
  check3: boolean = false;   check4: boolean = false;
  check5: boolean = false;  check6: boolean = false;
  check8: boolean = false;check7: boolean = false;


 

  private array : Map<String,HTMLElement> = new Map();
  private array2: Map<String,HTMLElement> = new Map();
  usuario: Usuario = new Usuario();

  firstFormGroup: FormGroup;

  secondFormGroup: FormGroup;
  constructor(private auth: AuthService, private route: Router, private _snackBar: MatSnackBar, private _formBuilder: FormBuilder) { }



  ngOnInit() {
   
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.requiredTrue]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.requiredTrue]
    });
  }
  seleccionaritems(i: number) {
    switch (i) {
      case 1:
        this.check1 = !this.check1;
        this.check2 = false, this.check3 = false;
        this.check4 = false, this.check5 = false;
        this.check8 = false, this.check6 = false;
        this.check7 = false,
       
        this.cambiarclases("alimentacion",this.check1);
        break;
      case 2:
        this.check2 = !this.check2;
        this.check1 = false, this.check3 = false;
        this.check4 = false,
        this.check5 = false, this.check6 = false;
        this.check7 = false,this.check8 = false,
        
        this.cambiarclases("ansiedad",this.check2);
        break;
      case 3:
        this.check3 = !this.check3;
        this.check1 = false, this.check2 = false;
        this.check4 = false,
        this.check5 = false, this.check6 = false;
        this.check7 = false,this.check8 = false,
        this.cambiarclases("depresion",this.check3);
        break;
      case 4:
        this.check4 = !this.check4;
        this.check1 = false, this.check3 = false;
        this.check2 = false,
        this.check5 = false, this.check6 = false;
        this.check7 = false,this.check8 = false,
        this.cambiarclases("suicidio",this.check4);
        break;
      case 5:
        this.check5 =!this.check5;
        this.check1 = false, this.check3 = false;
        this.check4 = false,
        this.check2 = false, this.check6 = false;
        this.check7 = false,this.check8 = false,
        this.cambiarclases("familiar",this.check5);
        break;
      case 6:
        this.check6 = !this.check6;
        this.check1 = false, this.check3 = false;
        this.check4 = false,
        this.check5 = false, this.check2 = false;
        this.check7 = false,this.check8 = false,
        this.cambiarclases("fobia",this.check6);
        break;
      case 7:
        this.check7 =!this.check7;
        this.check1 = false, this.check3 = false;
        this.check4 = false,
        this.check5 = false, this.check6 = false;
        this.check2 = false,this.check8 = false,
        this.cambiarclases("bulling",this.check7);
        break;
      case 8:
        this.check8 = !this.check8;
        this.check1 = false, this.check3 = false;
        this.check4 = false,
        this.check5 = false, this.check6 = false;
        this.check7 = false,this.check2 = false,
        this.cambiarclases("otra",this.check8);
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


  cerrar(){
    let div = document.getElementById("cuerpouno");
    div.style.display = " none";
    this.crearlista1();
    
  }

  cambiarclases(nombre:string, valor:boolean){
    this.array.forEach(element=>{  
      if(element.classList.contains(nombre) && valor!=false){
        element.style.backgroundColor="#00a99d";
        element.style.color="white";
       this.verificarchecks()
      }else{
        element.style.backgroundColor="white";
        element.style.color="black";
        this.verificarchecks()
      }
    });
   }

   cambiarclasesedad(nombre:string, valor:boolean){
    this.array2.forEach(element=>{  
      if(element.classList.contains(nombre) && valor!=false){
        element.style.backgroundColor="#00a99d";
        element.style.color="white";
       this.verificaredad()
      }else{
        element.style.backgroundColor="white";
        element.style.color="black";
        this.verificaredad()
      }
    });
   }


  verificarchecks() {
    if (this.check1 == false && this.check2 == false && this.check3 == false && this.check4 == false && this.check5 == false && this.check6 == false && this.check7 == false && this.check8 == false) {
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

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      alert('Error Login: Username o passwor vacios')

    }
    this.auth.login(this.usuario).subscribe(
      response => {
        console.log(JSON.parse(atob(response.token.split('.')[1])))
        this.auth.guardartoken(response.token);
        this.auth.guardarusuario(response.token)
        this.route.navigate(['nav/archivos'])
      }, err => {
        this._snackBar.open('Usuario o Contraseña incorrectos', 'cerrar', { duration: 2 * 1000 });
      }
    )
  }

  crearlista1(){
    this.array.set("bulling",document.getElementById("bulling"));
    this.array.set("ansiedad",document.getElementById("ansiedad"));
    this.array.set("depresion",document.getElementById("depresion"));
    this.array.set("suicidio",document.getElementById("suicidio"));
    this.array.set("alimentacion",document.getElementById("alimentacion"));
    this.array.set("familiar",document.getElementById("familiar"));
    this.array.set("fobia",document.getElementById("fobia"));
    this.array.set("otra",document.getElementById("otra"));    
  }

  cerrar2(){
    this.crearlista2();
  }
  crearlista2(){
    this.array2.set("joven",document.getElementById("joven"));
    this.array2.set("mayor",document.getElementById("mayor"));
    this.array2.set("adulto",document.getElementById("adulto"));
    this.array2.set("niño",document.getElementById("niño"));
  }








}
