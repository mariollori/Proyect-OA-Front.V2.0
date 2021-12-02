import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
export class Personal {
  idpersonal:number;
  nombre: string;
  apellido: string;
  especialidad: string;
  ciclo:number;
  grupo:number;
  codigo :string;
 estado:number;
}

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  estudiantes: Personal[] = [];
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
 
displayedColumns: string[] = ['nro', 'nombre', 'especialidad', 'ciclo','grupo','codigo'];
dataSource;
estudianteselect:Personal = new Personal();
pacienteseleccionado;

constructor(private route:Router,private service:UserService,private servicio: AsignacionService,private rutaActiva: ActivatedRoute) { }
ngOnInit() {
  this.pacienteseleccionado =  this.rutaActiva.snapshot.params,
  console.log(this.rutaActiva.snapshot.params)
  this.servicio.getpersonalayuda('estudiante').subscribe(
      data => {
        this.estudiantes = data as Personal[];
        this.dataSource =new MatTableDataSource(this.estudiantes);
        this.dataSource.paginator = this.paginator;
        console.log(data);
      }
    );
}

select(row){
  console.log(row)
 this.estudianteselect=row;
}

applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }




 cancelar(){
   this.estudianteselect=new Personal();
   this.pacienteseleccionado =null;
   this.route.navigate(['/nav/asignacion']);
 }


 asignarpaciente(){
   var idpaciente =Number(this.pacienteseleccionado.idpaciente);
  this.servicio.asignarpac_estud(this.estudianteselect.idpersonal,idpaciente).subscribe(
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
