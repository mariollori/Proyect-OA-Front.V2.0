import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

import { Opciones } from 'src/app/models/Opciones';
import { Rol } from 'src/app/models/Rol';
import { Usuario } from 'src/app/models/Usuario';
import { RolOpService } from 'src/app/services/rol-op.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
export interface UsuarioData {
  idusuario:number;
  nombre: string;
  username: string;
  apellido: string;
}
@Component({
  selector: 'app-gest-op',
  templateUrl: './gest-op.component.html',
  styleUrls: ['./gest-op.component.css']
})




export class GestOpComponent implements OnInit {
  usuario:Usuario=new Usuario();
  detalleelemetn:any;
  usuarioelement:any;
  activo=false;
datausuario:UsuarioData[]=[];
  usuarios:Usuario[]=[];
  datapsi:any[]=[];
  dataSource;
  dataSource2;
  rolactual;
  rolesactualesdeluser:Rol[]=[];
  rolesdisponibles:Rol[]=[];
  idusuarioactual;
cargando=false;
  
  opcionesactualesdelrol:Opciones[]=[];
  constructor(private rolserv:RolOpService,private userserv:UserService) { }
  // Variables para asignar opc a rol
  opcionesdisponibles:Opciones[]=[];
  opciondisp;
  // Variables para gestion rol
  roles :Rol[] = [];
  rolupd:Rol = new Rol();
  
  // Variables para gestion de opciones
  opciones:Opciones[]=[];
  opcionupd:Opciones = new Opciones();
  opcionactual;
  
 // Variables para asignar rol a usuario
 
  rolactualdisp;
  dtOptions: DataTables.Settings = {};
  usuariosactivos;
  solicitudesdeusuario;
  
  cerrarrolactual(){
    this.rolactualdisp='';
    this.opciondisp='';
  }
  ngOnInit(){
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "./assets/js/sidemenuop.js";
    let body = document.getElementsByTagName("body")[0];

    body.appendChild(s);

    this.dtOptions = {
      responsive:true,
      pagingType: 'full_numbers',
      pageLength: 5,
      language:{
        "decimal":        "",
        "emptyTable":     "No hay ningun registro existente..",
        "info":           "",
        "infoEmpty":      "",
        "infoFiltered":   "(Coincidencias de _MAX_  entradas)",
        "infoPostFix":    "",
        "thousands":      ",",
        "lengthMenu":     "Show _MENU_ entries",
        "loadingRecords": "Cargando...",
        "processing":     "Procesando...",
        "search":         "Buscar usuario:",
        "zeroRecords":    "Ningun resultado encontrado",
        "paginate": {
            "first":      "<i class='fas fa-step-backward'></i>",
            "last":       "<i class='fas fa-step-forward'></i>",
            "next":       "<i class='fas fa-chevron-right'></i>",
            "previous":   "<i class='fas fa-chevron-left'></i>"
        },
        "aria": {
            "sortAscending":  ": activate to sort column ascending",
            "sortDescending": ": activate to sort column descending"
        }
    },
      ordering:false,
      lengthChange:false,
      
      processing: false
    };
  
    this.listarusuarios();
    this.listarpsicologos();
    this.getroles();
    this.getopciones();
  }
  agregarrol_user(id){
    this.idusuarioactual=id;
    this.rolserv.getrolesdisponibles(id).subscribe(
      (data)=>{
        this.rolesdisponibles= data as Rol[];
      }
    );
  }
  listarpsicologos(){
    this.rolserv.getpsicologos().subscribe(
      (data)=>{
        console.log(data)

           this.solicitudesdeusuario= data;

      }
    )
  }

  listarusuarios(){
    this.rolserv.listarusuarios().subscribe(
      (data)=>{
        console.log(data)
        this.usuariosactivos=data;
      }
    )
  }
  getroles(){
    this.rolserv.getroles().subscribe(
      (data)=>{
                 console.log(data)
                this.roles= data as Rol[];
      }
    )
  }

  getopciones(){
    this.rolserv.getopciones().subscribe(
      (data)=>{
                 console.log(data)
                this.opciones= data as Opciones[];
      }
    )
  }

 eliminarrol(){
  Swal.fire({
    title: 'Esta seguro?',
    text: "No se puede deshacer una vez eliminado.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(this.rolactual)
      this.rolserv.eliminarrol(this.rolactual).subscribe(
        (data)=>{

          Swal.fire(
            'Eliminado',
            data,
            'success'
          )
          this.getroles();
            
        },(e)=>{
         
            Swal.fire(
              'Opss',
              'No se pudo eliminar',
              'error'
            )
          
          
        }
      )
    }
  })
   

 }

 eliminaropc(){
  Swal.fire({
    title: 'Esta seguro?',
    text: "No se puede deshacer una vez eliminado.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(this.rolactual)
      this.rolserv.eliminaropcion(this.opcionactual).subscribe(
        (data)=>{

          Swal.fire(
            'Eliminado',
            data,
            'success'
          )
          this.getopciones();
            
        },(e)=>{
         
            Swal.fire(
              'Opss',
              'No se pudo eliminar',
              'error'
            )
          
          
        }
      )
    }
  })
   

 }
  

  getrol(){
    this.rolserv.getrolid(this.rolactual).subscribe(
      (data)=>{
           
        this.rolupd = data[0] as Rol;
        console.log(this.rolupd)
   
      }
    )
  }


  
  getopcion(){
    this.cargando=true
    this.rolserv.getopcionid(this.opcionactual).subscribe(
      (data)=>{
        this.cargando=false
           
        this.opcionupd = data[0] as Opciones;
        console.log(this.opcionupd)
   
      }
    )
  }

  modificarRol(){
    this.rolserv.modificarrol(this.rolupd.idrol,this.rolupd.nombre).subscribe(
      (data)=>{
        
        Swal.fire(
          'Modificado',
          data.toString(),
          'success'

        )
        this.getroles();
        this.rolupd=new Rol();
      },(e)=>{
        Swal.fire(
          'Erro',
          'no se pudo modificar',
          'error'
        )
      }
    )
  }

  agregarrol(){
    this.rolserv.agregarrol(this.rolupd.nombre).subscribe(
      (data)=>{
        Swal.fire(
          'Registrado',
          data.toString(),
          'success'

        )
        this.getroles();
        this.rolupd=new Rol();
      },(e)=>{
        Swal.fire(
          'Erro',
          'no se pudo registrar',
          'error'
        )
      }
    )

  }

  modificarOpc(){
    this.rolserv.modificarop(this.opcionupd).subscribe(
      (data)=>{
        
        Swal.fire(
          'Modificado',
          data.toString(),
          'success'

        )
        this.getopciones();
        this.opcionupd=new Opciones();
      },(e)=>{
        Swal.fire(
          'Erro',
          'no se pudo modificar',
          'error'
        )
      }
    )
  }

  agregarOpc(){
    this.rolserv.agregaropc(this.opcionupd).subscribe(
      (data)=>{
        Swal.fire(
          'Registrado',
          data.toString(),
          'success'

        )
        this.getopciones();
        this.opcionupd=new Opciones();
      },(e)=>{
        Swal.fire(
          'Erro',
          'no se pudo registrar',
          'error'
        )
      }
    )

  }

  cerrarrol(){
    this.rolupd = new Rol();
  }
  cerraropc(){
    this.opcionupd = new Opciones();
  }



  getopcionesdisponibles(){
    this.rolserv.getopcionesdisponibles(this.rolactual).subscribe((data)=> this.opcionesdisponibles = data as Opciones[])
  }

  


 
  getopcionesrol(){
    this.cargando=true
    this.rolserv.getopcionesactuales(this.rolactual).subscribe(
      (data)=>{
        this.cargando=false
        this.opcionesactualesdelrol= data as Opciones[];
      }
    )

  }
  asignarol_usuario(){
    this.rolserv.agregaropc_rol(this.rolactual,this.opciondisp).subscribe(
      (data)=>{
        Swal.fire(
          'Agregado',
          data.toString(),
          'success'

        )
        this.getopciones();
        this.opciondisp='';
      }
    )
  }
  cerraropcionesactuales(){
    this.opcionesactualesdelrol=[];
  }

  eliminaropcion_rol(id){
    Swal.fire({
      title: 'Esta seguro?',
      text: "No se puede deshacer una vez eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.rolserv.deleteopcionrol(id).subscribe(
          (data)=>{
            Swal.fire(
              'Eliminado',
              data,
              'success'
            ) 
          },(e)=>{
           
              Swal.fire(
                'Opss',
                'No se pudo eliminar',
                'error'
              )
          }
        )
      }
    })
  }







  asignaropc_usuario(){
    this.rolserv.agregarrol_user(this.idusuarioactual,this.rolactualdisp).subscribe(
      (data)=>{
        Swal.fire(
          'Agregado',
          data.toString(),
          'success'

        )
        this.rolactualdisp='';
      }
    )

  }
listarrolesactuales(id){
    this.cargando=true
    this.rolserv.getrolesactuales(id).subscribe(
      (data)=>{
        this.cargando=false;
        console.log(data)
           this.rolesactualesdeluser= data as Rol[] ;
      }
    )
  }
  cerrardata(){
    this.rolesactualesdeluser=[];
  }






  eliminarrol_user(id){
    Swal.fire({
      title: 'Esta seguro?',
      text: "No se puede deshacer una vez eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
      
        this.rolserv.deleteroluser(id).subscribe(
          (data)=>{
            Swal.fire(
              'Eliminado',
              data,
              'success'
            ) 
          },(e)=>{
           
              Swal.fire(
                'Opss',
                'No se pudo eliminar',
                'error'
              )
          }
        )
      }
    })
  }



  detallepsi(element:any){
    this.detalleelemetn=element;

  }

  crearuser(element:any){
    this.cargando=true;
    this.usuarioelement= element
     this.userserv.getusers().subscribe(
      (data)=>{ 
        console.log(data)
         this.usuarios=data;
          this.cargando=false

          var usuarioname=element.nombre.replace(" ", "").toLowerCase();
          var passwordname=element.nombre.replace(" ", "").toLowerCase();
          var encontrado=0;
          var condicion=1;
          do {
            this.usuarios.find(
              user => {
                if ( usuarioname === user.username  ) {
                  console.log(true);
                  console.log(user.username);
                  encontrado = 1;
                  this.activo=false;
                  return true;
                } else {
                  console.log(usuarioname);
                  encontrado = 0;
                }
              }
            )
            var num=Math.floor(Math.random()*101);
            if(encontrado==1){
              usuarioname = usuarioname.concat(num.toString());
              this.usuario.username=usuarioname
             console.log(usuarioname)
              this.usuario.password=passwordname
              this.activo=true;
            }else{
              console.log(encontrado)
              console.log(this.usuarios)
              condicion = 0;
              this.activo=true;
              this.usuario.username=usuarioname
              this.usuario.password=passwordname
             
            }
          } while (condicion==1);
            
            this.usuario.idpersonal= element.idpersonal;
    }
    )
   
   
      
 
  }


  guardarusuario(){
    console.log(this.usuario, this.usuarioelement.correo)
    this.userserv.crearusuario(this.usuario.username,this.usuario.password,this.usuario.idpersonal,this.usuarioelement.correo).subscribe(
      data=>{
        Swal.fire(
          'Registrardo',
          data,
          'success'
        );
        document.getElementById('crearuser').click();
        this.listarpsicologos();
        this.listarusuarios();
      }
    )
  }

  rechazarsol(element){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta Seguro de eliminar la solicitud?',
     
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si,eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userserv.eliminarsolicitud(element.idpersonal,element.idpersona).subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Se elimino la solicitud.',
              'success'
            )
            this.listarpsicologos()
          }
        )
      
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se cancelo la peticion',
          'error'
        )
      }
    })
   
  }


}



