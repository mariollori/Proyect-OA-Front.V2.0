import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { NavComponent } from './navbar/nav/nav.component';




import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/homepage/home.component';
import { LoginpsiComponent } from './Login/loginpsi/loginpsi.component';
import { RegistroPacienteComponent } from './registros/registro-paciente/registro-paciente.component';
import { DatosUserComponent } from './pages/Perfil/datos-user/datos-user.component';
import { GestOpComponent } from './pages/gest-op/gest-op.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  

  {path:'nav',component:NavComponent,children: [
    
    {path:'perfil_user',component:DatosUserComponent},

    {path:'gest_op',component:GestOpComponent},
  ],canActivate:[AuthGuard]},
 
  {path:'register-pac',component:RegistroPacienteComponent},
  {path:'loginpsi',component:LoginpsiComponent},
  {path:'home',component:HomeComponent},
  /*NOTA: TODOS LAS RUTAS QUE ESTEN DESPUES DE NOTFOUND NO SE RECONOCERAN
  PORQUE?: PORQUE ** REDIGIRA A SU RUTA EN CASO DE NO ECONTRAR UNA Y
   COMO LAS RUTAS ESTAN DESPUES SE QUEDARA CON ESTA*/ 
  {path:'**',component:HomeComponent},
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
