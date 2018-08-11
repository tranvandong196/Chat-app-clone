import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form;
  public formdata: any;
  public isSummited;
  public error = 'Please enter valid data in all fields';

  constructor(
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.checkAuth();
    this.formdata = {
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      isRemember: new FormControl(false)
    };
    this.form = new FormGroup(this.formdata);
  }

  checkAuth() {
    this.authenticationService.checkAuth()
      .subscribe(user => {
        console.log('User: ', user);
      });
  }

  onClickSubmit() {
    this.isSummited = true;
    console.log(this.form);
    if (this.formdata.status === 'VALID') {
      this.register();
    } else {
      if (this.formdata.confirmPassword.value !== this.formdata.password.value) {
        this.error = 'Password must match';
      } else {
        this.error = 'Please enter valid data in all fields';
      }
      console.log('Tài khoản hoặc mật khẩu không hợp lệ');
    }
  }

  register() {
    this.authenticationService.register(this.formdata.value)
      .subscribe(user => {
        console.log('User: ', user);
      });
  }


  OnClickSignInFacebook() {
    /* Facebook sign in from server use passport library */

    location.href = 'http://localhost:3000/users/auth/facebook';
  }

  onClickSignInGoogle() {
    /* Google sign in from server use passport library */

    location.href = 'http://localhost:3000/users/auth/google';
  }
}
