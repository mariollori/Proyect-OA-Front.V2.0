import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Atencion } from 'src/app/models/Atencion';
import { Cancelacion } from 'src/app/models/Cancelacion';
import { Paciente } from 'src/app/models/Paciente';
import { AuthService } from 'src/app/services/auth.service';
import { RegistrarAtencionService } from 'src/app/services/registrar-atencion.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-atencion',
  templateUrl: './registrar-atencion.component.html',
  styleUrls: ['./registrar-atencion.component.css']
})
export class RegistrarAtencionComponent implements OnInit {
  /**Pacientes asignados (all) */
  pacientes_asignados:any = [];
  asig_actual;
  paciente_info;
  atenciones_registradas;
  counter;
  datapaciente:FormGroup;
  datosatencion:FormGroup;

  aten_paciente;

  /** Pregunta */
  preguntas = [
    {id:1,grado:'leve',name:'¿Tienes frecuentes dolores de cabeza?',value:''},
    {id:2,grado:'leve',name:'¿Sus ganas de comer han aumentado o disminuido?',value:''},
    {id:3,grado:'leve',name:'¿Le cuesta trabajo dormir o se despierta y le resulta difícil volver a dormirse?',value:''},
    {id:4,grado:'leve',name:'¿Se asusta con facilidad?',value:''},
    {id:5,grado:'leve',name:'¿Sufre de temblor de manos?',value:''},
    {id:6,grado:'leve',name:'¿Se siente nervioso, tenso, aburrido o intranquilo?',value:''},
    {id:7,grado:'leve',name:'¿Sufre de mala digestión?',value:''},
    {id:8,grado:'moderado',name:'¿Le resulta difícil pensar con claridad?',value:''},
    {id:9,grado:'leve',name:'¿Se siente triste?',value:''},
    {id:10,grado:'moderado',name:'¿Llora con mucha frecuencia?',value:''},
    {id:11,grado:'leve',name:'¿Tiene dificultades para disfrutar de sus actividades diarias?',value:''},
    {id:12,grado:'leve',name:'¿Tiene dificultades para tomar decisiones?',value:''},
    {id:13,grado:'leve',name:'¿Tiene dificultades para realizar su trabajo (sufre con su trabajo)?',value:''},
    {id:14,grado:'leve',name:'¿Le resulta difícil desempeñar un papel últi en su vida?',value:''},
    {id:15,grado:'leve',name:'¿Ha perdido interés en las cosas?',value:''},
    {id:16,grado:'leve',name:'¿Se siente que es una persona inútil?',value:''},
    {id:17,grado:'riesgo',name:'¿Ha tenido la idea de acabar con su vida?',value:''},
    {id:18,grado:'leve',name:'¿Se siente cansado muy a menudo?',value:''},
    {id:19,grado:'leve',name:'¿Tiene sensaciones desagradables en su estómago?',value:''},
    {id:20,grado:'leve',name:'¿Se cansa con facilidad?',value:''},
    {id:21,grado:'riesgo',name:'¿Siente que alguien ha tratado de herirle de alguna forma? (Mediante el daño, brujería o que lo quieren matar)',value:''},
    {id:22,grado:'riesgo',name:'¿Es una persona, mucho más importante de lo que piensan los demás? (Ya sea por poderes especiales o por ser superior a los demás en inteligencia, dinero o clase social)',value:''},
    {id:23,grado:'riesgo',name:'¿Ha notado interferencias o algo raro en sus pensamientos? (Por ejemplo, que alguien domina, controla, lee o le roba sus pensamientos)',value:''},
    {id:24,grado:'riesgo',name:'¿Oye voces sin saber de dónde vienen, o que otras personas no pueden oírlas?',value:''},
    {id:25,grado:'riesgo',name:'¿Ha tenido convulsiones, ataques o caídas al suelo, con movimientos de brazos o piernas, con mordeduras?',value:''},
    {id:26,grado:'moderado',name:'¿Alguna vez le ha parecido a su familia, amigos, su médico o su sacerdote, que estaba bebiendo demasiado licor?',value:''},
    {id:27,grado:'riesgo',name:'¿Alguna vez ha querido dejar de beber pero no ha podido?',value:''},
    {id:28,grado:'riesgo',name:'¿Ha tenido alguna vez dificultades en el trabajo o estudio a causa de la bebida, como beber en el trabajo o lugar de estudio, o faltar a ellos?',value:''},
    {id:29,grado:'riesgo',name:'¿Ha estado en riñas o le han detenido estando borracho?',value:''},
    {id:30,grado:'moderado',name:'¿Le ha parecido alguna vez que ha bebido demasiado?',value:''},
    {id:31,grado:'riesgo',name:'¿Alguna vez ha sido maltratado(a) psicológicamente?',value:''},
    {id:32,grado:'riesgo',name:'¿Alguna vez ha sido maltratado(a) físicamente?',value:''},
    {id:33,grado:'riesgo',name:'¿Ha sido forzada a tener relaciones sexuales?',value:''},
    
      ]
      cargando=false;
      cargando2=false;


  /**Cancelar atencion */
  motivo='';
  detalle_motivo;
    
 

  
 
  
  constructor(private token:AuthService,private registerserv:RegistrarAtencionService , private serv:UserService) { }
  derivacion=false;
  ngOnInit() {
    this.datapaciente = new FormGroup({
      idpaciente:new FormControl(''),
      religion: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      ocupacion :new FormControl('',Validators.required),
      fecha_nacimiento: new FormControl('',  Validators.required),
      grado_educacion: new FormControl('',Validators.required),
      estado_civil: new FormControl('',Validators.required),
      nro_hijos: new FormControl(''),
      antecedentes:new FormControl('',Validators.required),
      problema_actual:new FormControl('',Validators.required)

      
    });
    this.datosatencion = new FormGroup({
      nro_sesion: new FormControl(''),
      acciones_realizadas: new FormControl('', Validators.required),
      conclusiones :new FormControl('', Validators.required),
      observaciones :new FormControl('', Validators.required),
      evidencia:new FormControl('', Validators.required),
      recomendaciones :new FormControl('', Validators.required),
    });
    this.get_pacientes_asignados();

  }
  /** Obtener info de los pacientes asignados xdd */
  get_pacientes_asignados(){
    this.cargando=true;
    this.registerserv.getlistpac(this.token.usuario.idpersonal).subscribe(
      data=>{
        this.cargando=false;
                this.pacientes_asignados=data
              }
    )
  }
  get_info_case(pac){
    this.asig_actual = pac;
    this.counter = this.asig_actual.nro_atenciones;
    console.log(this.counter)
    console.log(this.counter + 1)
    this.registerserv.get_paciente_info(pac.idpaciente).subscribe(
  data=>{
    this.paciente_info = data[0];
    console.log(data)

  }
    );
    this.get_Atenciones_registradas(pac.idasignacion);
   

  }
  get_Atenciones_registradas(id){
    this.registerserv.get_atenciones_registradas(id).subscribe(
      data=>{
this.atenciones_registradas = data;
      }
  )
  }


  /**Registrar Atenciones */

  registraratencion(){
    this.cargando2=true;
    if(this.counter == 0){
      this.datapaciente.get('idpaciente').setValue(this.asig_actual.idpaciente);
      this.datosatencion.get('nro_sesion').setValue(this.counter + 1);
      this.registerserv.registrardata1(this.datapaciente.value,this.datosatencion.value, this.asig_actual.idasignacion).subscribe(data=>{
        this.cargando2=false;
        this.cerrarmodal();
        this.reset();
        Swal.fire(
          'Registrado',
          data.toString(),
          'success'
  
        )
        this.counter = this.counter + 1;
        this.get_Atenciones_registradas( this.asig_actual.idasignacion);
     });
    
    }else if(this.counter > 0){
      this.datosatencion.get('nro_sesion').setValue(this.counter+1);
      this.registerserv.registrardata2(this.datosatencion.value, this.asig_actual.idasignacion).subscribe(data=>{
        console.log(data);
        this.cargando2=false;
     
        this.cerrarmodal();
        this.reset();
        Swal.fire(
          'Registrado',
          data.toString(),
          'success'
    
        )
        this.counter = this.counter + 1;
        this.get_Atenciones_registradas( this.asig_actual.idasignacion);
       
     });
    }else{
      console.log('Errorr gaaaaaaaa xdd')
    }  
  }





  //**Ver Respuestas */
  ver_respuestas(respuestas){
    var arreglo = respuestas.split(',');
    this.preguntas = this.preguntas.map((x,i)=>{
       x.value = arreglo[i];
       return x;
    })
    console.log(this.preguntas)
}


/** Ver atenciones registradas de los pacientes */
mostrar_asignacion_id(asig){
 this.aten_paciente = asig; 
}



      cerrarmodal(){
        document.getElementById('register_aten').click();
      }

      reset(){
        this.datapaciente.reset();
        this.datosatencion.reset();
       
      }

      cancelaratencion(){
        switch (this.motivo) {
          case 'Cancelado':
            this.serv.crearcancelacion(this.detalle_motivo,this.asig_actual.idasignacion).subscribe(
              data=>{
                document.getElementById('cancelaratencion').click();
                Swal.fire(
                  'Atencion Cancelada',
                  data.toString(),
                  'success'
                );
                this.get_pacientes_asignados();
                this.paciente_info ='';

              }
            )
            
            break;
          case 'Finalizado':
            this.serv.finalizar_atencion(this.asig_actual.idasignacion,this.detalle_motivo).subscribe(
              data=>{
                document.getElementById('cancelaratencion').click();
                Swal.fire(
                  'Atencion Cancelada',
                  data.toString(),
                  'success'
                )
                this.get_pacientes_asignados();
                this.paciente_info ='';

              }
            )
            
            break;        
          case 'Derivado':
            this.serv.derivar_atencion(this.asig_actual.idasignacion,this.detalle_motivo,this.asig_actual.idpaciente).subscribe(
              data=>{
                document.getElementById('cancelaratencion').click();
                Swal.fire(
                  'Atencion Derivada',
                  data.toString(),
                  'success'
                );
                this.get_pacientes_asignados();
                this.paciente_info ='';

              }
            )
            
            break;
          default:
            break;
        }
      }


}
