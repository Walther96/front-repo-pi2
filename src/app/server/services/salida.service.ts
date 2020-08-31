import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SalidaService {

    constructor(private http: HttpClient) { }

    findAllSalidas() {
        return this.http.get<any[]>(environment.apiurl + "reqsalida");
    }

    findPorAutorizar() {
        return this.http.get<any[]>(environment.apiurl + "reqsalida/porautorizar");
    }

    autorizar(id: number) {
        return this.http.put(environment.apiurl + "reqsalida/" + id + "/autorizar", null);
    }

}