import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private route:Router){}
  /**Guard que p´rotegera las tuas de angular y solo permitira aceder a estas si esta autenticado */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isAuthenticated()){
        if(this.istokenExpirado()){
          this.auth.logout();
          this.route.navigate(['/login']);
          return false;
        }
        return true;
    }
    this.route.navigate(['/login'])
    return false;
  }
  istokenExpirado():boolean{
    let token=this.auth.token;
    let payload= this.auth.obtenerdatostoken(token);
    let now = new Date().getTime()/1000;
    if(payload.exp < now){
      return true;
    }
    return false;
  }
  
}
