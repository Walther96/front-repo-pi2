import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SalidaService {

    constructor(private http: HttpClient) { }
    Notificaciones(idrequerimiento: number) {
        return this.http.get<any[]>("http://104.248.60.94:4000/test/"+idrequerimiento);
    }
    findAllSalidas() {
        return this.http.get<any[]>(environment.apiurl + "reqsalida");
    }

    findPorAutorizar() {
        return this.http.get<any[]>(environment.apiurl + "reqsalida/porautorizar");
    }

    findPorFechaCreacion(desde: string, hasta: string) {
        return this.http.get<any[]>(environment.apiurl + "reqsalida/" + desde + "/" + hasta);
    }

    autorizar(id: number, usuario: string) {
        return this.http.get(environment.apiurl + "reqsalida/" + id + "/" + usuario + "/autorizar");
    }

    autoriza_comentarios(id: number, comentarios: string, usuario: string) {
        return this.http.get(environment.apiurl + "reqsalida/" + id + "/" + usuario + "/autorizar/" + comentarios);
    }

    denegar(id: number, usuario: string) {
        return this.http.get(environment.apiurl + "reqsalida/" + id + "/" + usuario + "/denegar");
    }

    denegar_comentarios(id: number, comentarios: string, usuario: string) {
        return this.http.get(environment.apiurl + "reqsalida/" + id + "/" + usuario + "/denegar/" + comentarios);
    }

}