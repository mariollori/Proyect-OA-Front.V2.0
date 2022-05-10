import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
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
  
  rolactual;
  rolesactualesdeluser:Rol[]=[];
  rolesdisponibles:Rol[]=[];
  idusuarioactual;

  /**Loading */
  cargando=false;
  cargando_sol=false;
  cargando_activos=false;
  cargando_dis=false;


  opcionesactualesdelrol:Opciones[]=[];
  constructor(private rolserv:RolOpService,private userserv:UserService, private toast: NgToastService) { }
  
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

//* Variables para buscar por sede opcion;/
sede;
opcion;


sede2;
opcion2;
/**Variables para activar usuario */
usuarios_desactivados;
  
  cerrarrolactual(){
    this.rolactualdisp='';
    this.opciondisp='';
  }
  ngOnInit(){
    this.sede = 'UPeU Lima'
    this.opcion = 'estudiante'
    this.sede2 = 'UPeU Lima'
    this.opcion2 = 'estudiante'

  
    

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
  this.listarusuarios_desactivados();
    this.listarusuarios();
    this.get_solicitudes_por_sede();
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
 
  
  listarusuarios(){
  
    this.cargando_activos=true;
    this.rolserv.listarusuarios(this.opcion2,this.sede2).subscribe(
      (data)=>{
       this.cargando_activos=false;
        this.usuariosactivos=data;
      }
    )
  }
  listarusuarios_desactivados(){
   
    this.cargando_dis=true;
    this.rolserv.listarusuarios_desactivados().subscribe(
      (data)=>{
        this.cargando_dis=false;
        this.usuarios_desactivados=data;
      }
    )
  }
  getroles(){
    this.rolserv.getroles().subscribe(
      (data)=>{
                
                this.roles= data as Rol[];
      }
    )
  }

  getopciones(){
    this.rolserv.getopciones().subscribe(
      (data)=>{
                
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
 
   
      }
    )
  }


  
  getopcion(){
    this.cargando=true
    this.rolserv.getopcionid(this.opcionactual).subscribe(
      (data)=>{
        this.cargando=false
           
        this.opcionupd = data[0] as Opciones;
  
   
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
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'Rol eliminado.',
             
            }) 
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
    this.usuarioelement= element;
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
     this.userserv.getusers().subscribe(
      (data)=>{ 
       
         this.usuarios=data;
          this.cargando=false

          var usuarioname=element.nombre.replace(/ /g,'').toLowerCase();
          var passwordname=element.nombre.replace(/ /g,'').toLowerCase();
          var encontrado=0;
          var condicion=1;
          do {
            this.usuarios.find(
              user => {
                if ( usuarioname === user.username  ) {
                
                  encontrado = 1;
                  this.activo=false;
                  return true;
                } else {
                 
                  encontrado = 0;
                }
              }
            )
            var num=Math.floor(Math.random()*101);
            if(encontrado==1){
              usuarioname = usuarioname.concat(num.toString());
              this.usuario.username=usuarioname
             
              this.usuario.password=passwordname
              this.activo=true;
            }else{
             
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
    if(this.usuario.rol==null){
      this.toast.error({detail:"ERROR",summary:'Porfavor verifique los campos',duration:3000}); 
    }else{
      this.userserv.crearusuario(this.usuario.username,this.usuario.password,this.usuario.idpersonal,this.usuarioelement.correo,this.usuario.rol).subscribe(
        data=>{
          Swal.fire({
            icon: 'success',
            title: 'Registrado',
            text: 'Usuario creado con exito.',
           
          }
            
          );
          this.usuario=new Usuario();
          document.getElementById('crearuser').click();
          this.get_solicitudes_por_sede();
          this.listarusuarios();
        }
      )
    }

    
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
        this.userserv.eliminarsolicitud(element.idpersonal,element.idpersona,element.tipo).subscribe(
          data=>{
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Se elimino la solicitud.',
              'success'
            )
            this.get_solicitudes_por_sede()
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
  get_solicitudes_por_sede(){
  
    this.cargando_sol=true;
    this.rolserv.getpsicologos(this.opcion,this.sede).subscribe(
      (data)=>{
        this.cargando_sol= false;

           this.solicitudesdeusuario= data;

      }
    )
  }
  desactivar_usuario(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro de desactivar este usuario?',
     
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, desactivar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      
       this.userserv.desactivar_usuario(id).subscribe(
         data=>{
          Swal.fire({
            icon: 'success',
            title: 'Listo',
            text: 'Usuario desactivado con exito.',
          });
          this.listarusuarios_desactivados();
          this.listarusuarios();
         }
       )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se cancelo la desactivación',
          'error'
        )
      }
    })
  }
  activar_usuario(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro de activar a este usuario?',
     
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, activar !',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      
       this.rolserv.activar_user(id).subscribe(
         data=>{
          Swal.fire({
            icon: 'success',
            title: 'Listo',
            text: 'Usuario activado.',
          });
          
          this.listarusuarios();
          this.listarusuarios_desactivados();
         }
       )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se cancelo la desactivación',
          'error'
        )
      }
    })
  }
}



