import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-change-pssw',
  templateUrl: './change-pssw.component.html',
  styleUrls: ['./change-pssw.component.css']
})
export class ChangePsswComponent implements OnInit {

    constructor(private auth:AuthService, private toast: NgToastService,private route:ActivatedRoute,private router:Router) { }
 newpassword;
 toky;
 cargando=false;
 message;
 password;
  ngOnInit(): void {
     this.toky= this.route.snapshot.paramMap.get('token');
     if(this.istokenExpirado()){
      this.router.navigate(['/home']);
    } 
      

 
  }
  istokenExpirado():boolean{
    let payload= this.auth.obtenerdatostoken(this.toky);
    let now = new Date().getTime()/1000;
    if(payload.exp < now){
      return true;
    }
    return false;
  }
  changepassword(){
     if(!this.newpassword || !this.password){
      this.toast.error({detail:"Error",summary:'Complete los campos por favor.  ',duration:3000}); 
     } else{
       if(this.newpassword.length>5 || this.password.length>5){
        if(this.newpassword != this.password){
          this.toast.error({detail:"Error",summary:'Las contraseñas no coinciden.  ',duration:3000}); 
        }else{
          this.message='Cambiando contraseña...';
          this.cargando=true;
            this.auth.changepassword(this.toky, this.newpassword).subscribe(
              data=>{
                this.cargando = false;
                this.toast.success({detail:"Modificado",summary:'Credenciales modificadas con exito.  ',duration:3000}); 
                this.router.navigate(['home/loginpsi'])
                
              },(e)=>{
                this.cargando = false;
                this.toast.error({detail:"Tiempo expirado",summary:'Porfavor intente de nuevo.',duration:3000});
                this.router.navigate(['home/loginpsi'])
              }
            )
        }
       }else{
        this.toast.error({detail:"Error",summary:'Minimo 5 caracteres.  ',duration:3000}); 
       }
      
     }
  }

}
