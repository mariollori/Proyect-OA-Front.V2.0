import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';


import { NavComponent } from './navbar/nav/nav.component';




import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/homepage/home.component';
import { LoginpsiComponent } from './Login/loginpsi/loginpsi.component';
import { RegistroPacienteComponent } from './registros/registro-paciente/registro-paciente.component';
import { DatosUserComponent } from './pages/Perfil/datos-user/datos-user.component';
import { GestOpComponent } from './pages/gest-op/gest-op.component';
import { RegistrarAtencionComponent } from './pages/registrar_atencion/registrar-atencion/registrar-atencion.component';
import { GestUsersComponent } from './pages/gest-users/gest-users/gest-users.component';


import { AsignacionComponent } from './asignacion/asignacion.component';
import { PastorComponent } from './asignacion/pastor/pastor.component';
import { EstudianteComponent } from './asignacion/estudiante/estudiante.component';
import { PsicologoComponent } from './asignacion/psicologo/psicologo.component';
import { ReportesComponent } from './reportes/reportes/reportes.component';
import { RegDatoPsicologoComponent } from './reg-dato-psicologo/reg-dato-psicologo.component';



const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},


  {path:'nav',component:NavComponent,children: [

    {path:'perfil_user',component:DatosUserComponent,canActivate:[AuthGuard]},
    {path:'registro_pac',component:RegistrarAtencionComponent,canActivate:[AuthGuard]},
    {path:'gest_users',component:GestUsersComponent,canActivate:[AuthGuard]},

   {path:'reportes',component:ReportesComponent,canActivate:[AuthGuard]},

    {path:'gest_op',component:GestOpComponent,canActivate:[AuthGuard]},


    {path:'asignacion', component:AsignacionComponent,canActivate:[AuthGuard]},
    {path:'pastor', component:PastorComponent,canActivate:[AuthGuard]},
    {path:'estudiante', component:EstudianteComponent,canActivate:[AuthGuard]},
    {path:'psicologo', component:PsicologoComponent,canActivate:[AuthGuard]},
    /*  PERFIL DEL USUARIO O PSICOLOGO UNA VEZ QUE SE REGISTRE */
  
  ]},

  {path:'register-pac',component:RegistroPacienteComponent},
  {path:'reg_dato_psicologo',component:RegDatoPsicologoComponent},
  {path:'loginpsi',component:LoginpsiComponent},
  {path:'home',component:HomeComponent},
  /*NOTA: TODOS LAS RUTAS QUE ESTEN DESPUES DE NOTFOUND NO SE RECONOCERAN
  PORQUE?: PORQUE ** REDIGIRA A SU RUTA EN CASO DE NO ECONTRAR UNA Y
   COMO LAS RUTAS ESTAN DESPUES SE QUEDARA CON ESTA*/
  {path:'**',component:HomeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload', 
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64] // [x, y]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
