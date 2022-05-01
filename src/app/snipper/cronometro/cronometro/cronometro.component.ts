import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css']
})
export class CronometroComponent implements OnInit {
  
  @Input() puntaje :number; 
  puntuacion = [
    { valor: 1, icon: 'far fa-star' },
    { valor: 2, icon: 'far fa-star' },
    { valor: 3, icon: 'far fa-star' },
    { valor: 4, icon: 'far fa-star' },
    { valor: 5, icon: 'far fa-star' }
  ]

  ngOnInit() {
     this.asignar(this.puntaje);
  }
  asignar(valoractual) {
    for (let index = 0; index < this.puntuacion.length; index++) {
      if (this.puntuacion[index].valor <= valoractual) {
        this.puntuacion[index].icon = 'fas fa-star'
      } else {
        this.puntuacion[index].icon = 'far fa-star'
      }

    }

  }
  

 ngOnDestroy() {
   
 }
}
