import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Data } from '@angular/router';
import { AsignacionService } from '../services/asignacion.service';
import { RegDatoPsicologoService } from '../services/reg-dato-psicologo.service';

export interface DataPac {
  idpersonal: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  ciclo: number;
  grupo: number;
  codigo: string;
  tipo:string;
  estado: number;
  universidad: string;
  grado_academico: string;
  }
@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AsignacionComponent implements OnInit {
  imagenpsi;
  imagenpsi2
  dataSource:MatTableDataSource<DataPac>;
  dataSource2:MatTableDataSource<DataPac>;
  psi_asig:any='';
  ultimodetalle:any='';
  sesiones:any[]=[];
  @ViewChild('MatPaginator1' ,{ static: true }) paginator: MatPaginator;
  @ViewChild('MatPaginator2', { static: true }) paginator2: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;
  @ViewChild('TableTwoSort', {static: true}) tableOneSort2: MatSort;
  columnsToDisplay = [ 'nombre', 'motivo','genero', 'telefono','estado','asignacion'];
  columnsToDisplay2 = [ 'nombre', 'motivo','genero',  'telefono','estado','detalle'];
  expandedElement: DataPac | null;
  expandedElement2: DataPac | null;
  constructor(private servicio: AsignacionService,private imageserv:RegDatoPsicologoService) {
    this.dataSource = new MatTableDataSource;

    this.dataSource2 = new MatTableDataSource;
   }
  opcion: string = '';
  pacientes: DataPac[] = [];
  pacientes2: DataPac[] = [];
  pacseleccionado;
  ngOnInit() {
    
    this.opcion='Sin Asignar'
    this.servicio.getAsignaciones(this.opcion).subscribe(
      data => {
        this.pacientes = data as DataPac[];
        this.dataSource.data= this.pacientes as DataPac[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.tableOneSort;
      }
    );

  }


  buscar(){
    switch (this.opcion) {
      case 'Sin Asignar':
        this.servicio.getAsignaciones(this.opcion).subscribe(
          data => {
            this.pacientes = data as DataPac[];
            this.dataSource.data= this.pacientes as DataPac[];
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.tableOneSort;
          }
        );
        break;
        case 'En Proceso':
          
        this.servicio.getAsignaciones(this.opcion).subscribe(
          data => {
            this.pacientes = data as DataPac[];
            this.dataSource.data= this.pacientes as DataPac[];
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.tableOneSort;
            console.log(data)

          }
          );
          break;
          case 'Finalizado':
            this.servicio.getAsignaciones(this.opcion).subscribe(
              data => {
                this.pacientes = data as DataPac[];
                this.dataSource.data= this.pacientes as DataPac[];
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.tableOneSort;
                console.log(data)
    
              }
            );
        break;
        case 'Derivado':
            this.servicio.getAsignaciones(this.opcion).subscribe(
              data => {
                this.pacientes = data as DataPac[];
                this.dataSource.data= this.pacientes as DataPac[];
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.tableOneSort;
                console.log(data)
    
              }
            );
        break;
    
      default:
        break;
    }
  
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  cerrarModal() {
    document.getElementById('exampleModalCenter').click();
  }
  seleccionarpac(paciente){
    this.pacseleccionado =paciente;

  }

  verasignacion(id){
    this.servicio.getpsi_asignado(id).subscribe(
      data=>{
        if(data[0].foto==null){
          
          this.imagenpsi='https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg';
          
          this.psi_asig=data[0];
        }else{
          
          this.psi_asig=data[0];
          this.imageserv.mostrarimagenfirebase(data[0].foto).subscribe(
            data2=>{

              this.imagenpsi=data2;
            }
          )
        }

          
      }
    )
  }

  verultimaobser(id){
    this.servicio.getpsi_asignado(id).subscribe(
      data=>{
        if(data[0].foto==null){
          
          this.imagenpsi2='https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg';
          
          this.psi_asig=data[0];
        }else{
          
          this.psi_asig=data[0];
          this.imageserv.mostrarimagenfirebase(data[0].foto).subscribe(
            data2=>{

              this.imagenpsi2=data2;
            }
          )
         
        }

      }
    )
    this.servicio.get_last_condition(id).subscribe(
      data=>{
        console.log(data)
        this.sesiones= data
      }
    )
  }
}
