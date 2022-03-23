import { Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

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
export class RegistroPacienteComponent implements OnInit ,OnDestroy{
  part1;
  part2;
  part3;
 continuar = false;
 personaform: FormGroup;
 pacienteform:FormGroup;
 preguntas = [
  {id:1,grado:'leve',name:'¿Tienes frecuentes dolores de cabeza?',value:''},
  {id:2,grado:'leve',name:'¿Sus ganas de comer han aumentado o disminuido?',value:''},
  {id:3,grado:'leve',name:'¿Le cuesta trabajo dormir o se despierta y le resulta difícil volver a dormirse?',value:''},
  {id:4,grado:'leve',name:'¿Se asusta con facilidad?',value:''},
  {id:5,grado:'leve',name:'¿Sufre de temblor de manos?',value:''},
  {id:6,grado:'leve',name:'¿Se siente nervioso, tenso, aburrido o intranquilo?',value:''},
  {id:7,grado:'leve',name:'¿Sufre de mala digestión?',value:''},
  {id:8,grado:'leve',name:'¿Le resulta difícil pensar con claridad?',value:''},
  {id:9,grado:'leve',name:'¿Se siente triste?',value:''},
  {id:10,grado:'leve',name:'¿Llora con mucha frecuencia?',value:''},
  {id:11,grado:'leve',name:'¿Tiene dificultades para disfrutar de sus actividades diarias?',value:''},
  {id:12,grado:'leve',name:'¿Tiene dificultades para tomar decisiones?',value:''},
  {id:13,grado:'leve',name:'¿Tiene dificultades para realizar su trabajo (sufre con su trabajo)?',value:''},
  {id:14,grado:'riesgo',name:'¿Le resulta difícil desempeñar un papel últi en su vida?',value:''},
  {id:15,grado:'riesgo',name:'¿Ha perdido interés en las cosas?',value:''},
  {id:16,grado:'riesgo',name:'¿Se siente que es una persona inútil?',value:''},
  {id:17,grado:'riesgo',name:'¿Ha tenido la idea de acabar con su vida?',value:''},
  {id:18,grado:'riesgo',name:'¿Se siente cansado muy a menudo?',value:''},
  {id:19,grado:'riesgo',name:'¿Tiene sensaciones desagradables en su estómago?',value:''},
  {id:20,grado:'riesgo',name:'¿Se cansa con facilidad?',value:''},
  {id:21,grado:'riesgo',name:'¿Siente que alguien ha tratado de herirle de alguna forma? (Mediante el daño, brujería o que lo quieren matar)',value:''},
  {id:22,grado:'riesgo',name:'¿Ha notado interferencias o algo raro en sus pensamientos? (Por ejemplo, que alguien domina, controla, lee o le roba sus pensamientos)',value:''},
  {id:23,grado:'moderado',name:'¿Oye voces sin saber de dónde vienen, o que otras personas no pueden oírlas?',value:''},
  {id:24,grado:'moderado',name:'¿Ha tenido convulsiones, ataques o caídas al suelo, con movimientos de brazos o piernas, con mordeduras?',value:''},
  {id:25,grado:'moderado',name:'¿Alguna vez le ha parecido a su familia, amigos, su médico o su sacerdote, que estaba bebiendo demasiado licor?',value:''},
  {id:26,grado:'moderado',name:'¿Alguna vez ha querido dejar de beber pero no ha podido?',value:''},
  {id:27,grado:'moderado',name:'¿Ha tenido alguna vez dificultades en el trabajo o estudio a causa de la bebida, como beber en el trabajo o lugar de estudio, o faltar a ellos?',value:''},
  {id:28,grado:'riesgo',name:'¿Ha estado en riñas o le han detenido estando borracho?',value:''},
  {id:29,grado:'riesgo',name:'¿Le ha parecido alguna vez que ha bebido demasiado?',value:''},
  {id:30,grado:'riesgo',name:'¿Alguna vez ha sido maltratado(a) psicológicamente?',value:''},
  {id:31,grado:'riesgo',name:'¿Alguna vez ha sido maltratado(a) físicamente?',value:''},
  {id:32,grado:'riesgo',name:'¿Ha sido forzada a tener relaciones sexuales?',value:''},
  
    ]
  

 constructor(private _formBuilder: FormBuilder, private route: Router, private pacienteserv: PersonaService) { }
 

changeValue(event: MatRadioChange, data) {
  
  this.preguntas.map(
    pregunta=>{
      if(pregunta.id == data){
        pregunta.value=event.value;
      }
      return pregunta;
    }
  )

  this.continue();

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
    this.part2=this.preguntas.slice(10,20)
    this.part3=this.preguntas.slice(20,32)


    this.pacienteform = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      motivo: new FormControl('', Validators.required),
      origen: new FormControl('', [ Validators.required])

    });
    this.personaform = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', [ Validators.email]),
      genero: new FormControl('',Validators.required),
      edad: new FormControl('',[Validators.pattern('^[0-9]{2}$'),Validators.required]),
      dni: new FormControl('', Validators.pattern('^[0-9]{8}$')),
      telefono: new FormControl('', [Validators.pattern('^[0-9]{9}$'),Validators.required])

    });
  }



  volver() {
    this.route.navigate(['home'])
  }

  guardarpaciente() {
    
    


    var riesgomod = this.preguntas.filter(x=>x.grado=='riesgo' && x.value=='true' || x.grado=='moderado' && x.value=='true');
    if(riesgomod.length>0){
      /**SE ASIGNA A ESPECIALISTAS */
    }else{
      /**Se asignaran a alumnos */
    }
    this.pacienteserv.crearpersona(this.personaform.value, this.pacienteform.value).subscribe(
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


    

    this.personaform.reset();
    this.preguntas.map(x=>{
      x.value='';
      return x;
    }
      )
    this.pacienteform.reset();

  }
 
  
}
