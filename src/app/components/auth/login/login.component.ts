import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {checkFormControlHasError} from '../../../shared/check-form-control-has-error';
import {environment} from '../../../../environments/environment';
import {User} from '../../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  loginForm: FormGroup;
  isProcessing?: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100)
      ])]
    });
  }

  onLogin(): void {
    this.isProcessing = true;
    this.authService.login(this.loginForm.value).pipe(
      finalize(() => {
        this.isProcessing = false;
      })
    ).subscribe((user: User) => {
      localStorage.setItem(environment.authTokenKey, user.token);
      this.router.navigate([`/app/dashboard`]);
    }, (errors: HttpErrorResponse) => {
      console.log('errors', errors);
    });
  }

  isControlHasError(controlName: string, validationType: string): any {
    return checkFormControlHasError(this.loginForm, controlName, validationType);
  }
}
