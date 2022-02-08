import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core';

import {MatStepperModule} from '@angular/material/stepper';
import { HomeComponent } from './home/homepage/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AngularFireStorageModule } from 'angularfire2/storage';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { NavComponent } from './navbar/nav/nav.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { LoginpsiComponent } from './Login/loginpsi/loginpsi.component';
import { RegistroPacienteComponent } from './registros/registro-paciente/registro-paciente.component';
import { DatosUserComponent } from './pages/Perfil/datos-user/datos-user.component';
import { GestOpComponent } from './pages/gest-op/gest-op.component';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';
import { SpinnerLoaderComponent } from './snipper/spinner-loader/spinner-loader.component';
import { SpinnerBlancComponent } from './snipper/spinner-blanc/spinner-blanc.component';
import { RegistrarAtencionComponent } from './pages/registrar_atencion/registrar-atencion/registrar-atencion.component';
import {MatCardModule} from '@angular/material/card';
import { GestUsersComponent } from './pages/gest-users/gest-users/gest-users.component';
import {MatTooltipModule} from '@angular/material/tooltip';

import { MatSortModule } from '@angular/material/sort';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { PastorComponent } from './asignacion/pastor/pastor.component';
import { PsicologoComponent } from './asignacion/psicologo/psicologo.component';
import { EstudianteComponent } from './asignacion/estudiante/estudiante.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { RegDatoPsicologoComponent } from './reg-dato-psicologo/reg-dato-psicologo.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

import { ReportesComponent } from './reportes/reportes/reportes.component';
import { ChartsModule, ThemeService } from 'ng2-charts';

//****************** Primeng */
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {BadgeModule} from 'primeng/badge'
import {TableModule} from 'primeng/table'
import {FilterService} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {MenuItem} from 'primeng/api';
import {MenuModule} from 'primeng/menu';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {RatingModule} from 'primeng/rating';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {DataTablesModule} from 'angular-datatables';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {DividerModule} from 'primeng/divider';
import {FieldsetModule} from 'primeng/fieldset';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {StyleClassModule} from 'primeng/styleclass';
import { MatButtonModule } from '@angular/material/button';
import {DropdownModule} from 'primeng/dropdown';
import { RouterModule, Routes, ExtraOptions, ROUTES } from '@angular/router';
import { CronometroComponent } from './snipper/cronometro/cronometro/cronometro.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AsignacionComponent,
    PastorComponent,
    PsicologoComponent,
    EstudianteComponent,

    NavComponent,
        

    LoginpsiComponent,
    RegistroPacienteComponent,
    DatosUserComponent,
    GestOpComponent,
    SpinnerLoaderComponent,
    SpinnerBlancComponent,
    RegistrarAtencionComponent,
    GestUsersComponent,

    ReportesComponent,

  
 
    RegDatoPsicologoComponent,
             CronometroComponent,

  ],
  imports: [
    
    CardModule,
    ButtonModule,
    MatNativeDateModule,
    ToastModule,
    RatingModule,
    CascadeSelectModule,
    MatDatepickerModule,
    DropdownModule,
  InputTextModule,
  TabViewModule,
    BadgeModule,
    DataTablesModule,
    AvatarModule,
    FieldsetModule,
    MatSortModule,
    AutoCompleteModule,
   TableModule,
   StyleClassModule,
   TieredMenuModule,
MenuModule,
    ChartsModule,
    MatTooltipModule,
    MatCardModule,
    DividerModule,
    MatSlideToggleModule,
    MatTabsModule,
    CommonModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    OverlayPanelModule,
    MatSidenavModule,
    DialogModule,
    MatGridListModule,
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    ScrollPanelModule,
 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  
  ],
  entryComponents : [  ] ,
  providers: [FilterService,MessageService,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  },ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
