import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CambioRutaService {

  constructor(private http: HttpClient) { }

  getUnidades() {
    return this.http.get<any>("http://104.248.60.94:3080/unidades");
}

cambiarRuta(idplaca: number, idruta: number){
  return this.http.post<any>("http://104.248.60.94:3080/cambioruta", { "idunidad":idplaca,
  "idruta":idruta});

}
}
