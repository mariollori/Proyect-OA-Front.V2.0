import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RegDatoPsicologoService } from 'src/app/services/reg-dato-psicologo.service';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reporte-i',
  templateUrl: './reporte-i.component.html',
  styleUrls: ['./reporte-i.component.css']
})
export class ReporteIComponent implements OnInit {

  idactual;
  tipo;
  persona;
  dtOptions: any;
  constructor(private service: ReporteService,private router:Router,private route:ActivatedRoute,private imgserv : RegDatoPsicologoService) { }
  fechai: Date;
  fechaf: Date;
  
   @ViewChildren(BaseChartDirective) chart:QueryList<BaseChartDirective> ;

  ngOnInit(): void {
      this.idactual = this.route.snapshot.paramMap.get('id');
      this.tipo = this.route.snapshot.paramMap.get('tipo');
      this.get_info_personal();
      this.get_todos_por_id();
  }

   
  get_info_personal(){
    var cont_img = document.getElementById('perfil');
    this.service.get_info_personal(this.idactual,this.tipo).subscribe(
      data=>{
        this.persona=data[0];
        if(data[0].foto == null){
          cont_img.setAttribute('src','https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Clip-Art-Transparent-PNG.png')

        }else{
          this.imgserv.mostrarimagenfirebase(data[0].foto).subscribe(
            data2=>{
              console.log(data2);
              cont_img.setAttribute('src',data2);
            }
          )
          
        }
       
        
      }
    )

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

  //** Datos de la grafica */
  public barChartData: ChartData<'bar'> = {
    labels: ['Periodo Total'],
    datasets: [
      { data: [0], label: 'Finalizadas', backgroundColor: '#13c298', hoverBackgroundColor: '#13c298', },
      { data: [0], label: 'En Proceso', backgroundColor: '#fce0a2', hoverBackgroundColor: '#fce0a2' },
      { data: [0], label: 'Canceladas', backgroundColor: 'red', hoverBackgroundColor: 'red' }
    ]
  };

  get_todos_por_id_fecha() {
    this.barChartData.datasets[0].data = [0];
    this.barChartData.datasets[2].data = [0];
    this.barChartData.datasets[1].data = [0];
    this.service.getestadistica_fecha(this.idactual, this.fechai, this.fechaf).subscribe(
      data => {
        console.log(data)
        for (let index = 0; index < data.length; index++) {
          switch (data[index].estado) {
            case 'Cancelado':
              this.barChartData.datasets[2].data = [data[index]['count']];
              break;
            case 'En Proceso':
              this.barChartData.datasets[1].data = [data[index]['count']];
              break;
            case 'Finalizado':
              this.barChartData.datasets[0].data = [data[index]['count']];
              break;
            default:
              break;
          }
        }
        this.chart.last.update()

      }
    )
  }
  get_todos_por_id() {
    this.fechaf = null;
    this.fechai = null;
    this.barChartData.datasets[0].data[0] = 0;
    this.barChartData.datasets[1].data[0] = 0;
    this.barChartData.datasets[2].data[0] = 0;
    this.service.getestadistica(this.idactual).subscribe(
      data => {
        console.log(data)
        for (let index = 0; index < data.length; index++) {
          switch (data[index].estado) {
            case 'Cancelado':
              this.barChartData.datasets[2].data = [data[index]['count']];
              break;
            case 'En Proceso':
              this.barChartData.datasets[1].data = [data[index]['count']];
              break;
            case 'Finalizado':
              this.barChartData.datasets[0].data = [data[index]['count']];
              break;
            default:
              break;
          }
        }
      this.chart.last.update();
      }
    )
  }
  back(){
    this.router.navigate(['nav/reportes/']);
  }
}
