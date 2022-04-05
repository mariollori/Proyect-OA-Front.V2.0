import { Component, OnInit, QueryList, ViewChild, ViewChildren, } from '@angular/core';


import { Personal } from 'src/app/asignacion/pastor/pastor.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { ReporteService } from 'src/app/services/reporte.service';
import {  ActivatedRoute, Router } from '@angular/router';




export class Datagraph {
  data: number;
  label: String
}
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent implements OnInit {

 /**Buscar opcion-sede */
 opcion;
 personal;
 sede;
 
 /** GRAFICAS H-M */
  totalH=0;
  totalM=0;

 /**Grafica generales por fecha */
  fechai: Date;
  fechaf: Date;
  opcion2;
  sede2;
  finalizadas=0;
  enproceso=0;
  enespera=0;
  canceladas=0;
 


  dtOptions: any;
  @ViewChildren(BaseChartDirective) chart:QueryList<BaseChartDirective> ;
  constructor(private service: ReporteService,private router:Router,private route:ActivatedRoute) { }
     
   /**-------------------------Pie Chart -------------------- ------------------------------*/
   public pieChartOptions: ChartConfiguration['options'] = {
     responsive: true,
     plugins: {
       legend: {
         display: true,
         position: 'left',

       },
     }
   };
   public pieChartDataH: ChartData<'pie', number[], string | string[]> = {
     labels: [ 'Finalizados', 'En proceso' , 'Canceladas' ,'En espera'],
     datasets: [ 
       {data: [ 0, 0, 0,0 ],
       backgroundColor: ['rgba(76,175,80,1)', 'rgba(255,152,0,1)', '#29b2e2','#ebecf0'],
       hoverBackgroundColor: ['rgba(76,175,80,1)', 'rgba(255,152,0,1)', '#29b2e2','#ebecf0']
     } ]
   };
   public pieChartDataM: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'Finalizados', 'En proceso' , 'Canceladas' ,'En espera'],
    datasets: [ 
      {data: [ 0, 0, 0,0 ],
      backgroundColor: ['rgba(76,175,80,1)', 'rgba(255,152,0,1)', '#29b2e2','#ebecf0'],
      hoverBackgroundColor: ['rgba(76,175,80,1)', 'rgba(255,152,0,1)', '#29b2e2','#ebecf0']
    } ]
  };
   public pieChartType: ChartType = 'pie';

  

  ngOnInit() {
    /**Tabla de estudiantes */
    this.opcion2="estudiante";
    this.sede2='UPeU Lima';
    this.opcion = 'estudiante'
    this.sede= 'UPeU Lima'
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
      ordering: true,
      lengthChange: false,

      processing: true
    };
    this.get_personal_sede();

    /** GRAFICAS H - M */
    this.get_estadisticas_generoH();
    this.get_estadisticas_generoM();
    this.get_todos_por_opcion();
    
  }

  get_personal_sede(){
    this.personal=''
    this.service.getAsignaciones_sede(this.opcion,this.sede).subscribe( data => {
      console.log(data)
      this.personal = data })
  }

  get_estadisticas_generoH(){
  
    this.service.get_estadisticas_genero('H').subscribe(
      data=>{
        for (let index = 0; index < data.length; index++) {
          this.totalH = this.totalH + Number(data[index]['count']);
          switch (data[index].estado) {
            case 'Cancelado':
              this.pieChartDataH.datasets[0].data[2] = data[index]['count'];
              break;
            case 'En Proceso':
              this.pieChartDataH.datasets[0].data[1] = data[index]['count'];
              break;
            case 'Finalizado':
              this.pieChartDataH.datasets[0].data[0] = data[index]['count'];
              break;
            case 'En Espera':
            this.pieChartDataH.datasets[0].data[3] = data[index]['count'];
              break;
            default:
              break;
          }
        }
        const piechart = this.chart.filter((e, index) => index === 0);
        piechart[0].update();
      }
    )
  }

  
  get_estadisticas_generoM(){
  

    this.service.get_estadisticas_genero('M').subscribe(
      data=>{
        for (let index = 0; index < data.length; index++) {
          this.totalM = this.totalM +  Number(data[index]['count']);
          switch (data[index].estado) {
            case 'Cancelado':
              this.pieChartDataM.datasets[0].data[2] = data[index]['count'];
              break;
            case 'En Proceso':
              this.pieChartDataM.datasets[0].data[1] = data[index]['count'];
              break;
            case 'Finalizado':
              this.pieChartDataM.datasets[0].data[0] = data[index]['count'];
              break;
            case 'En Espera':
            this.pieChartDataM.datasets[0].data[3] = data[index]['count'];
              break;
            default:
              break;
          }
        }
        const piechart = this.chart.filter((e, index) => index === 1);
        piechart[0].update();
      }
    )
  }




  buscar() {
    this.get_todos_por_opcion();
  }

  



  get_todos_por_opcion() {
    this.finalizadas=0;
    this.enproceso=0;
    this.enespera=0;
    this.canceladas=0;
    this.service.getestadisticatotal(this.opcion2,this.sede2).subscribe(
      data => {
        console.log(data)
        for (let index = 0; index < data.length; index++) {
          switch (data[index].estado) {
            case 'Cancelado':
               this.canceladas=data[index]['count']
              break;
            case 'En Proceso':
              this.enproceso=data[index]['count']
              break;
              case 'En Espera':
                this.enespera=data[index]['count']
                break;
            case 'Finalizado':
              this.finalizadas=data[index]['count']
              break;
            default:
              break;
          }
        }
    
      }
    )
  }


  get_todos_por_opcion_fecha() {
    this.finalizadas=0;
    this.enproceso=0;
    this.enespera=0;
    this.canceladas=0;
   
    this.service.getestadisticatotal_fecha(this.opcion2,this.sede2, this.fechai, this.fechaf).subscribe(
      data => {
        console.log(data);
        for (let index = 0; index < data.length; index++) {
          switch (data[index].estado) {
            case 'Cancelado':
              this.canceladas=data[index]['count']
             break;
           case 'En Proceso':
             this.enproceso=data[index]['count']
             break;
             case 'En Espera':
               this.enespera=data[index]['count']
               break;
           case 'Finalizado':
             this.finalizadas=data[index]['count']
             break;
           default:
             break;
          }
        }
      
      }
    )
  }



  reporte_personal(id){
    this.router.navigate(['nav/report/',this.opcion, id]);
  }
}
