import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpsiComponent } from './login/loginpsi.component';
import { HomeComponent } from './homepage/home.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { RegDatoPsicologoComponent } from './reg-dato-psicologo/reg-dato-psicologo.component';

const routes: Routes = [
  {path:'loginpsi',component:LoginpsiComponent},
  {path:'register-pac',component:RegistroPacienteComponent},
  {path:'reg_dato_psicologo',component:RegDatoPsicologoComponent},
  {path:'',component:HomeComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
