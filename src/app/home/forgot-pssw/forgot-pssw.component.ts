import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-pssw',
  templateUrl: './forgot-pssw.component.html',
  styleUrls: ['./forgot-pssw.component.css']
})
export class ForgotPsswComponent implements OnInit {

  constructor( private auth:AuthService, private toast: NgToastService,private rout:Router) { }
  correo='';
  cargando = false;
  message = '';
  ngOnInit(): void {
  }

  forgot(){
    if(this.correo.length > 5){
      this.message = 'Verificando...';
      this.cargando = true;

      this.auth.forgotpassword(this.correo).subscribe(
        data=>{
          this.cargando = false;
          this.toast.success({detail:"Confirmado",summary:'Verifique su correo porfavor.  ',duration:10000}); 
          this.rout.navigate(['home'])
        },e=>{
          this.cargando= false;
          this.toast.error({detail:"ERROR",summary:'Porfavor introduce un correo valido.  ',duration:5000}); 
        }
      )
    }else{
      this.toast.error({detail:"ERROR",summary:'Porfavor introduce un correo valido.  ',duration:5000}); 
    }
    
  }


}
