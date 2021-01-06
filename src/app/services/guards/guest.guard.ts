import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class GuestGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    try {
      let data;
      data = localStorage.getItem(environment.authTokenKey);
      if (data && data !== 'null') {
        this.router.navigateByUrl('/app/dashboard');
        return false;
      }
    } catch (err) {
      return true;
    }
    return true;
  }
}
