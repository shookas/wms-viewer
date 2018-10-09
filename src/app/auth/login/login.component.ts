import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotifyService } from '../../core/notify.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface UserLoginInfo {
  unique: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('test@test.test', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ]),
    password: new FormControl('123', [
      Validators.required,
      Validators.minLength(3)
    ])
  });

  constructor(private authSerive: AuthService, private notify: NotifyService) {}

  ngOnInit() {}

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (username && password) {
      this.authSerive
        .login(username, password)
        .pipe(catchError(err => of(this.handleErrors(err))))
        .subscribe();
    }
  }

  private handleErrors(err) {
    switch (err.status) {
      case 422:
        const message = this.parseMessage(err.error.error);
        this.notify.showError(message);
        break;
      default:
        throw new HttpErrorResponse(err);
    }
  }

  private parseMessage(message: string): string {
    return message.includes('password')
      ? 'Nieprawidłowe hasło'
      : 'Błędny login';
  }
}
