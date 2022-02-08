import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/Usuario';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css' ],
  


})
export class HomeComponent implements OnInit {

  

 

 


  constructor(private auth: AuthService, private route: Router, private _snackBar: MatSnackBar) { }



  ngOnInit() {
  }
  

  cerrar(){
    this.route.navigate(['/register-pac'])
  }

 

 
  

  loginpsi(){
    this.route.navigate(['/loginpsi'])
  }





}
