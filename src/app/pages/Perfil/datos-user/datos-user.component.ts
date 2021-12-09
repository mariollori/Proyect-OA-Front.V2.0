import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Horario_psicologo } from 'src/app/models/Horario_psicologo';
import { Persona } from 'src/app/models/Persona';
import { Personal_ayuda } from 'src/app/models/personal-ayuda';

import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { RegDatoPsicologoService } from 'src/app/services/reg-dato-psicologo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-user',
  templateUrl: './datos-user.component.html',
  styleUrls: ['./datos-user.component.css']
})
export class DatosUserComponent implements OnInit {
  editstate=false;
  
  editstate2=false;
  constructor(private service:RegDatoPsicologoService,private token:AuthService,private imagenserv:ImagenService) { }
  idpersona;
  archivo:File;
  foto;
  imgCodified: string;
  tipo;
  // Form de datos personales
  nombrecompleto;
  registerform:FormGroup;
  persona:Persona = new Persona();
  personal:Personal_ayuda= new Personal_ayuda();
  //form de horarios
  horarios:Horario_psicologo[]=[]
  // c
  dia;
  horai;
  horaf;
  dias=['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
 
  ngOnInit() {
    this.registerform = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required,Validators.email]),
      genero: new FormControl('', ),
      edad: new FormControl('',Validators.maxLength(8) ),
      telefono: new FormControl('', Validators.required)
      
    });
    this.datapersonal()
    this.dataschool()
    this.getHorarios()
  }

  datapersonal(){
    this.service.getdatapersonal(this.token.usuario.idpersonal).subscribe(
      data=>{
        console.log(data);
        this.registerform.setValue(data[0]);
        this.nombrecompleto= data[0].nombre + ' ' + data[0].apellido;
      }
    )

  }
  dataschool(){
    this.service.getdataschool(this.token.usuario.idpersonal).subscribe(
      data=>{
        this.idpersona= data[0].idpersona;
        this.tipo=data[0].tipo;
        this.personal = data[0];
        if(data[0].foto==null){
          this.imagenserv.nombre='https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg'
          var doc = document.getElementById('imagendeperfil')
          doc.setAttribute('src','https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg')
          localStorage.setItem('imagen','https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg')
        }else{
          this.service.mostrarimagenfirebase(data[0].foto).subscribe(
            data=>{
           this.imagenserv.nombre=data;
              var doc = document.getElementById('imagendeperfil')
              localStorage.setItem('imagen',data)
              doc.setAttribute('src',data)
            }
          )
        
        }
      }
    )

  }
  agregarhorario(){
    var horarioadd = new Horario_psicologo();
    horarioadd.dia=this.dia;
    horarioadd.horai=this.horai;
    horarioadd.horaf=this.horaf;
    horarioadd.idpersonal= this.token.usuario.idpersonal;
    this.service.crearhorario(horarioadd).subscribe(
      data=>{
        Swal.fire(
          'Registrardo',
          data.toString(),
          'success'
        );
        this.getHorarios();
      }
    )
    this.dia = ' '
    this.horai=' '
    this.horaf=' '
  
    
  }
    eliminarhor(id,dia){
      this.service.deletehorario(id).subscribe(
        data=>{
          this.getHorarios();
          this.dias.push(dia);
        }
      )
    
   
     
      
    }
    
    activar(){
      this.editstate=true;
      console.log(this.editstate)
    }
    desactive(){
      this.editstate=false;
      this.datapersonal()
    }
    save(){
      this.persona= this.registerform.value;
      this.persona.idpersona = this.idpersona;
      this.service.changedataper(this.registerform.value).subscribe(
        data=>{
          Swal.fire({
            icon: 'success',
            title: '',
            text: data.toString(),
          })
          this.datapersonal();
          this.editstate=false;
        }
      )
    }
    save2(){
      this.personal.idpersonal = this.token.usuario.idpersonal;
      this.service.changedataschool(this.personal,this.tipo).subscribe(
        data=>{
          Swal.fire({
            icon: 'success',
            title: '',
            text: data.toString(),
          })
          this.dataschool();
          this.editstate2=false;
        }
      )
    }

    activar2(){
      this.editstate2=true;
      console.log(this.editstate)
    }
    desactive2(){
      this.editstate2=false;
      this.dataschool();
    }


    getHorarios(){
      this.service.gethorarios(this.token.usuario.idpersonal).subscribe(
        data=>{
          this.horarios = data as Horario_psicologo[];
          this.horarios.forEach(element => {
            this.eliminardiadelselect(element.dia)
          });
       
          

        }
      )
    }
    eliminardiadelselect(dia){
      console.log(dia)
      var i = this.dias.indexOf( dia );
      if(i!=-1){

        this.dias.splice( i, 1 );
      }
      
    }

   
      
    mostrar(event) {
      this.archivo = event.target.files[0];
      var supportedImages = ["image/jpeg", "image/png", "image/gif"];
      var seEncontraronElementoNoValidos = false;
  
      if (supportedImages.indexOf(this.archivo.type) != -1) {
        this.imgCodified = URL.createObjectURL(this.archivo);
        var doc = document.getElementById('imagendeperfil')
        doc.setAttribute('src',this.imgCodified)
      }
      else {
        seEncontraronElementoNoValidos = true;
      }
    };

    subirfoto(){
    console.log(this.archivo.name)
    console.log(this.archivo)
    this.service.subirfoto(this.token.usuario.idpersonal,this.archivo.name).subscribe(
      data=>{
        this.service.subirImagen(this.archivo).then(
          url=>{
            Swal.fire({
              icon: 'success',
              title: '',
              text: data.toString(),
            })
            this.dataschool();
            this.archivo=null;
          }
        );
       
      }
    )
 
    }

}
