import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  user: User;
  private authenticationSub : Subscription;
  isAutheticated: boolean;
  username: string;
  role: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authenticationSub = this.authService.isAutheticated.subscribe(isLogin => this.isAutheticated = isLogin);
    this.userSub = this.authService.user.subscribe(user=> this.user = user);
  }

  logout(): void {
    this.authService.changeUserAuthentication(false);
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
