import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {FormLogin} from '../models/formLogin';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json', 'authentication': `${localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginApi = '/users/login';
  private registerApi = '/users/register';
  private authApi = '/users/auth/jwt';

  constructor(private http: HttpClient) {
  }

  public checkAuth() {
    const url = environment.API_URL + this.authApi;
    return this.http.get<any>(url, httpOptions)
      .pipe(
        tap(user => console.log('CHECK_AUTHENTICATION: ', 'Fulfilled')),
        catchError(this.handleError('CHECK_AUTHENTICATION', []))
      );
  }

  public login(formLogin: FormLogin): Observable<any> {
    const url = environment.API_URL + this.loginApi;
    return this.http.post<any>(url, formLogin, httpOptions)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.accessToken);
          console.log('LOGIN: ', 'Fulfilled');
        }),
        catchError(this.handleError('LOGIN', []))
      );
  }

  public register(formLogin: FormLogin): Observable<any> {
    const url = environment.API_URL + this.registerApi;
    return this.http.post<any>(url, formLogin, httpOptions)
      .pipe(
        tap(user => console.log('REGISTER: ', 'Fulfilled')),
        catchError(this.handleError('REGISTER', []))
      );
  }

  public getInfo(): Observable<any> {
    const url = environment.API_URL + '/users/info';
    return this.http.get<any>(url)
      .pipe(
        tap(info => console.log('GET_INFO: ', 'Fulfilled')),
        catchError(this.handleError('GET_INFO', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
