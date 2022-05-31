import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerBlancComponent } from './spinner-blanc/spinner-blanc.component';
import { SpinnerLoaderComponent } from './spinner-loader/spinner-loader.component';
import { CronometroComponent } from './cronometro/cronometro/cronometro.component';
import { SpinnerHomeComponent } from './spinner-home/spinner-home.component';



@NgModule({
  declarations: [
    SpinnerBlancComponent,
    SpinnerLoaderComponent,
    CronometroComponent,
    SpinnerHomeComponent,
  ],
  imports: [
    CommonModule
  ]
  ,
  exports:[
    SpinnerBlancComponent,
    SpinnerLoaderComponent,
    CronometroComponent,
    SpinnerHomeComponent,
  ]
})
export class FragmentsModule { }
