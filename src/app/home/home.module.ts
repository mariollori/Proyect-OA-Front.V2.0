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
import { ValoracionComponent } from './valoracion/valoracion.component';
import { ChangePsswComponent } from './change-pssw/change-pssw.component';
import { ForgotPsswComponent } from './forgot-pssw/forgot-pssw.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';



/***Angular Material */

@NgModule({
  declarations: [
    HomeComponent,
    LoginpsiComponent,
    RegistroPacienteComponent,
    RegDatoPsicologoComponent,
    ValoracionComponent,
    ChangePsswComponent,
    ForgotPsswComponent,

  ],
  imports: [
    CommonModule,
    FragmentsModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,

    ReactiveFormsModule,
  ]
  ,providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
  }
  ]
})
export class HomeModule { }
