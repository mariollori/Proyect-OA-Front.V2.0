import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { RegistrarAtencionComponent } from 'src/app/navbar/registrar-atencion/registrar-atencion.component';
import { ReportesComponent } from 'src/app/reportes/reportes/reportes.component';
import { ReporteIComponent } from '../reportes/reporte_individual/reporte-i.component';
import { BandejaInComponent } from './bandeja-in/bandeja-in.component';
import { DatosUserComponent } from './datos-user/datos-user.component';
import { GestOpComponent } from './gest-op/gest-op.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [

  {path:'',component:NavComponent,children:[
    {path:'perfil_user',component:DatosUserComponent,canActivate:[AuthGuard]},
    {path:'registro_pac',component:RegistrarAtencionComponent,canActivate:[AuthGuard]},
   {path:'reportes',component:ReportesComponent,canActivate:[AuthGuard]},
   {path:'report/:tipo/:id' ,component:ReporteIComponent},
    {path:'gest_op',component:GestOpComponent,canActivate:[AuthGuard]},
    {path:'bandeja_entrada',component:BandejaInComponent,canActivate:[AuthGuard]},
    {path:'asignacion',loadChildren:()=> import('../asignacion/asignacion.module').then(m=>m.AsignacionModule)},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }
