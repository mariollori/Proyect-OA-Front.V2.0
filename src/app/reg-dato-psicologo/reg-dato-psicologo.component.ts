import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-dato-psicologo',
  templateUrl: './reg-dato-psicologo.component.html',
  styleUrls: ['./reg-dato-psicologo.component.css']
})
export class RegDatoPsicologoComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }



  volver(){
    this.route.navigate(['home'])
  }


}
