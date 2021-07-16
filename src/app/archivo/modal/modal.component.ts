import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArchivoService } from 'src/app/services/archivo.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private service:ArchivoService) { }
  foto:string;
  tipo:boolean =false;
  ngOnInit() {
    this.service.mostrarimagenfirebase(this.data.foto).subscribe(
      data2=>{
        console.log(data2)
        if(this.data.tipo.toLowerCase().indexOf('jfif') >= 0 ||this.data.tipo.toLowerCase().indexOf('jpg') >= 0 || this.data.tipo.toLowerCase().indexOf('png') >= 0){
          this.foto=data2
          this.tipo= true;
        }else{
          this.foto=data2
        }
        console.log(this.tipo)
      }
    )
  }

}
