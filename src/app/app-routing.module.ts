import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivoComponent } from './archivo/archivo.component';
import { MensajeComponent } from './mensaje/mensaje/mensaje.component';
import { NavComponent } from './navbar/nav/nav.component';




import { AuthGuard } from './Usuarios/guards/auth.guard';

import { LoginComponent } from './Usuarios/login/login.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},


  {path:'nav',component:NavComponent,children: [
    {path:'archivos',component:ArchivoComponent,canActivate:[AuthGuard]},
    {path:'mensajes',component:MensajeComponent,canActivate:[AuthGuard]},
  ],canActivate:[AuthGuard]},
 
  {path:'login',component:LoginComponent},
  /*NOTA: TODOS LAS RUTAS QUE ESTEN DESPUES DE NOTFOUND NO SE RECONOCERAN
  PORQUE?: PORQUE ** REDIGIRA A SU RUTA EN CASO DE NO ECONTRAR UNA Y
   COMO LAS RUTAS ESTAN DESPUES SE QUEDARA CON ESTA*/ 
  {path:'**',component:LoginComponent},
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
