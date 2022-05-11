import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import departamentos from 'src/assets/json/departamentos.json';
import provincias from 'src/assets/json/provincias.json';
import distritos from 'src/assets/json/distritos.json';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2';
declare function reset_stepper();
@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit ,OnDestroy{
  part1;
  part2;
departamentos:any[]=departamentos as [];
distritos:any[]= distritos as [];
provincias:any[]= provincias as [];

distritos_dep:any;
provincias_dist:any;

 continuar = false;
 cadena_respuestas;
 personaform: FormGroup;
valid_use:boolean = false;
 pacienteform:FormGroup;

 iddep;
 iddist;

 cargando=false;
 message;

 preguntas = [
  
  {id:1,grado:'leve',name:'¿Sus ganas de comer han aumentado o disminuido?',value:''},
  {id:2,grado:'leve',name:'¿Le cuesta trabajo dormir o se despierta y le resulta difícil volver a dormirse?',value:''},
  {id:3,grado:'leve',name:'¿Se siente nervioso, tenso, aburrido o intranquilo?',value:''},
  {id:4,grado:'leve',name:'¿Se siente triste?',value:''},
  {id:5,grado:'moderado',name:'¿Llora con mucha frecuencia?',value:''},
  {id:6,grado:'leve',name:'¿Tiene dificultades para tomar decisiones?',value:''},
  {id:7,grado:'leve',name:'¿Tiene dificultades para realizar su trabajo (sufre con su trabajo)?',value:''},
  {id:8,grado:'leve',name:'¿Ha perdido interés en las cosas?',value:''},
  {id:9,grado:'riesgo',name:'¿Ha tenido la idea de acabar con su vida?',value:''},
  {id:10,grado:'riesgo',name:'¿Siente que alguien ha tratado de herirle de alguna forma? (Mediante el daño, brujería o que lo quieren matar)',value:''},
  {id:11,grado:'riesgo',name:'¿Oye voces sin saber de dónde vienen, o que otras personas no pueden oírlas?',value:''},
  {id:12,grado:'riesgo',name:'¿Ha tenido convulsiones, ataques o caídas al suelo, con movimientos de brazos o piernas, con mordeduras?',value:''},
  {id:13,grado:'moderado',name:'¿Alguna vez le ha parecido a su familia, amigos, su médico o su sacerdote, que estaba bebiendo demasiado licor?',value:''},
  {id:14,grado:'riesgo',name:'¿Alguna vez ha querido dejar de consumir drogas pero no ha podido?',value:''},
  {id:15,grado:'riesgo',name:'¿Ha estado en riñas o le han detenido estando borracho?',value:''},
  {id:16,grado:'riesgo',name:'¿Alguna vez ha querido dejar de beber pero no ha podido?',value:''},
  {id:17,grado:'moderado',name:'¿Alguna vez ha sido maltratado(a) psicológicamente?',value:''},
  {id:18,grado:'riesgo',name:'¿Alguna vez ha sido maltratado(a) físicamente?',value:''},
  {id:19,grado:'riesgo',name:'¿Ha sido forzada a tener relaciones sexuales?',value:''},
  
    ]

 constructor(private _formBuilder: FormBuilder, private route: Router, private pacienteserv: PersonaService,  private toast: NgToastService) { }
  
 
 list_provincias(event){
  this.iddep =  this.departamentos.filter(x=> {return  x.nombre_ubigeo == event.target.value;})
  this.provincias_dist = this.provincias[Number(this.iddep[0].id_ubigeo)];
 }
 list_distritos(event){
  this.iddist =  this.provincias_dist.filter(x=> { return  x.nombre_ubigeo == event.target.value;})
  this.distritos_dep = this.distritos[Number(this.iddist[0].id_ubigeo) ];
 }



continue(){
  var next = this.preguntas.filter(x=>x.value == '');
  if(next.length > 0){
  }else{
  
    this.continuar = true;
  }
}

  
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



    this.part1=this.preguntas.slice(0,10)
    this.part2=this.preguntas.slice(10,19)



    this.pacienteform = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      como_conocio: new FormControl('', Validators.required),
      departamento: new FormControl('', [ Validators.required]),
      provincia: new FormControl('', [ Validators.required]),
      distrito: new FormControl('', [ Validators.required]),
      categoria:new FormControl(''),
      respuestas:new FormControl('')

    });
    this.personaform = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', [ Validators.email]),
      genero: new FormControl('',Validators.required),
      edad: new FormControl('',[Validators.pattern('^[0-9]{2}$'),Validators.required]),
      dni: new FormControl('', [Validators.pattern('^[0-9]{8}$'),Validators.required]),
      telefono: new FormControl('', [Validators.pattern('^[0-9]{9}$'),Validators.required])

    });
  }



  volver() {
    this.route.navigate(['home'])
  }

  guardarpaciente() {
    var next = this.preguntas.filter(x=>x.value == '');
    if(this.personaform.invalid ||  this.pacienteform.invalid || next.length > 0 || this.valid_use == false){
      this.toast.error({detail:"ERROR",summary:'Porfavor verifique los campos',duration:3000}); 
    }else{
      this.pacienteform.get('respuestas').setValue(this.cadena_respuestas.toString())
      var riesgomod = this.preguntas.filter(x=> x.grado=='moderado' && x.value=='true');
      var riesgofuerte =  this.preguntas.filter(x=>x.grado=='riesgo' && x.value=='true' );
      if(riesgofuerte.length>0){
         this.pacienteform.get('categoria').setValue('Riesgo')
      }else if(riesgomod.length>0){
         this.pacienteform.get('categoria').setValue('Moderado') 
      }else{
        this.pacienteform.get('categoria').setValue('Leve')
      }
      this.message='Registrando consulta....';
      this.cargando=true;
      this.pacienteserv.crearpersona(this.personaform.value, this.pacienteform.value).subscribe(
        (data) => {
          this.cargando= false;
          Swal.fire({
            title: '¡Su consulta fue registrada!',
            
         
            imageUrl: 'http://www.360inmovalencia.com/images/mail.gif',
            imageWidth: 190,
            imageAlt: 'Gracias.',
            text: data.toString(),
            
          })
          this.reset();
          reset_stepper();
        }, (error) => {
          this.cargando=false
         
          Swal.fire({
            icon: 'error',
            title: '',
            text: error.error
          })
        }
      )
    }
 



  }

  reset() {
    this.personaform.reset();
    this.pacienteform.reset();
    this.preguntas = this.preguntas.map(x=>{x.value='';return x;})
    this.part1=this.preguntas.slice(0,10);
    this.part2=this.preguntas.slice(10,19);
    this.continuar=false;
    document.getElementById("ischeck").click();
    this.valid_use = false;
  }
 
  cambiartexto(){
    this.cadena_respuestas= this.preguntas.map(x=>{
       return x.value; 
    })
  }

  change_use(value:boolean){
    this.valid_use = value;
   
  }
  
}
