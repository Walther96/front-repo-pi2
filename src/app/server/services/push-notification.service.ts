import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PushMensaje } from '../models/push-mensaje';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private http: HttpClient) { }

  EnviarPush(data: PushMensaje){

    const httpOptions2 = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic NzAyZDIzNmQtMzc1NS00NTJkLTk2YWUtZTZjNjZmOWYyN2Q3'
      })
  };


    let api = "https://onesignal.com/api/v1/notifications";
    return this.http.post(api, data, httpOptions2).subscribe(new_data => {
      console.log(new_data)
  }, error => {
      console.log(error);
  });
      //return this.http.get(apiurl).pipe(map(  (res: Destino[])   => res))
      //.subscribe((r) => resolver(r), error => rechazar(error));

  }
}
