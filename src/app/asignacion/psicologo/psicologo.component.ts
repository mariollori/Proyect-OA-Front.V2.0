import { Component, OnInit } from '@angular/core';
import { AsignacionService } from 'src/app/services/asignacion.service';

@Component({
  selector: 'app-psicologo',
  templateUrl: './psicologo.component.html',
  styleUrls: ['./psicologo.component.css']
})
export class PsicologoComponent implements OnInit {

  constructor(private servicio: AsignacionService) { }
  psicologos: any[] = [];

  ngOnInit() {
    this.servicio.getPsicologo().subscribe(
      data => {
        this.psicologos = data;
        console.log(this.psicologos);
      }
    );
  }

}
