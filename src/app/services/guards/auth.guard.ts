import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    try {
      const data = localStorage.getItem(environment.authTokenKey);
      if ((data && data !== 'null')) {
        return true;
      }
    } catch (err) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    this.router.navigateByUrl('/auth/login');
    return false;
  }
}
