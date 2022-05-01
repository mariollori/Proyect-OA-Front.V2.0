import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpsiComponent } from './login/loginpsi.component';
import { HomeComponent } from './homepage/home.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { RegDatoPsicologoComponent } from './reg-dato-psicologo/reg-dato-psicologo.component';
import { ValoracionComponent } from './valoracion/valoracion.component';
import { ChangePsswComponent } from './change-pssw/change-pssw.component';
import { ForgotPsswComponent } from './forgot-pssw/forgot-pssw.component';


const routes: Routes = [
  {path:'',component:HomeComponent},  
  {path:'loginpsi',component:LoginpsiComponent},
  {path:'valoracion/:token',component:ValoracionComponent},
  {path:'register-pac',component:RegistroPacienteComponent},
  {path:'reg_dato_psicologo',component:RegDatoPsicologoComponent},
  {path:'change-password/:token',component:ChangePsswComponent},
  {path:'forgot-password',component:ForgotPsswComponent},


  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
