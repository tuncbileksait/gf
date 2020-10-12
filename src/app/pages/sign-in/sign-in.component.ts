import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/shared/models/user/user-info';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {

  @ViewChild('f') loginForm: NgForm;
  @ViewChild('f') forgettenPasswordForm: NgForm;
  @ViewChild('f') aprroveCodeForm: NgForm;

  isLoginMode: boolean = true;
  private authenticationSub : Subscription;
  isAutheticated: boolean;
  askingServer: boolean= false;
  errorMessage: string = null;
  isPasswordForgetten: boolean = false;
  approvePassword: boolean = false;
  userInfo: UserInfo = {email: null, password: null, remember_me:false};
  code: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authenticationSub = this.authService.isAutheticated.subscribe(isLogin => this.isAutheticated = isLogin);
    // if(this.isAutheticated) {
    //   this.router.navigate(['/home']);
    // }
  }

  loginSubmit (): void {
    if(!this.loginForm.valid) return;
    this.askingServer = true;
    const remember_me = this.loginForm.value.remember_me === true ? true : false;
    this.userInfo = {email: this.loginForm.value.email, password: this.loginForm.value.password, remember_me: remember_me};
    this.authService.login(this.userInfo).subscribe(
        isOk => {
          if(isOk){
            this.loginForm.reset();
            this.authService.changeUserAuthentication(true);
            this.router.navigate(['/home']);
          } else{
            this.errorMessage = "Service is unavailable. Please try again later."
          }
        },
        err => {
          console.log(err);
            this.errorMessage = err;
            this.loginForm.reset();
        }
    );
    this.askingServer = false;
  }

  forgettenPasswordSubmit(){
    console.log('forgettenPasswordSubmit' + this.forgettenPasswordForm.value);
    this.userInfo.email = this.forgettenPasswordForm.value.email;
    this.authService.getCode(this.userInfo.email).subscribe(code=> this.code = code);
    this.toggleForgettenPassword();
    this.approvePassword = true;
  }

  aprroveCodeSubmit(){
    console.log('aprroveCodeSubmit' + this.aprroveCodeForm.value)
    if(this.aprroveCodeForm.value.code == this.code){
      console.log("Open new password page and change it.")
    }
  }

  toggleForgettenPassword() {
    this.isPasswordForgetten = !this.isPasswordForgetten;
  }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }
}
