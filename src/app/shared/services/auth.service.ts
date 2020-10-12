import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user/user';
import { UserInfo } from '../models/user/user-info';

const AUTH_API = 'http://localhost:8080/';
const TOKEN_KEY = 'authorization'; // index 0
const USER_EMAIL_KEY = 'email'; // index 2
const USER_NAME_KEY = 'name'; // index 4
const USER_ROLE_KEY = 'role'; // index 6
const USER_SURNAME_KEY = 'surname'; // index 7
const TOKEN_EXPIRATION_TIME = 'tokenExpirationDate';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSource = new BehaviorSubject<User>({
    authorization : null,
    email: null,
    name: null,
    surname: null,
    role: null,
    tokenExpirationDate: null});
  user = this.userSource.asObservable();

  private authenticationSource = new BehaviorSubject<boolean>(false);
  isAutheticated = this.authenticationSource.asObservable();

  constructor(private http: HttpClient) { }

  changeUserAuthentication(isAuthenticated: boolean){
    this.authenticationSource.next(isAuthenticated);
  }

  changeUserDetail(user: User){
    this.userSource.next(user);
  }

  login(userInfo: { email: string; password: string; remember_me: boolean; }): Observable<boolean> {
    return this.http.post(AUTH_API + 'login', {
      username: userInfo.email,
      password: userInfo.password
    }, {
		  headers: new HttpHeaders({'remember_me': userInfo.remember_me.toString()}),
		  observe: 'response'
    })
    .pipe(
      tap(response=>{
        if(userInfo.remember_me){
          this.saveUserInfoInStorage(response.headers, window.localStorage);
        } else {
          this.saveUserInfoInStorage(response.headers, window.sessionStorage);
        }
      }),
      map(response => {
        if(response.headers.get(TOKEN_KEY)) {
          return true;
        }else {
          return false;
        };
      }),
      catchError(errorRes => {
        let erorMessage = "An error occured"
        if(errorRes.error.message == 'Unauthorized'){
          erorMessage = "Email or password is incorrect!"
        }
        if(errorRes.error.composed == false){
          erorMessage = "Service is unavailable. Please try again later."
        }
        return throwError(erorMessage);
      })
    )
  }

  register(userInfo: UserInfo): Observable<boolean> {
    return this.http.post<{jwt : string}>(AUTH_API + 'singin/registerUser', {
      email: userInfo.email,
      password: userInfo.password
    }, {observe: 'body', responseType: 'json'})
    .pipe(
      tap(response=>{
        if (response.jwt.length > 10){
          this.saveUserInfoInStorageOnRegistration(response.jwt, userInfo.email);
        }
      }),
      map(response => {
        if(response.jwt.length > 10) {
          return true;
        }else {
          return false;
        };
      }), // True false
      catchError(errorRes => {
        let erorMessage = "An error occured. Please try again later."
        if(errorRes.error.composed == false){
          erorMessage = "Service is unavailable. Please try again later."
        }
        return throwError(erorMessage);
      }))
  }

  getCode(email: string) {
    console.log(AUTH_API + 'singin/sendCode/' + email);
    return this.http.get(AUTH_API + 'singin/sendCode/' + email,
    { responseType : 'text'});
  }

  saveUserInfoInStorage(headers: any, storage: Storage) {
    storage.setItem(TOKEN_KEY, headers.get(TOKEN_KEY));
    storage.setItem(USER_EMAIL_KEY, headers.get(USER_EMAIL_KEY));
    storage.setItem(USER_NAME_KEY, headers.get(USER_NAME_KEY));
    storage.setItem(USER_SURNAME_KEY, headers.get(USER_SURNAME_KEY));
    storage.setItem(USER_ROLE_KEY, headers.get(USER_ROLE_KEY));
    storage.setItem(TOKEN_EXPIRATION_TIME, new Date().getTime().toString())
  }

  saveUserInfoInStorageOnRegistration(token:string, email:string) {
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(USER_EMAIL_KEY, email);
  }

  signOut(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
  }

  setUser(): void {
    let storage: Storage;
    if(window.localStorage.getItem(TOKEN_KEY)){
      storage = window.localStorage;
    } else if (window.sessionStorage.getItem(TOKEN_KEY)){
      storage = window.sessionStorage;
    }

    if(storage){
      if(new Date().getTime() - (+storage.getItem(TOKEN_EXPIRATION_TIME)) > 86400000 * 60){
        storage.clear();
      } else {
        const user: User = {
          authorization : storage.getItem(TOKEN_KEY),
          email: storage.getItem(USER_EMAIL_KEY),
          name: storage.getItem(USER_NAME_KEY),
          surname: storage.getItem(USER_SURNAME_KEY),
          role: storage.getItem(USER_ROLE_KEY),
          tokenExpirationDate: storage.getItem(TOKEN_EXPIRATION_TIME)
        };
        this.changeUserDetail(user);
        this.changeUserAuthentication(true);
      }
    }
  }
}
