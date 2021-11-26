import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignacionService } from 'src/app/services/asignacion.service';
export class Personal {
  idpersonal: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  ciclo: number;
  grupo: number;
  codigo: string;
  estado: number;
  universidad: string;
  grado_academico: string;
}
@Component({
  selector: 'app-psicologo',
  templateUrl: './psicologo.component.html',
  styleUrls: ['./psicologo.component.css']
})
export class PsicologoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['nro', 'nombre', 'especialidad', 'colegiatura', 'grado_academico','n_colegiatura'];
  dataSource;
  especialistaselec = '';
  pacienteseleccionado;
  constructor(private servicio: AsignacionService,private rutaActiva:ActivatedRoute,private route:Router) { }
  psicologos: any[] = [];

  ngOnInit() {
    this.pacienteseleccionado =  this.rutaActiva.snapshot.params,
    this.servicio.getpersonalayuda('psicologo').subscribe(
        data => {
          this.psicologos = data as Personal[];
          this.dataSource =new MatTableDataSource(this.psicologos);
          this.dataSource.paginator = this.paginator;
          console.log(data);
        }
      );
    
    
  }

  
  select(row){
    console.log(row)
   this.especialistaselec=row;
  }
  
  applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
  
  
  
  
   cancelar(){
     this.especialistaselec='';
     this.pacienteseleccionado =null;
     this.route.navigate(['/nav/asignacion']);
   }
  
}
