import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

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

  constructor(private authSerive: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (username && password) {
      this.authSerive.login(username, password).subscribe(res => {
        console.log(this.authSerive.isLoggedIn());
      });
    }
  }
}
