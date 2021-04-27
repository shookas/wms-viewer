import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { NotifyService } from '../../core/notify.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

export interface UserLoginInfo {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  constructor(
    private authSerive: AuthService,
    private notify: NotifyService,
    private router: Router
  ) { }

  ngOnInit() { }

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (username && password) {
      this.authSerive
        .login(username, password)
        .pipe(catchError(err => {
          this.handleErrors(err);
          return of()
        }))
        .subscribe(() => {
          this.router.navigate(['projects']);
          this.loginForm.reset();
        });
    }
  }

  private handleErrors(err) {
    switch (err.status) {
      case 403:
        this.notify.showError('Nieprawidłowy login lub hasło');
        break;
      default:
        throw new HttpErrorResponse(err);
    }
  }
}
