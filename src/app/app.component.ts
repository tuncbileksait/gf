import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { DatabaseHandlerService } from './shared/services/database-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GreeceFerries';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.setUser();
  }

  isBooking: boolean= false;

}
