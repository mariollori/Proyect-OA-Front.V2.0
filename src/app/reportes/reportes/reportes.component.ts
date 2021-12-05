import { Component,  OnInit, ViewChild,  } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Personal } from 'src/app/asignacion/pastor/pastor.component';
import { ChartDataSets, ChartOptions, ChartType,  } from 'chart.js';
import { Label } from 'ng2-charts';
import { ReporteService } from 'src/app/services/reporte.service';
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
  personal: Personal[] = [];
  displayedColumns: string[] = ['nro', 'nombre', 'especialidad', 'universidad', 'telefono', 'detalle'];
  constructor(private service: ReporteService) { }
  @ViewChild( MatPaginator ,{ static: true }) paginator: MatPaginator;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.opcion = 'estudiante'
    this.service.getAsignaciones('estudiante').subscribe(
      data => {
        this.personal = data as Personal[];
        this.dataSource = new MatTableDataSource(this.personal);
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  
  public barChartOptions: any = {
    responsive: true,
    scales : {
      yAxes: [{
         ticks: {
            steps : 10,
            stepValue : 10,
            max : 100,
            min: 0
          }
      }]
    }
  };
  public barChartLabels: Label[] = ['Atenciones Registradas'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: any[] = [
    { data: 0, label: 'Finalizadas',backgroundColor:'#039be5' },
    { data:0 , label: 'En Proceso' ,backgroundColor:'#039be5'},
    { data:0, label: 'Canceladas' ,backgroundColor:'#ef524f'}
  ];

  public chartColors: any[] = [
    {
      backgroundColor: ["#4ea579", "#039be5", "red"]
    }];
  // events
  listarregistros(id){
    this.service.getestadistica(id).subscribe(
      
      data => {
        for (let index = 0; index < data.length; index++) {
          
          if (data[index].estado=='Cancelado') {
            this.cancelado=data[index]['count'];
            this.barChartData[2].data=data[index]['count'];
          }else if (data[index].estado == 'En Proceso') {
            this.asignados=data[index]['count'];
            this.barChartData[1].data=data[index]['count'];
          }else if (data[index].estado=='Finalizado') {
            this.atend=data[index]['count'];
            this.barChartData[0].data=data[index]['count'];
          }
        }
      }
    )
  }
  mostrar(id,nombre,apellido) {
    this.idactual=id;
  this.nombrecompleto = nombre + ' ' + apellido;
 this.barChartData[0].data=0 ;   
 this.barChartData[1].data=0;  
 this.barChartData[2].data=0;    
   this.listarregistros(id);



  }
  buscar() {
    this.service.getAsignaciones(this.opcion).subscribe(
      data => {
        this.personal = data as Personal[];
        this.dataSource = new MatTableDataSource(this.personal);
      }
    )
  }
  allregisters(){
    this.barChartData[0].data=0 ;   
    this.barChartData[1].data=0;  
    this.barChartData[2].data=0;  
    this.listarregistros(this.idactual)
  }

  buscarfecha(){
    this.barChartData[0].data=0 ;   
 this.barChartData[1].data=0;  
 this.barChartData[2].data=0;    
    this.service.getestadistica_fecha(this.idactual,this.fechai,this.fechaf).subscribe(
      data=>{
        console.log(data)
        for (let index = 0; index < data.length; index++) {
          
          if (data[index].estado=='Cancelado') {
            this.cancelado=data[index]['count'];
            this.barChartData[2].data=data[index]['count'];
          }else if (data[index].estado == 'En Proceso') {
            this.asignados=data[index]['count'];
            this.barChartData[1].data=data[index]['count'];
          }else if (data[index].estado=='Finalizado') {
            this.atend=data[index]['count'];
            this.barChartData[0].data=data[index]['count'];
          }
        }
      }
    )
  }



}
