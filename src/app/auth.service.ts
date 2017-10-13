import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class AuthService {
  message: String;
  userId: String;
  login(userId: string, password: string) {
    this.message = '正在登录';
    this.userId = userId;
    const params = new URLSearchParams();
    params.append('username', userId);
    params.append('password', password);
    params.append('grant_type', 'password');
    params.append('client_id', 'clientId');
    params.append('scope', 'openid');
    const headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa('clientId:clientSecret')
    });
    const options = new RequestOptions({ headers: headers });
    //    console.log(params.toString());
    //    console.log('Basic ' + btoa('clientId:clientSecret'));
    this._http.post('http://localhost:8080/oauth/token',
      params.toString(), options)
      .map(res => res.json()).subscribe(
      data => { this.saveToken(data); this.message = ''; },
      err => {
        this.message = '登陆失败:' + err; setTimeout(function () {
          this.message = '';
        }.bind(this), 2500);
      });
  }
  saveToken(token) {
    console.log('token saved ' + token.access_token);
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
  }
  logout(): any {
    const headers = new Headers({
      'Content-type': 'application/json; charset=utf-8',
      'Authorization': 'bearer ' + Cookie.get('access_token')
    });
    const options = new RequestOptions({ headers: headers });
    //   this._http.post('http://localhost:8080/logout?access_token=' + Cookie.get('access_token'), null)
    this._http.post('http://localhost:8080/logout', null,
      options)
      .subscribe(
      data => { console.log('Logout!'); },
      err => console.log('Logout failed' + err));

    Cookie.delete('access_token');
    console.log('Log out');

  }
  getResource<T>(resourceUrl): Observable<T> {
    const headers = new Headers({
      'Content-type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + Cookie.get('access_token')
    });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(resourceUrl, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  postResource<T>(resourceUrl, body: T): Observable<Response> {
    const headers = new Headers({
      'Content-type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + Cookie.get('access_token')
    });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(resourceUrl, JSON.stringify(body), options);

    //    return this._http.post(resourceUrl, JSON.stringify(body), options)
//      .map((res: Response) => res.json())
//      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getUser(): String {
    return localStorage.getItem('user');
  }
  getSchool(): String {
    return localStorage.getItem('school');
  }
  getDiscipline(): String {
    return localStorage.getItem('discipline');
  }

  isLoggedIn(): boolean {
    //    console.log(Cookie.get('access_token').length !== 0);
    return Cookie.check('access_token');
  }
  constructor(
    private _http: Http) {
    this.message = '';
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
