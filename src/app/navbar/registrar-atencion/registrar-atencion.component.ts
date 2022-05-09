import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { BandejaService } from 'src/app/services/bandeja.service';
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
  message;
  pacientes_asignados:any = [];
  asig_actual;
  atenciones_registradas;
  paciente_info;
  validate_url =/^https:\/*(?:\w+(?::\w+)?@)?[^\s\/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-\/]*)?$/;
  counter;
  datapaciente:FormGroup;
  datosatencion:FormGroup;
  
  textValue;
  aten_paciente;
  historial=[];
  /** Pregunta */
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
  
      cargando=false;
      cargando2=false;
      cargando3=false;


  /**Cancelar atencion */
  motivo='';
  detalle_motivo='';


    /**Ver historial */

    data_asignacion;
    list_atenciones =[];
    voluntario_asig;
 

    /** Derivar con pastor xdd */
    derivar_pastor=false;

  
 
  
  constructor(public token:AuthService,private registerserv:RegistrarAtencionService , private serv:UserService,public bandeja:BandejaService, private toast: NgToastService) { }
  derivacion=false;
  ngOnInit() {
    this.datapaciente = new FormGroup({
      idpaciente:new FormControl(''),
      religion: new FormControl('', Validators.required),
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
      evidencia:new FormControl('', [Validators.required,Validators.pattern(this.validate_url)]),
      recomendaciones :new FormControl('', Validators.required),
    });
    this.get_pacientes_asignados();

  }
  /** Obtener info de los pacientes asignados xdd */
  get_pacientes_asignados(){
    this.message='Cargando consultantes...'
    this.cargando=true;
    this.registerserv.getlistpac(this.token.usuario.idpersonal).subscribe(
      data=>{
        this.cargando=false;
                this.pacientes_asignados=data
              }
    )
  }
  get_paciente_info(id){
    this.message='Cargnado datos del consultante...'
    this.cargando3=true;
    this.registerserv.get_paciente_info(id).subscribe(
      data=>{
        this.cargando3=false;
        this.textValue = 'https://oidoamigo.netlify.app/#/home/valoracion/'+ data[0].codex;
        this.paciente_info = data[0];
        this.datapaciente.get('religion').setValue(data[0].religion);
        this.datapaciente.get('ocupacion').setValue(data[0].ocupacion);
        this.datapaciente.get('fecha_nacimiento').setValue(data[0].fecha_nacimiento);
        this.datapaciente.get('grado_educacion').setValue(data[0].grado_educacion);
        this.datapaciente.get('estado_civil').setValue(data[0].estado_civil);
        this.datapaciente.get('nro_hijos').setValue(data[0].nro_hijos);
        this.datapaciente.get('problema_actual').setValue(data[0].problema_actual);
        this.datapaciente.get('antecedentes').setValue(data[0].antecedentes);
      }
        );
  }
  get_info_case(pac){
    this.asig_actual = pac;
    this.counter = this.asig_actual.nro_atenciones;
    this.get_paciente_info(pac.idpaciente);
    this.ver_historial(pac.idpaciente);
   
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
   
    if(this.counter == 0){
      if(this.datosatencion.invalid || this.datapaciente.invalid){
        this.toast.error({detail:"ERROR",summary:'Porfavor verifique  los campos.',duration:3000}); 
      }else{
        this.message='Guardando datos de la atención...'
        this.cargando2=true;
        this.datapaciente.get('idpaciente').setValue(this.asig_actual.idpaciente);
        this.datosatencion.get('nro_sesion').setValue(this.counter + 1);
        this.registerserv.registrardata1(this.datapaciente.value,this.datosatencion.value, this.asig_actual.idasignacion).subscribe(data=>{
          this.cargando2=false;
          this.cerrarmodal();
          this.reset();
          Swal.fire({
            icon: 'success',
            title: 'Atencion registrada',
            text:  data.toString(),
           
          })
         
          this.counter = this.counter + 1;
          this.get_paciente_info(this.asig_actual.idpaciente);
          this.get_Atenciones_registradas( this.asig_actual.idasignacion);
       });
      } 
    }else if(this.counter > 0){
      if(this.datosatencion.invalid){
         this.toast.error({detail:"ERROR",summary:'Porfavor verifique  los campos.',duration:3000});
      }else{
        this.message='Guardando datos de la atención...'
        this.cargando2=true;
        this.datosatencion.get('nro_sesion').setValue(this.counter+1);
        this.registerserv.registrardata2(this.datosatencion.value, this.asig_actual.idasignacion).subscribe(data=>{
          this.cargando2=false;
       
          this.cerrarmodal();
          this.reset();
          Swal.fire({
            icon: 'success',
            title: 'Atencion registrada',
            text:  data.toString(),
           
          })
         
         
          this.counter = this.counter + 1;
          this.get_Atenciones_registradas( this.asig_actual.idasignacion);
         
       });
      }
    }
  }





  //**Ver Respuestas */
  ver_respuestas(respuestas){
    var arreglo = respuestas.split(',');
    this.preguntas = this.preguntas.map((x,i)=>{
       x.value = arreglo[i];
       return x;
    })
 
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
            this.message = 'Cancelando atención...'
            this.cargando2=true;
            this.serv.crearcancelacion(this.detalle_motivo,this.asig_actual.idasignacion).subscribe(
              data=>{
                this.cargando2=false;
                document.getElementById('cancelaratencion').click();
                Swal.fire({
                  icon: 'success',
                  title: 'Atencion dada de baja',
                  text:  data.toString(),
                 
                })
            
                this.get_pacientes_asignados();
                this.paciente_info ='';

              }
            )
            
            break;
          case 'Finalizado':
            this.message = 'Finalizando atención...'
            this.cargando2=true;
            this.serv.finalizar_atencion(this.asig_actual.idasignacion,this.detalle_motivo).subscribe(
              data=>{
                this.cargando2=false;
                document.getElementById('cancelaratencion').click();
                Swal.fire({
                  icon: 'success',
                  title: 'Atencion finalizada correctamente',
                  text:  data.toString(),
                 
                })
            
                this.get_pacientes_asignados();
                this.paciente_info ='';

              }
            )
            
            break;        
          case 'Derivacion-Psi':
             this.message = 'Derivando atención...'
             this.cargando2=true;
             var myid = uuidv4(); 
             var myid2 = new Date().getTime();
             var codex = myid + '-' + myid2.toString();
            this.serv.derivar_atencion(this.asig_actual.idasignacion,this.detalle_motivo,this.asig_actual.idpaciente,codex).subscribe(
              data=>{
                this.cargando2=false;
                document.getElementById('cancelaratencion').click();
                Swal.fire({
                  icon: 'success',
                  title: 'Atencion Derivada',
                  text:  data.toString(),
                 
                })
           
                this.get_pacientes_asignados();
                this.paciente_info ='';

              }
            )
            
            break;
            case 'Derivacion-Ext':
               this.message = 'Finalizando atención...'
               this.cargando2=true;
            
              this.serv.derivacion_ext(this.asig_actual.idasignacion,this.detalle_motivo).subscribe(
                data=>{
                  this.cargando2=false;
                  document.getElementById('cancelaratencion').click();
                  Swal.fire({
                    icon: 'success',
                    title: 'Atencio derivada correctamente',
                    text:  data.toString(),
                   
                  })
                  this.get_pacientes_asignados();
                  this.paciente_info ='';
  
                }
              )
              
              break;   
          default:
            break;
        }
      }



      //** Ver historial xdd */
      
      ver_historial(id){
        
        this.registerserv.get_historial(id).subscribe(
          data=>{
            
           this.historial = data; 
          }
        )
      }

      get_atenciones_historial(id){
        this.registerserv.get_atenciones_registradas(id).subscribe(
          data=>{
            this.list_atenciones = data;
          }
      )
      }
      get_vol_asignado(id){
        this.bandeja.get_personal_data(id).subscribe(
          data=>{
          this.voluntario_asig = data[0];
          }
        )

      }
      mostrar_info_asignacion(asig){
              this.data_asignacion = asig;
              this.get_vol_asignado(asig.idpersonal);
              this.get_atenciones_historial(asig.idasignacion);
              
        }
        
      
}