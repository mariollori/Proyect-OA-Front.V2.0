import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Horario_psicologo } from 'src/app/models/Horario_psicologo';
import { Persona } from 'src/app/models/Persona';
import { Personal_ayuda } from 'src/app/models/Personal';

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
  editstate = false;
  editstate2 = false;

  constructor(private service: RegDatoPsicologoService, private token: AuthService, private imagenserv: ImagenService) { }

  /*Manejo de foto*/
  archivo: File;
  foto;
  imgCodified: string;
  persona: Persona = new Persona();
  personal: Personal_ayuda = new Personal_ayuda();
  /*Datos visibles*/
  nombrecompleto;
  correo;
  telefono;
  tipo;
  // Form de datos personales
  datos_personales: FormGroup;


  horarios: Horario_psicologo[] = []
  // Controladores de horario
  dia;
  horai;
  horaf;
  dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  ngOnInit() {
    this.datos_personales = new FormGroup({
      idpersona: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      genero: new FormControl('',),

      telefono: new FormControl('', Validators.required)

    });

    this.get_datos_personales()
    this.get_datos_academicos()
    this.get_horarios()
  }

  get_datos_personales() {
    this.service.getdatapersonal(this.token.usuario.idpersonal).subscribe(
      data => {
        this.datos_personales.setValue(data[0]);
      
        this.nombrecompleto = data[0].nombre + ' ' + data[0].apellido;
        this.correo = data[0].correo;
        this.telefono = data[0].telefono;
      }
    )
  }
  get_datos_academicos() {
    this.service.getdataschool(this.token.usuario.idpersonal).subscribe(
      data => {
     
        this.tipo = data[0].tipo;
        console.log(data)
        this.personal = data[0];
        if (data[0].foto == null) {
          this.imagenserv.nombre = 'https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg'
          var doc = document.getElementById('imagendeperfil')
          doc.setAttribute('src', 'https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg')
          localStorage.setItem('imagen', 'https://s3.amazonaws.com/files.patmos.upeu.edu.pe/img/upload/fotos/80/no_photo.jpg')
        } else {
          this.service.mostrarimagenfirebase(data[0].foto).subscribe(
            data => {
              this.imagenserv.nombre = data;
              var doc = document.getElementById('imagendeperfil')
              localStorage.setItem('imagen', data)
              doc.setAttribute('src', data)
            }
          )

        }
      }
    )

  }

   /*Modificar datos*/
  
  save() {
    this.persona = this.datos_personales.value;
    this.service.changedataper(this.persona).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: '',
          text: data.toString(),
        })
        this.get_datos_personales()
        this.editstate = false;
      }
    )
  }
  save2() {
    this.personal.idpersonal = this.token.usuario.idpersonal;
    this.service.changedataschool(this.personal, this.tipo).subscribe(
      data => {
        Swal.fire({
          icon: 'success',
          title: '',
          text: data.toString(),
        })
        this.get_datos_academicos();
        this.editstate2 = false;
      }
    )
  }

 /*HORARIOS */


  get_horarios() {
    this.service.gethorarios(this.token.usuario.idpersonal).subscribe(
      data => {
        this.horarios = data as Horario_psicologo[];
        this.horarios.forEach(element => {
          this.eliminar_dias_seleccionados(element.dia)
        });
      }
    )
  }

  agregar_horario() {
    var horarioadd = new Horario_psicologo();
    horarioadd.dia = this.dia;
    horarioadd.horai = this.horai;
    horarioadd.horaf = this.horaf;
    horarioadd.idpersonal = this.token.usuario.idpersonal;
    this.service.crearhorario(horarioadd).subscribe(
      data => {
        Swal.fire(
          'Registrardo',
          data.toString(),
          'success'
        );
        this.get_horarios();
      }
    )
    this.dia = ' '
    this.horai = ' '
    this.horaf = ' '
  }

  eliminar_horario(id, dia) {
    this.service.deletehorario(id).subscribe(
      data => {
        this.get_horarios();
        this.dias.push(dia);
      }
    )
  }

  eliminar_dias_seleccionados(dia) {
    var i = this.dias.indexOf(dia);
    if (i != -1) {
      this.dias.splice(i, 1);
    }
  }

  /* foto */

  mostrar(event) {
    this.archivo = event.target.files[0];
    var supportedImages = ["image/jpeg", "image/png", "image/gif"];
    var seEncontraronElementoNoValidos = false;

    if (supportedImages.indexOf(this.archivo.type) != -1) {
      this.imgCodified = URL.createObjectURL(this.archivo);
      var doc = document.getElementById('imagendeperfil')
      doc.setAttribute('src', this.imgCodified)
    }
    else {
      seEncontraronElementoNoValidos = true;
    }
  };

  subirfoto() {
    this.service.subirfoto(this.token.usuario.idpersonal, this.archivo.name).subscribe(
      data => {
        this.service.subirImagen(this.archivo).then(
          url => {
            Swal.fire({
              icon: 'success',
              title: '',
              text: data.toString(),
            })
            this.get_datos_academicos();
            this.archivo = null;
          }
        );

      }
    )

  }
  eliminarfoto() {
    this.archivo = null;
    this.get_datos_academicos();
  }

}
