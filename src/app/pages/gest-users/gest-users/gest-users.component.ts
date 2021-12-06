import { core } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
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
  selector: 'app-gest-users',
  templateUrl: './gest-users.component.html',
  styleUrls: ['./gest-users.component.css']
})
export class GestUsersComponent implements OnInit {
  usuario:Usuario=new Usuario();
  detalleelemetn:any;
  usuarioelement:any;
  activo=false;


  rolactualdisp;
  @ViewChild('MatPaginator1', { static: true }) paginador: MatPaginator;
  @ViewChild('MatPaginator2', { static: true }) paginador2: MatPaginator;
  
  constructor(private rolserv:RolOpService, private userserv:UserService) { }
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = ['nro', 'usuario', 'nombres', 'opciones','opciones2'];
  displayedColumns2: string[] = ['nro', 'nombres', 'tipo', 'grupo','ciclo','opciones','opciones2','opciones3'];
  ngOnInit() {
    this.listarusuarios();
    this.listarpsicologos();
  }
  cerrarrolactual(){
    this.rolactualdisp='';
   
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
  listarusuarios(){
    this.rolserv.listarusuarios().subscribe(
      (data)=>{
        console.log(data)
           this.datausuario= data as UsuarioData[] ;
           this.dataSource=new MatTableDataSource(this.datausuario);
           this.dataSource.paginator= this.paginador;
      }
    )
  }
  listarpsicologos(){
    this.rolserv.getpsicologos().subscribe(
      (data)=>{
        console.log(data)

           this.datapsi= data as any[] ;
           this.dataSource2=new MatTableDataSource(this.datapsi);
           this.dataSource2.paginator= this.paginador2;

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




  agregarrol_user(id){
    this.idusuarioactual=id;
    this.rolserv.getrolesdisponibles(id).subscribe(
      (data)=>{
        this.rolesdisponibles= data as Rol[];
      }
    );
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
