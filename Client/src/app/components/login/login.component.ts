import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {SocketService} from '../../services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username;
  public password;
  public isRemember;
  public formdata;
  public isSummited;
  public error = 'Tài khoản hoặc mật khẩu không hợp lệ';

  constructor(
    private authenticationService: AuthenticationService,
    private socketService: SocketService
  ) {

  }

  ngOnInit() {
    // this.checkAuth();
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.isRemember = new FormControl(false);

    this.formdata = new FormGroup({
      username: this.username,
      password: this.password,
      isRemember: this.isRemember
    });
  }

  checkAuth() {
    this.authenticationService.checkAuth()
      .subscribe(user => {
        console.log('User: ', user);
      });
  }

  onClickSubmit() {
    this.isSummited = true;
    if (this.formdata.status === 'VALID') {
      this.login();
    } else {
      console.log('Tài khoản hoặc mật khẩu không hợp lệ');
    }
  }

  login() {
    this.authenticationService.login(this.formdata.value)
      .subscribe(user => {
        console.log('User: ', user);
      });
  }

  register() {
    this.authenticationService.register(this.formdata.value)
      .subscribe(user => {
        console.log('User: ', user);
      });
  }

  getInfo() {
    this.authenticationService.getInfo()
      .subscribe(info => {
        console.log('Info: ', info);
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
