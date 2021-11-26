import { Component, OnInit } from '@angular/core';
import { AsignacionService } from 'src/app/services/asignacion.service';
@Component({
  selector: 'app-pastor',
  templateUrl: './pastor.component.html',
  styleUrls: ['./pastor.component.css']
})
export class PastorComponent implements OnInit {

  constructor(private servicio: AsignacionService) { }
  pastores: any[] = [];
  ngOnInit() {
    this.servicio.getPastor().subscribe(
      data => {
        this.pastores = data;
        console.log(this.pastores);
      }
    );
  }

}
