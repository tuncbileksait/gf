import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/shared/models/user/user-info';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  @ViewChild('f') registerForm: NgForm;

  private authenticationSub : Subscription;
  isAutheticated: boolean;
  askingServer: boolean= false;
  errorMessage: string = null;
  isRegistrationSuccessful = false;
  // code: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authenticationSub = this.authService.isAutheticated.subscribe(isLogin => this.isAutheticated = isLogin);
  }

  onRegistrationSubmit(): void {
    this.askingServer = true;
    console.log(this.registerForm.value)
    const userInfo: UserInfo = {email: this.registerForm.value.email, password: this.registerForm.value.password, remember_me: false};
    this.authService.register(userInfo).subscribe(
      isOk => {
        if (isOk){
          this.isRegistrationSuccessful = true;
          this.authService.changeUserAuthentication(true);
          // Basarili kayittan sonra islemin basarili oldugu ayni ekranda musteriye bildirilecek,
          // OK benzeri bir butonla route calisacak.
          this.router.navigate(['/home']);
        } else {
          this.registerForm.reset();
          this.errorMessage = 'Email adress is alread in use!';
        }
      },
      errRes => {
        this.errorMessage = errRes;
      }
    );
    this.askingServer = false;
  }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }
}
