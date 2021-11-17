import { Component, OnInit } from '@angular/core';
import { AsignacionService } from '../services/asignacion.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {

  constructor(private servicio: AsignacionService) { }
  opcion: string = "";
  pacientes: any[] = [];
  ngOnInit() {
    this.servicio.getAsignaciones("Sin Asignar").subscribe(
      data => {
        this.pacientes = data;
        console.log(this.pacientes);
      }
    );

  }


  buscar(){
    console.log(this.opcion);
    this.servicio.getAsignaciones(this.opcion).subscribe(
      data => {
        this.pacientes = data;
        console.log(this.pacientes);
      }
    );
  }

  cerrarModal() {
    document.getElementById('exampleModalCenter').click();
  }

}
