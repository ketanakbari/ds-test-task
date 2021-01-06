import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set(
        'X-Token',
        `${localStorage.getItem(environment.authTokenKey)}`
      )
    });
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('err', err);
          if (err.status === 401 || err.status === 405) {
            localStorage.clear();
            this.router.navigate(['/auth/login']);
          }
          return throwError(err);
        })
      );
  }
}
