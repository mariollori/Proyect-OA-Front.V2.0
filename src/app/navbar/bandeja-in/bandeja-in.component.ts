import { Component, OnInit } from '@angular/core';
import { BandejaService } from 'src/app/services/bandeja.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bandeja-in',
  templateUrl: './bandeja-in.component.html',
  styleUrls: ['./bandeja-in.component.css']
})
export class BandejaInComponent implements OnInit {
  opcion;
  categoria;
  message;
  sede;
  personal_selected;
  asig_actual;
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
  
      dtOptions;
      sede2;
      
  constructor(private service:BandejaService,private service2:ReporteService) { }
  personal_searched;
  asignaciones;
  fecha_actual;
  personal;
  paciente;
  cargando=false;
  cargando2=false;
  cargando3=false;
  ngOnInit(): void {
    this.categoria='Todas'
    this.sede = 'UPeU Lima'
  
    this.get_Asignaciones_pendientes();
    this.dtOptions = {
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        "decimal": "",
        "emptyTable": "No hay ningun registro existente..",
        "info": "",
        "infoEmpty": "",
        "infoFiltered": "(Coincidencias de _MAX_  entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Show _MENU_ entries",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": ` Buscar :`,
        "zeroRecords": "Ningun resultado encontrado",
        "paginate": {
          "first": "<i class='fas fa-step-backward'></i>",
          "last": "<i class='fas fa-step-forward'></i>",
          "next": "<i class='fas fa-chevron-right'></i>",
          "previous": "<i class='fas fa-chevron-left'></i>"
        },
        "aria": {
          "sortAscending": ": activate to sort column ascending",
          "sortDescending": ": activate to sort column descending"
        }
      },
      ordering: false,
      lengthChange: false,

      processing: true
    };
 

  }
  get_Asignaciones_pendientes(){
    this.message="Cargando datos..."
    this.cargando = true;
    this.service.get_asignaciones_pendientes(this.sede).subscribe(
      data=>{
        this.asignaciones = data;
        this.cargando = false
  
      }
    )
  }
  
  ver_expediente(asig){
    this.cargando2 = true;
   
    this.asig_actual = asig;
    this.message = 'Cargando datos...'

     this.service.get_paciente_data(asig.idpaciente).subscribe(
       data=>{
         this.paciente = data[0];
        
       }
     )
     this.service.get_personal_data(asig.idpersonal).subscribe(
      data=>{
         this.personal = data[0];
         this.cargando2 = false;
        
      }
    )
  }

  getColor(color){
    switch (color) {
      case 'Leve':
        return 'green';
      case 'Moderado':
        return '#e8a70e';
      case 'Riesgo':
        return 'red';
    }

  }
  ver_respuestas(respuestas){
      var arreglo = respuestas.split(',');
      this.preguntas = this.preguntas.map((x,i)=>{
         x.value = arreglo[i];
         return x;
      })
  
  }


  confirmar_asignacion(){
    Swal.fire({
      title: '¿Confirmar asignación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, asignar paciente.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.message ='Confirmando asignación...'
    this.cargando2= true;
    var myid = uuidv4(); 
    var myid2 = new Date().getTime();
    var codex = myid + '-' + myid2.toString();
    this.service.update_asignacion(this.personal.idpersonal,this.asig_actual.idasignacion,codex).subscribe(
      data=>{
        this.cargando2= false;
        Swal.fire(
          'Registrado',
           data.toString(),
          'success'

        )
        this.reset()
        this.get_Asignaciones_pendientes();
      }
    )
      }
    })
   

    
  }
  reset(){
    this.asig_actual = null;
    this.personal = null;
    this.paciente=  null;
  }

  buscar_por_opcion(){
    this.personal_searched=null;
    this.personal_selected = null;
   
    this.cargando3=true;
       switch(this.opcion){
         case 'Interno':
          this.service2.get_personal_menor_4('estudiante',this.sede2).subscribe( data => {
            this.cargando3=false;
            this.personal_searched = data})
            break;
          case 'Psicologo':
            this.service2.get_personal_menor_4('psicologo',this.sede2).subscribe( data => {  this.cargando3=false;this.personal_searched = data})
            break;
            default:
              break;
       }
  }
  select_new_personal(persona){
    this.personal_selected = persona;
  }
  cancel_Search(){
    this.personal_searched=null;
    this.personal_selected = null;
  }
  confirm_new_personal(){
    this.personal  = this.personal_selected;
    
    this.service.get_personal_data(this.personal.idpersonal).subscribe(
      data=>{
         
         this.personal = data[0];
         Swal.fire({
          icon: 'success',
          title: 'Cambio aceptado',
          text: 'Se modifico el voluntario , ahora puede confirmar la asignacion.',
          
        })
        this.personal_searched=null;
        this.personal_selected = null;
      
       
      }
    )
  }


}
