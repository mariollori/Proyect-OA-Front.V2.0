import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor(private aurh:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let role = route.data['roles'] as Array<string>;
    if(this.aurh.hasRoles(role)){
      return true;
    }else if(this.aurh.isAuthenticated()){
      this.router.navigate(['/nav/perfil_user']);
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Usted no tiene acceso a esta opcion!',
      });
      return false;
    }else{
      this.router.navigate(['/home']);
      return false;
    }
  


  }
  
}
