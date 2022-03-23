import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './homepage/home.component';
import { LoginpsiComponent } from './login/loginpsi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FragmentsModule } from '../snipper/fragments.module';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { RegDatoPsicologoComponent } from './reg-dato-psicologo/reg-dato-psicologo.component';
import { MaterialModule } from '../material/material.module';


/***Angular Material */

@NgModule({
  declarations: [
    HomeComponent,
    LoginpsiComponent,
    RegistroPacienteComponent,
    RegDatoPsicologoComponent,

  ],
  imports: [
    CommonModule,
    FragmentsModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
