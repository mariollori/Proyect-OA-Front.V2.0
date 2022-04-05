import { Component, OnInit } from '@angular/core';
import { BandejaService } from 'src/app/services/bandeja.service';
import { ReporteService } from 'src/app/services/reporte.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bandeja-in',
  templateUrl: './bandeja-in.component.html',
  styleUrls: ['./bandeja-in.component.css']
})
export class BandejaInComponent implements OnInit {
  opcion;
  personal_selected;
  asig_actual;
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
      dtOptions;
      
  constructor(private service:BandejaService,private service2:ReporteService) { }
  personal_searched;
  asignaciones;
  personal;
  paciente;
  ngOnInit(): void {
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
    this.service.get_asignaciones_pendientes().subscribe(
      data=>{
        this.asignaciones = data;
  
      }
    )
  }
  
  ver_expediente(asig){
    this.asig_actual = asig;
     this.service.get_paciente_data(asig.idpaciente).subscribe(
       data=>{
         this.paciente = data[0];
         console.log(this.paciente)
       }
     )
     this.service.get_personal_data(asig.idpersonal).subscribe(
      data=>{
         this.personal = data[0];
         console.log(this.personal)
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
      console.log(this.preguntas)
  }


  confirmar_asignacion(){
    console.log(this.personal.idpersonal,this.asig_actual.idasignacion);
    this.service.update_asignacion(this.personal.idpersonal,this.asig_actual.idasignacion).subscribe(
      data=>{
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
  reset(){
    this.asig_actual = null;
    this.personal = null;
    this.paciente=  null;
  }

  buscar_por_opcion(){
       switch(this.opcion){
         case 'Interno':
          this.service2.getAsignaciones('estudiante').subscribe( data => {this.personal_searched = data})
            break;
          case 'Psicologo':
            this.service2.getAsignaciones('psicologo').subscribe( data => {this.personal_searched = data})
            break;
            default:
              break;
       }
  }
  select_new_personal(persona){
    this.personal_selected = persona;
  }
  confirm_new_personal(){
    this.personal  = this.personal_selected;
    this.service.get_personal_data(this.personal.idpersonal).subscribe(
      data=>{
         this.personal = data[0];
         console.log(this.personal)
      }
    )
  }
}
