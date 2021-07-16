import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatMenuModule} from '@angular/material/menu';


import { LoginComponent } from './Usuarios/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatPaginatorModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { ArchivoComponent } from './archivo/archivo.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import {MatTableModule} from '@angular/material/table';

import { AngularFireStorageModule } from 'angularfire2/storage';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ModalComponent } from './archivo/modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NavComponent } from './navbar/nav/nav.component';
import { MensajeComponent } from './mensaje/mensaje/mensaje.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArchivoComponent,
    ModalComponent,
    NavComponent,
    MensajeComponent,
  ],
  imports: [
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
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
    MatIconModule,
    HttpClientModule,
   
    AppRoutingModule,
    MatSnackBarModule,
   
    BrowserAnimationsModule,
    
  ],
  entryComponents : [ ModalComponent ] , 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
