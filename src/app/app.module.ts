import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatMenuModule} from '@angular/material/menu';


import { LoginComponent } from './Usuarios/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatGridListModule, MatIconModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { ArchivoComponent } from './archivo/archivo.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';

import { AngularFireStorageModule } from 'angularfire2/storage';


@NgModule({
  declarations: [
    AppComponent,
   

    
    LoginComponent,
    
    ArchivoComponent,
    
   
   
  ],
  imports: [
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
   
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
