import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AsignacionComponent } from './asignacion.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { PastorComponent } from './pastor/pastor.component';
import { PsicologoComponent } from './psicologo/psicologo.component';

const routes: Routes = [
  {path:'pastor', component:PastorComponent,canActivate:[AuthGuard]},
  {path:'estudiante', component:EstudianteComponent,canActivate:[AuthGuard]},
  {path:'psicologo', component:PsicologoComponent,canActivate:[AuthGuard]},

        {path:'',component:AsignacionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionRoutingModule { }
