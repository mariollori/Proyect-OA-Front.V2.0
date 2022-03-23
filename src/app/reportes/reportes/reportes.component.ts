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


  fechai: Date;
  fechaf: Date;
  opcion;
  nombrecompleto;
  personal;


  dtOptions: any;
  constructor(private service: ReporteService,private router:Router,private route:ActivatedRoute) { }
    

   @ViewChildren(BaseChartDirective) chart:QueryList<BaseChartDirective> ;

 


  ngOnInit() {
    this.opcion = 'estudiante'
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
 
    this.service.getAsignaciones(this.opcion).subscribe( data => {this.personal = data as Personal[];})
    this.get_todos_por_opcion();
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      
      x: {},
      y: {
        min: 0,
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
  public barChartData2: ChartData<'bar'> = {
    labels: ['Periodo Total'],
    datasets: [
      { data: [0], label: 'Finalizadas', backgroundColor: '#13c298', hoverBackgroundColor: '#13c298', },
      { data: [0], label: 'En Proceso', backgroundColor: '#fce0a2', hoverBackgroundColor: '#fce0a2' },
      { data: [0], label: 'Canceladas', backgroundColor: 'red', hoverBackgroundColor: 'red' }
    ]
  };



  buscar() {
    
    this.personal = null;
    this.service.getAsignaciones(this.opcion).subscribe(
      data => {
        
        this.personal = data as Personal[];

      }
    )
    this.get_todos_por_opcion();
  }

  



  get_todos_por_opcion() {
    this.fechaf = null;
    this.fechai = null;
    this.barChartData2.datasets[0].data = [0];
    this.barChartData2.datasets[2].data = [0];
    this.barChartData2.datasets[1].data = [0];
    this.service.getestadisticatotal(this.opcion).subscribe(
      data => {
        console.log(data)
        for (let index = 0; index < data.length; index++) {
          switch (data[index].estado) {
            case 'Cancelado':
              this.barChartData2.datasets[2].data = [data[index]['count']];
              break;
            case 'En Proceso':
              this.barChartData2.datasets[1].data = [data[index]['count']];
              break;
            case 'Finalizado':
              this.barChartData2.datasets[0].data = [data[index]['count']];
              break;
            default:
              break;
          }
        }
        console.log(this.chart)
        this.chart.first.update();
      }
    )
  }


  get_todos_por_opcion_fecha() {
    this.barChartData2.datasets[0].data = [0];
    this.barChartData2.datasets[2].data = [0];
    this.barChartData2.datasets[1].data = [0];
    this.service.getestadisticatotal_fecha(this.opcion, this.fechai, this.fechaf).subscribe(
      data => {
        console.log(data);
        console.log(this.fechai)
        for (let index = 0; index < data.length; index++) {
          switch (data[index].estado) {
            case 'Cancelado':
              this.barChartData2.datasets[2].data = [data[index]['count']];
              break;
            case 'En Proceso':
              this.barChartData2.datasets[1].data = [data[index]['count']];
              break;
            case 'Finalizado':
              this.barChartData2.datasets[0].data = [data[index]['count']];
              break;
            default:
              break;
          }
        }
        this.chart.first.update();
      }
    )
  }



  reporte_personal(id){
    this.router.navigate(['nav/report/',this.opcion, id]);
  }
}
