import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignacionService } from 'src/app/services/asignacion.service';
import Swal from 'sweetalert2';

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
  selector: 'app-pastor',
  templateUrl: './pastor.component.html',
  styleUrls: ['./pastor.component.css']
})
export class PastorComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['nro', 'nombre', 'especialidad', 'universidad', 'grado_academico'];
  dataSource;
  pastorselec:Personal = new Personal();
  pacienteseleccionado;
  pastores: Personal[] = [];
  constructor(private servicio: AsignacionService,private rutaActiva:ActivatedRoute,private route:Router) { }

  ngOnInit() {

    this.pacienteseleccionado =  this.rutaActiva.snapshot.params,
    this.servicio.getpersonalayuda('pastor').subscribe(
        data => {
          this.pastores = data as Personal[];
          this.dataSource =new MatTableDataSource(this.pastores);
          this.dataSource.paginator = this.paginator;
          console.log(data);
        }
      );
    
  }

  
select(row){
  console.log(row)
 this.pastorselec=row;
}

applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }




 cancelar(){
   this.pastorselec=new Personal();
   this.pacienteseleccionado =null;
   this.route.navigate(['/nav/asignacion']);
 }


 

 asignarpaciente(){
  var idpaciente =Number(this.pacienteseleccionado.idpaciente);
 this.servicio.asignarpac_estud(this.pastorselec.idpersonal,idpaciente).subscribe(
   data=>{
     Swal.fire(
       'Asignado',
       data.toString(),
       'success'
     )
     this.route.navigate(['nav/asignacion'])
   }
 )
}

}
