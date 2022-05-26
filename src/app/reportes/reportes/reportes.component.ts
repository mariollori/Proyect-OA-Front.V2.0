import { Component, OnInit, QueryList, ViewChild, ViewChildren, } from '@angular/core';



import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { ReporteService } from 'src/app/services/reporte.service';
import { ActivatedRoute, Router } from '@angular/router';




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
  reingresos=0;

  /** GRAFICAS H-M */
  totalH = 0;
  totalM = 0;

  /**Grafica generales por fecha */
  fechai: Date;
  fechaf: Date;
  opcion2;
  sede2;
  finalizadas = 0;
  enproceso = 0;
  derivacionpsi =0 ;
  derivacionext=0;
  canceladas = 0;

 /**Comentarios xd */
  /**Putaje total */
  total;
  comentarios=[];
  numero_votantes;
  /**Puntaje individual */
  puntaje5='0%';
  puntaje4='0%';
  puntaje3='0%';
  puntaje2 ='0%';
  puntaje1='0%';
  
  dtOptions: any;
  @ViewChildren(BaseChartDirective) chart: QueryList<BaseChartDirective>;
  constructor(private service: ReporteService, private router: Router, private route: ActivatedRoute) { }
  public doughnutChartLabels: string[] =['Atendidos', 'En proceso', 'Canceladas', 'Derivacion-Psi', 'Derivacion-Ext'];
  public chartOptions= {
    cutout:90,
    plugins: {
      legend: {display: false,position: 'right',},
    }
  };
  /**Donut */
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [0, 0, 0, 0, 0] ,backgroundColor: ['#1e88e5', '#26c6da', '#ef5350', '#eceff1', '#745af2'],hoverBackgroundColor: ['#1e88e5', '#26c6da', '#ef5350', '#eceff1', '#745af2']},
    ]
  };
  
  /**Donut 2 */
  public doughnutChartData2: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [0, 0, 0, 0, 0] ,backgroundColor: ['#1e88e5', '#26c6da', '#ef5350', '#eceff1', '#745af2'],hoverBackgroundColor: ['#1e88e5', '#26c6da', '#ef5350', '#eceff1', '#745af2']},
    ]
  };
 
  



  ngOnInit() {
    /**Tabla de estudiantes */
    this.opcion2 = "estudiante";
    this.sede2 = 'UPeU Lima';
    this.opcion = 'estudiante'
    this.sede = 'UPeU Lima'
    this.dtOptions = {
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 22,
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
    this.get_comentarios();
    this.get_puntaje();
    this.get_puntaje_total();
    this.get_reingresos();
    

  }

  get_personal_sede() {
    this.personal = ''
    this.service.getAsignaciones_sede(this.opcion, this.sede).subscribe(data => {
      
      this.personal = data
    })
  }
get_reingresos(){
  this.service.get_reingresos().subscribe(
    data=>{
      this.reingresos = data[0].count
    }
  )
}
  get_estadisticas_generoH() {

    this.service.get_estadisticas_genero('H').subscribe(
      data => {
        
        for (let index = 0; index < data.length; index++) {
          this.totalH = this.totalH + Number(data[index]['count']);
          switch (data[index].estado) {
            case 'Cancelado':
              this.doughnutChartData.datasets[0].data[2] = data[index]['count'];
              break;
            case 'En Proceso':
              this.doughnutChartData.datasets[0].data[1] = data[index]['count'];
              break;
            case 'Finalizado':
              this.doughnutChartData.datasets[0].data[0] = data[index]['count'];
              break;
            case 'Derivacion-Psi':
              this.doughnutChartData.datasets[0].data[3] = data[index]['count'];

              break;
            case 'Derivacion-Ext':
              this.doughnutChartData.datasets[0].data[4] = data[index]['count'];

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


  get_estadisticas_generoM() {


    this.service.get_estadisticas_genero('M').subscribe(
      data => {
        for (let index = 0; index < data.length; index++) {
          this.totalM = this.totalM + Number(data[index]['count']);
          switch (data[index].estado) {
            case 'Cancelado':
              this.doughnutChartData2.datasets[0].data[2] = data[index]['count'];
              break;
            case 'En Proceso':
              this.doughnutChartData2.datasets[0].data[1] = data[index]['count'];
              break;
            case 'Finalizado':
              this.doughnutChartData2.datasets[0].data[0] = data[index]['count'];
              break;
            case 'Derivacion-Psi':
              this.doughnutChartData2.datasets[0].data[3] = data[index]['count'];
              break;
            case 'Derivacion-Ext':
              this.doughnutChartData2.datasets[0].data[4] = data[index]['count'];

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
    this.finalizadas = 0;
    this.enproceso = 0;
    this.derivacionpsi = 0;
    this.derivacionext = 0;
    this.canceladas = 0;
    this.service.getestadisticatotal(this.opcion2, this.sede2).subscribe(
      data => {
        
        for (let index = 0; index < data.length; index++) {
          switch (data[index].estado) {
            case 'Cancelado':
              this.canceladas = data[index]['count']
              break;
            case 'En Proceso':
              this.enproceso = data[index]['count']
              break;
            case 'Derivacion-Psi':
              this.derivacionpsi = data[index]['count'];
              break;
            case 'Derivacion-Ext':
              this.derivacionext = data[index]['count'];
              break;
            case 'Finalizado':
              this.finalizadas = data[index]['count']
              break;
            default:
              break;
          }
        }

      }
    )
  }


  get_todos_por_opcion_fecha() {
    this.finalizadas = 0;
    this.enproceso = 0;
    this.derivacionpsi = 0;
    this.derivacionext = 0;
    this.canceladas = 0;

    this.service.getestadisticatotal_fecha(this.opcion2, this.sede2, this.fechai, this.fechaf).subscribe(
      data => {
        
        for (let index = 0; index < data.length; index++) {
          switch (data[index].estado) {
            case 'Cancelado':
              this.canceladas = data[index]['count']
              break;
            case 'En Proceso':
              this.enproceso = data[index]['count']
              break;
              case 'Derivacion-Psi':
              this.derivacionpsi = data[index]['count'];
              break;
            case 'Derivacion-Ext':
              this.derivacionext = data[index]['count'];
              break;
            case 'Finalizado':
              this.finalizadas = data[index]['count']
              break;
            default:
              break;
          }
        }

      }
    )
  }



  reporte_personal(id) {
    this.router.navigate(['nav/report/', this.opcion, id]);
  }

  get_comentarios(){
    this.service.get_comentarios_totales().subscribe(
      data => {
        this.comentarios = data;
      })
  }
  get_puntaje_total(){
    this.service.get_puntaje_total_totales().subscribe(
      data=>{
       this.numero_votantes = data[0].count;
       this.total = data[0].round;

      }
    )
  }
  get_puntaje(){
    this.service.get_puntaje_totales().subscribe(
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
       
      }
    )
  }
}
