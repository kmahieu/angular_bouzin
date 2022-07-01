import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsAuthorizeGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // ici on vient implémenter une sécurité afin de dire que si le token est OK on va pouvoir acceder a certaine page de l'appli
      if(localStorage.getItem('user-token') == "true"){
        console.log("Authorized");
        return true;
      }else{
        console.log("Not Authorized");
        this.router.navigate(['/login'])
        return false;
      }
  }
}
