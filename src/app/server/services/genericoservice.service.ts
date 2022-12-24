import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericoserviceService {
  protected options = {
    headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('authorization', sessionStorage.getItem('token')),
        //.set('authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2NzA3MjYxNjIsImlzcyI6Imh0dHA6Ly93d3cucHJveWVjdG8uZWR1LnBlLyIsInN1YiI6ImFkbWluIiwiZXhwIjoxNjcwODEyNTYyfQ.eyTGe6YgdAtVDqCq5Niz06ZKfnVbg1d7WNPz4F8yuvpOiMD7wakSFkg-MFjqlej1S_qPEGF1iBmUVPVx96ykFw'),
    params: new HttpParams()
  };


  constructor() {

   }
}
