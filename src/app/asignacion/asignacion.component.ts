import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AsignacionService } from '../services/asignacion.service';

export interface DataPac {
  idpaciente:number;
  nombre: string;
  apellido:string;
  motivo: string;
  telefono: string;
  descripcion:string
  estado: string;
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
  dataSource;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 
  columnsToDisplay = [ 'nombre', 'motivo', 'telefono','estado','asignacion'];
  expandedElement: DataPac | null;
  constructor(private servicio: AsignacionService) { }
  opcion: string = "";
  pacientes: DataPac[] = [];
  pacseleccionado;
  ngOnInit() {
    this.servicio.getAsignaciones("Sin Asignar").subscribe(
      data => {
        this.pacientes = data as DataPac[];
        this.dataSource= new  MatTableDataSource(this.pacientes);
        this.dataSource.paginator = this.paginator;
        console.log(this.pacientes);
      }
    );

  }

 asignarelement(row){
   this.expandedElement = row as DataPac;
 }
  buscar(){
    console.log(this.opcion);
    this.servicio.getAsignaciones(this.opcion).subscribe(
      data => {
        this.pacientes = data;
        this.dataSource= new  MatTableDataSource(this.pacientes);
        this.dataSource.paginator = this.paginator;
        console.log(this.pacientes);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cerrarModal() {
    document.getElementById('exampleModalCenter').click();
  }
  seleccionarpac(paciente){
    this.pacseleccionado =paciente;

  }
}
