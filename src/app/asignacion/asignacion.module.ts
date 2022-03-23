import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AsignacionRoutingModule } from './asignacion-routing.module';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { PastorComponent } from './pastor/pastor.component';
import { PsicologoComponent } from './psicologo/psicologo.component';
import { AsignacionComponent } from './asignacion.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';




import { BadgeModule } from 'primeng/badge'
import { TableModule } from 'primeng/table'
import { FilterService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  declarations: [
    EstudianteComponent,
    PastorComponent,
    PsicologoComponent,
    AsignacionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AsignacionRoutingModule,
   
    RatingModule,
DialogModule,
    DropdownModule,
    OverlayPanelModule,
    BadgeModule,
    AvatarModule,
    FieldsetModule,
    AutoCompleteModule,
    TableModule,
    StyleClassModule,
DividerModule,
 ScrollPanelModule,
    ButtonModule,
  ],providers
  :[
    FilterService, MessageService
  ]
})
export class AsignacionModule { }
