import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';


import { ReportesComponent } from 'src/app/reportes/reportes/reportes.component';
import { RegistrarAtencionComponent } from 'src/app/navbar/registrar-atencion/registrar-atencion.component';


import { DataTablesModule } from 'angular-datatables';
import { FragmentsModule } from 'src/app/snipper/fragments.module';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { DatosUserComponent } from './datos-user/datos-user.component';
import { GestOpComponent } from './gest-op/gest-op.component';
import { NgChartsModule, ThemeService } from 'ng2-charts';
import { ReporteIComponent } from '../reportes/reporte_individual/reporte-i.component';
import { BandejaInComponent } from './bandeja-in/bandeja-in.component';
import { ClipboardModule } from "@angular/cdk/clipboard";

@NgModule({
  declarations: [
    NavComponent,
    DatosUserComponent,
    GestOpComponent,
    RegistrarAtencionComponent,
    ReportesComponent,    
    ReporteIComponent, 
    BandejaInComponent, 
    

  ],
  imports: [
    
    CommonModule,
    ReactiveFormsModule,
    NavRoutingModule,
    FragmentsModule,
    NgChartsModule,
    ClipboardModule,
    FormsModule,
    MaterialModule,
    
    DataTablesModule,
  ],
  providers:[
    ThemeService
  ]
})
export class NavModule { }
