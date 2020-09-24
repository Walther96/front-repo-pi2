import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public logueado = false;
  constructor(private http: HttpClient) { }

  logueo(data: Login): Promise<any>{
    return new Promise((resolver, rechazar) => {
    // tslint:disable-next-line: max-line-length
    return this.http.post(environment.apiurl + 'usuarios/validar', data).subscribe((r) => resolver(r),error => rechazar(error))
  });
}
}
