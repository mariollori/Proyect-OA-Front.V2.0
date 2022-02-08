import { Component,  OnInit, ViewChild,  } from '@angular/core';


import { Personal } from 'src/app/asignacion/pastor/pastor.component';
import { ChartDataSets, ChartOptions, ChartType,  } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ReporteService } from 'src/app/services/reporte.service';
import { max } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
export class Datagraph{
  data:number;
  label:String
}
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent implements OnInit {
  dataSource;
  idactual;
  fechai;
fechaf;
  opcion;
nombrecompleto;
  atend = 0;
  asignados = 0;
  cancelado = 0;
  personal;
  
  displayedColumns: string[] = ['nro', 'nombre', 'especialidad', 'universidad', 'telefono', 'detalle'];
  dtOptions: any;
  constructor(private service: ReporteService) { }
  @ViewChild( MatPaginator ,{ static: true }) paginator: MatPaginator;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(BaseChartDirective,{static:true}) chart: BaseChartDirective;
  ngOnInit() {
    this.dtOptions = {
      responsive:true,
      pagingType: 'full_numbers',
      pageLength: 6,
      language:{
        "decimal":        "",
        "emptyTable":     "No hay ningun registro existente..",
        "info":           "",
        "infoEmpty":      "",
        "infoFiltered":   "(Coincidencias de _MAX_  entradas)",
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "Show _MENU_ entries",
        "loadingRecords": "Cargando...",
        "processing":     "Procesando...",
        "search":         "Buscar usuario:",
        "zeroRecords":    "Ningun resultado encontrado",
        "paginate": {
            "first":      "<i class='fas fa-step-backward'></i>",
            "last":       "<i class='fas fa-step-forward'></i>",
            "next":       "<i class='fas fa-chevron-right'></i>",
            "previous":   "<i class='fas fa-chevron-left'></i>"
        },
        "aria": {
            "sortAscending":  ": activate to sort column ascending",
            "sortDescending": ": activate to sort column descending"
        }
    },
      ordering:false,
      lengthChange:false,
      
      processing: false
    };
    this.opcion = 'estudiante'
    this.service.getAsignaciones('estudiante').subscribe(
      data => {
        this.personal = data as Personal[];
        
      }
    )
  }
  
  public barChartOptions: any = {
    responsive: true,
    scales : {
  
      yAxes: [{
         ticks: {
       
          beginAtZero: true,
          stepSize: 10,
          max:70,
        stepValue:1,
          }
      }]
    }
  };
  public barChartLabels: Label[] = ['Atenciones Registradas'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [

  ];

  public barChartData: any[] = [
    { data: [0], label: 'Finalizadas',backgroundColor:'#039be5' },
    { data:[0] , label: 'En Proceso' ,backgroundColor:'#039be5'},
    { data:[0], label: 'Canceladas' ,backgroundColor:'#ef524f'}
  ];

  public chartColors: any[] = [
    {
      backgroundColor: ["#4ea579", "#039be5", "red"]
    }];
  // events
 
  mostrar(id,nombre,apellido) {
    this.fechaf='';
    this.fechai='';
    this.idactual=id;
  this.nombrecompleto = nombre + ' ' + apellido;
  this.barChartData[0].data[0]=0;   
  this.barChartData[1].data[0]=0;  
  this.barChartData[2].data[0]=0;  
   this.listarregistros(id);
  }

  
  buscar() {
    this.personal = 0;
    this.service.getAsignaciones(this.opcion).subscribe(
      data => {
        this.personal = data as Personal[];
       
      }
    )
  }
  allregisters(){
    this.fechaf='';
    this.fechai='';
    this.barChartData[0].data[0]=0;   
    this.barChartData[1].data[0]=0;  
    this.barChartData[2].data[0]=0;  
    this.listarregistros(this.idactual)
  }

  buscarfecha(){
    this.barChartData[0].data[0]=0;   
    this.barChartData[1].data[0]=0;  
    this.barChartData[2].data[0]=0;  
    this.service.getestadistica_fecha(this.idactual,this.fechai,this.fechaf).subscribe(
      data=>{
        console.log(data)
        for (let index = 0; index < data.length; index++) {
          
          if (data[index].estado=='Cancelado') {
            this.cancelado=data[index]['count'];
            this.barChartData[2].data[0]=data[index]['count'];
          }else if (data[index].estado == 'En Proceso') {
            this.asignados=data[index]['count'];
            this.barChartData[1].data[0]=data[index]['count'];
          }else if (data[index].estado=='Finalizado') {
            this.atend=data[index]['count'];
            this.barChartData[0].data[0]=data[index]['count'];
          }
        }
        this.barChartData = this.barChartData.slice()
      
      }
    )
  }
  listarregistros(id){
    this.service.getestadistica(id).subscribe(
      
      data => {
        console.log(data)
        for (let index = 0; index < data.length; index++) {
          
          if (data[index].estado=='Cancelado') {
            this.cancelado=data[index]['count'];
            this.barChartData[2].data[0]=data[index]['count'];
          }else if (data[index].estado == 'En Proceso') {
            this.asignados=data[index]['count'];
            this.barChartData[1].data[0]=data[index]['count'];
          }else if (data[index].estado=='Finalizado') {
            this.atend=data[index]['count'];
            this.barChartData[0].data[0]=data[index]['count'];
          }
        }
        this.barChartData = this.barChartData.slice()
      }
    )
  }
  cargartodas(){
    this.fechaf='';
    this.fechai='';
    this.barChartData[0].data[0]=0;   
    this.barChartData[1].data[0]=0;  
    this.barChartData[2].data[0]=0;  
    this.service.getestadisticatotal(this.opcion).subscribe(
      data=>{
        console.log(data)
        for (let index = 0; index < data.length; index++) {
          
          if (data[index].estado=='Cancelado') {
            this.cancelado=data[index]['count'];
            this.barChartData[2].data[0]=data[index]['count'];  
          }else if (data[index].estado == 'En Proceso') {
        
            this.asignados=data[index]['count'];
            this.barChartData[1].data[0]=data[index]['count'];
            console.log( this.barChartData[1].data)
          }else if (data[index].estado=='Finalizado') {
            this.atend=data[index]['count'];
            this.barChartData[0].data[0]=data[index]['count'];
          }
        }
        this.barChartData = this.barChartData.slice()
     
      }
    )

  }
  
  buscarfechasdetodos(){
    this.fechaf='';
    this.fechai='';
    this.barChartData[0].data[0]=0;   
    this.barChartData[1].data[0]=0;  
    this.barChartData[2].data[0]=0;  
    this.service.getestadisticatotal_fecha(this.opcion,this.fechai,this.fechaf).subscribe(
      data=>{
        console.log(data)
        for (let index = 0; index < data.length; index++) {
          
          if (data[index].estado=='Cancelado') {
            this.cancelado=data[index]['count'];
            this.barChartData[2].data[0]=data[index]['count'];
          }else if (data[index].estado == 'En Proceso') {
            this.asignados=data[index]['count'];
            this.barChartData[1].data[0]=data[index]['count'];
          }else if (data[index].estado=='Finalizado') {
            this.atend=data[index]['count'];
            this.barChartData[0].data[0]=data[index]['count'];
          }
        }
        this.barChartData = this.barChartData.slice();

      
      }
    )
  }



}
