import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css']
})
export class ValoracionComponent implements OnInit {
  
  valortotal;
  dni='';
  codex;
  cargando=false;
  message;
  descripcion='';
  constructor(private route: Router,private params:ActivatedRoute,private service:PersonaService) { }
  puntuacion = [
    { valor: 1, icon: 'far fa-star' },
    { valor: 2, icon: 'far fa-star' },
    { valor: 3, icon: 'far fa-star' },
    { valor: 4, icon: 'far fa-star' },
    { valor: 5, icon: 'far fa-star' }
  ]
  ngOnInit(): void {
    this.codex= this.params.snapshot.paramMap.get('token');
  }

  volver() {
    this.route.navigate(['home'])
  }
  asignar(valoractual) {
    this.valortotal=valoractual;
    for (let index = 0; index < this.puntuacion.length; index++) {
      if (this.puntuacion[index].valor <= valoractual) {
        this.puntuacion[index].icon = 'fas fa-star'
      } else {
        this.puntuacion[index].icon = 'far fa-star'
      }

    }

  }



  registrar_puntuacion(){
    if(this.valortotal > 0 && this.dni.length == 8 && this.descripcion.length > 0){
      this.message = 'Registrando sus recomendaciones..';
      this.cargando=true;
      this.service.registrar_valoracion(this.valortotal,this.dni,this.descripcion,this.codex).subscribe(
        data=>{
          this.cargando= false;
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Valoracion Registrada',
            text: 'Gracias por dejarnos sus recomendaciones.',
          });
          this.asignar(0);
          this.dni='';
          this.descripcion='';
        },e=>{
          this.cargando= false;
          if(e.status == 500){
            console.log(e)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: e.error,
            })
          }
          this.asignar(0);
          this.dni='';
          this.descripcion='';

        }
      )
      
    }else{
      console.log('xd')
      console.log(this.valortotal);
    }  
  }
}
