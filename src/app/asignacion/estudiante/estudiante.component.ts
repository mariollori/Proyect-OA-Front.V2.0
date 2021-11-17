import { Component, OnInit } from '@angular/core';
import { AsignacionService } from 'src/app/services/asignacion.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  constructor(private servicio: AsignacionService) { }
  estudiantes: any[] = [];

  ngOnInit() {
    this.servicio.getEstudiante().subscribe(
      data => {
        this.estudiantes = data;
        console.log(this.estudiantes);
      }
    );
  }



}
