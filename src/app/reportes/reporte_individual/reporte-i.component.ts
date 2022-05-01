import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { data } from 'jquery';
import { BaseChartDirective } from 'ng2-charts';
import { AuthService } from 'src/app/services/auth.service';
import { RegDatoPsicologoService } from 'src/app/services/reg-dato-psicologo.service';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reporte-i',
  templateUrl: './reporte-i.component.html',
  styleUrls: ['./reporte-i.component.css']
})
export class ReporteIComponent implements OnInit {


  /**Putaje total */
total;
numero_votantes;
/**Puntaje individual */
puntaje5='0%';
puntaje4='0%';
puntaje3='0%';
puntaje2 ='0%';
puntaje1='0%';



  idactual;
  tipo;
  puntaje=4;
  estado_asig;
  deriv='';
  persona;
  dtOptions: any;
  constructor(private service: ReporteService,private router:Router,private route:ActivatedRoute,private imgserv : RegDatoPsicologoService) { }
  fechai: Date;
  fechaf: Date;
  pacientes;
comentarios=[];
  atenciones_registradas=[];
  public barChartData: ChartData<'bar'>;
  paciente_Actual;
  
   @ViewChildren(BaseChartDirective) chart:QueryList<BaseChartDirective> ;
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
  
  ngOnInit(): void {
    this.estado_asig = 'Finalizado'
      this.idactual = this.route.snapshot.paramMap.get('id');
      this.tipo = this.route.snapshot.paramMap.get('tipo');
      if(this.tipo=='psicologo'){
        this.deriv = 'Derivacion-Ext'
      }else{
        this.deriv = 'Derivacion-Psi'
      }
      this.barChartData= {
        labels: ['Periodo Total'],
        datasets: [
          
          { data: [0], label: 'Finalizadas', backgroundColor: '#0f3971', hoverBackgroundColor: '#0f3971', },
          { data: [0], label: 'En Proceso', backgroundColor: '#f9a601', hoverBackgroundColor: '#f9a601' },
          { data: [0], label: 'Canceladas', backgroundColor: 'red', hoverBackgroundColor: 'red' },
            { data: [0], label: this.deriv, backgroundColor: '#00acc1', hoverBackgroundColor: '#00acc1' }
        ]
      };
      this.get_info_personal();
      this.get_todos_por_id();
      this.get_Comentarios(this.idactual);
      this.get_puntaje_total(this.idactual);
      this.get_puntaje(this.idactual);
      this.get_pacientes_finalizados();
  }

   
  get_info_personal(){
    var cont_img = document.getElementById('perfil');
    cont_img.setAttribute('src', 'assets/load.gif');
    this.service.get_info_personal(this.idactual,this.tipo).subscribe(
      data=>{
        this.persona=data[0];
        if(data[0].foto == null){
          cont_img.setAttribute('src','assets/no_photo.jpg')

        }else{
          this.imgserv.mostrarimagenfirebase(data[0].foto).subscribe(
            data2=>{
           
              cont_img.setAttribute('src',data2);
            }
          )
          
        }
      },(e)=>{
        cont_img.setAttribute('src','assets/no_photo.jpg')
      }
        
    )

  }
  ver_respuestas(respuestas){
    var arreglo = respuestas.split(',');
    this.preguntas = this.preguntas.map((x,i)=>{
       x.value = arreglo[i];
       return x;
    })
  }
 
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      
      x: {},
      y: {
        min: 0,
        max: 10,
        ticks:{
          precision:0
        }  
        
       
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  //** Tipo de grafico */
  public barChartType: ChartType = 'bar';

  /** Legenda del grafico */
  public barChartLegend = true;

  //** Datos de la grafica */
 
 get_pacientes_finalizados(){
   this.service.get_pacientes_finalizados(this.idactual,this.estado_asig).subscribe(
     data=>{
       this.pacientes=data;
     }
   )
 }
  get_todos_por_id_fecha() {
    this.barChartData.datasets[0].data =[0];
    this.barChartData.datasets[2].data = [0];
    this.barChartData.datasets[1].data =[0] ;
    this.barChartData.datasets[3].data = [0];
    this.service.getestadistica_fecha(this.idactual, this.fechai, this.fechaf).subscribe(
      data => {
        
        for (let index = 0; index < data.length; index++) {
          
          switch (data[index].estado) {
            case 'Cancelado':
               this.barChartData.datasets[2].data  = [data[index]['count']]
              break;
            case 'En Proceso':
               this.barChartData.datasets[1].data  = [data[index]['count']]
              break;
              case this.deriv:
              this.barChartData.datasets[3].data = [data[index]['count']];
              break;
            case 'Finalizado':
               this.barChartData.datasets[0].data= [data[index]['count']]
              break;
            default:
              break;
          }
        }
        this.chart.first.update()

      }
    )
  }
  get_todos_por_id() {
    this.fechaf = null;
    this.fechai = null;
    this.barChartData.datasets[0].data =[0];
    this.barChartData.datasets[2].data = [0];
    this.barChartData.datasets[1].data =[0] ;
    this.barChartData.datasets[3].data = [0];
    this.service.getestadistica(this.idactual).subscribe(
      data => {
        
        for (let index = 0; index < data.length; index++) {
          switch (data[index].estado) {
            case 'Cancelado':
               this.barChartData.datasets[2].data  = [data[index]['count']]
              break;
            case 'En Proceso':
               this.barChartData.datasets[1].data  = [data[index]['count']]
              break;
              case this.deriv:
              this.barChartData.datasets[3].data  = [data[index]['count']];
              break;
            case 'Finalizado':
               this.barChartData.datasets[0].data  =[ data[index]['count']]
              break;
            default:
              break;
          }
        }
      this.chart.first.update();
      }
    )
  }
  back(){
    this.router.navigate(['nav/reportes/']);
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
  get_atenciones_id(pac){
    this.paciente_Actual = pac;
    this.service.get_atenciones_by_id(pac.idasignacion).subscribe(
      data=>{
       this.atenciones_registradas = data;
      }
    )
  }
  get_Comentarios(id){
    this.service.get_comentarios_by_id(id).subscribe(
      data=>{
this.comentarios=data;

      }
    )
  }
  get_puntaje_total(id){
    this.service.get_puntaje_total_by_id(id).subscribe(
      data=>{
       this.numero_votantes = data[0].count;
       this.total = data[0].round;

      }
    )
  }
  get_puntaje(id){
    this.service.get_puntaje_by_id(id).subscribe(
      data=>{
        for (let index = 0; index < data.length; index++) {
          switch (data[index].puntaje) {
            case '5': this.puntaje5 = ((data[index].count * 100 )/ data.length)+ '%';
              break;
              case '4': this.puntaje4 = ((data[index].count * 100 )/ data.length)+ '%';
              break;
              case '3': this.puntaje3 =  ((data[index].count * 100 )/ data.length)+ '%';
              break;
              case '2': this.puntaje2 =  ((data[index].count * 100 )/ data.length)+ '%';
              break;
              case '1': this.puntaje1 = ((data[index].count * 100 )/ data.length)+ '%';
              break;
          }
        }
        console.log(this.puntaje1,this.puntaje2,this.puntaje3,this.puntaje4,this.puntaje5);
          
      }
    )
  }

}
