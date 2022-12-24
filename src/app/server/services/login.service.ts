import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Login } from '../models/login';
import { GenericoserviceService } from './genericoservice.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends GenericoserviceService {
  public logueado = false;
  constructor(private http: HttpClient) {
    super();

   }

  public login(login: Login): any {
    const body = JSON.stringify(login);
    console.log(body);
    this.options.params = new HttpParams();
    return this.http.post(environment.apiurl + 'login', body, {observe: 'response'})
    .pipe(map(res => {

      const token = res.headers.get('authorization');
      console.log('authorization token -> ' + token);

      sessionStorage.setItem('token', token);

      return res;
    }));
  }
}

