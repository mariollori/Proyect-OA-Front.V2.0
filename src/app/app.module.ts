import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatMenuModule} from '@angular/material/menu';

import {MatStepperModule} from '@angular/material/stepper';
import { HomeComponent } from './home/homepage/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatGridListModule, MatPaginatorModule, MatRadioModule, MatSelectModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AngularFireStorageModule } from 'angularfire2/storage';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatDialogModule} from '@angular/material/dialog';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NavComponent } from './navbar/nav/nav.component';

import { CommonModule } from '@angular/common';
import { LoginpsiComponent } from './Login/loginpsi/loginpsi.component';
import { RegistroPacienteComponent } from './registros/registro-paciente/registro-paciente.component';
import { DatosUserComponent } from './pages/Perfil/datos-user/datos-user.component';
import { GestOpComponent } from './pages/gest-op/gest-op.component';
import { AuthInterceptorService } from './interceptor/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    
   
    NavComponent,
   
    LoginpsiComponent,
    RegistroPacienteComponent,
    DatosUserComponent,
    GestOpComponent,
  ],
  imports: [
    MatTabsModule,
    CommonModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatStepperModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSidenavModule,
    NgxDocViewerModule,
    MatGridListModule,
    BrowserModule,
    MatInputModule,
    MatFormFieldModule, 
   
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  entryComponents : [  ] , 
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
