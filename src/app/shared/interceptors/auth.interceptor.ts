import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { exhaustMap, take } from 'rxjs/operators';

const TOKEN_KEY = 'authorization'; // index 0

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  // userSub: Subscription;
  // user: User;

  constructor(private authService: AuthService) {}

  // ngOnInit(): void {
  //   this.userSub = this.authService.user.subscribe(user=> this.user = user);
  // }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (req.url.startsWith('http://localhost:8080/login........')) {
          const modifiedReq = req.clone();
          modifiedReq.headers.append(TOKEN_KEY, user.authorization);
          return next.handle(modifiedReq);
          // Intercepterlar request gitmeden once son islemin yapildigi servis.
          // Burada token gerektiren islemler icin kullanilacak endpointi yaz (If icine)
          // Servisten gonderilecek uygun url li requestler otomatik olarak TOKEN eklenmis olacak.
          // Birden fazla intercept te yapilabilir.
        } else {
          return next.handle(req);
        }
      })
    );
  }

  // ngOnDestroy(): void {
  //   this.userSub.unsubscribe();
  // }
}
