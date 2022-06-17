import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Horario_psicologo } from 'src/app/models/Horario_psicologo';
import { Persona } from 'src/app/models/Persona';
import { Personal_ayuda } from 'src/app/models/Personal';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { RegDatoPsicologoService } from 'src/app/services/reg-dato-psicologo.service';
import Swal from 'sweetalert2';
import { data } from 'jquery';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-datos-user',
  templateUrl: './datos-user.component.html',
  styleUrls: ['./datos-user.component.css']
})
export class DatosUserComponent implements OnInit {
  editstate = false;
  editstate2 = false;

  cargando=false;
message;

  constructor(private service: RegDatoPsicologoService, private token: AuthService, private imagenserv: ImagenService,private excelserv:ExcelService) { }

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
   qtoaño:any[];

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
    this.get_horarios();
    // this.get_5toaño()

  }
// get_5toaño(){
//   this.service.get_5toaño().subscribe(x=>{
//     this.qtoaño= x as any[];
//   })
// }
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
    var doc = document.getElementById('imagendeperfil')
    doc.setAttribute('src', 'assets/load.gif');
    this.service.getdataschool(this.token.usuario.idpersonal).subscribe(
      data => {
       
        this.tipo = data[0].tipo;
        this.personal = data[0];

        if (!data[0].foto) {
          this.imagenserv.nombre = 'assets/no_photo.jpg';
          doc.setAttribute('src', 'assets/no_photo.jpg')
          localStorage.setItem('imagen', 'assets/no_photo.jpg')
        } else {
          this.service.mostrarimagenfirebase(data[0].foto).subscribe(
            data => {
              this.imagenserv.nombre = data;
              localStorage.setItem('imagen', data)
              doc.setAttribute('src', data)
            },(e)=>{
              this.imagenserv.nombre = 'assets/no_photo.jpg';
              doc.setAttribute('src', 'assets/no_photo.jpg')
              localStorage.setItem('imagen', 'assets/no_photo.jpg')
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
      },(e)=>{
           
        Swal.fire({
          icon:'error',
          title: 'Opss..',  
          text: e.error.toString(),
        })
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
    this.cargando=true;
    this.message = 'Actualizando foto... , Espere un momento...'
    const myId = uuidv4();
    var name_foto:string = myId + ' ' + this.archivo.name;
    this.service.subirfoto(this.token.usuario.idpersonal, name_foto).subscribe(
      data => {
        
        if(!data[0].foto){
          this.service.subirImagen(name_foto,this.archivo).then(
            url => {
              Swal.fire({
                icon: 'success',
                title: 'Foto modificada.',
                text: 'Se guardó la imagen de perfil con exito.',
              })
              this.get_datos_academicos();
              this.archivo = null;
              this.cargando = false;
            }
          );
        }else{
          this.service.subirImagen_delete(name_foto,this.archivo,data[0].foto).then(
            url => {
              Swal.fire({
                icon: 'success',
                title: 'Foto modificada.',
                text: 'Se guardo la imagen de perfil con exito.',
              })
              this.get_datos_academicos();
              this.cargando=false;
              this.archivo=null;
                        }
          );
        }
        

      }
    )

  }
  eliminarfoto() {
    this.archivo = null;
    this.get_datos_academicos();
  }


  // exportexcel(): void
  // {
  //   var columns;
  //   var dataForExcel = [];
  //   var i =0;
  

  //     columns=["Nro.","Nombres completo","Correo electrónico","Sede","Sexo","Ciclo","Grupo","Codigo","Nro Pacientes"];
  //     this.qtoaño.forEach((row: any) => {
  //       i++;
  //      dataForExcel.push(Object.values([i,row.nombre + ' '+ row.apellido,row.correo,row.sede,row.genero,row.ciclo,row.grupo,row.codigo,row.nro_pacientes]))
  //     })
    
   
  //   let reportData = {
  //     title: `Registro de Estudiantes de 5to Año`,
  //     data: dataForExcel,
  //     headers: columns,
  //   }

  //   this.excelserv.exportExcel(reportData);
  // }
}
