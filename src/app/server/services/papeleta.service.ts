import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { GenericoserviceService } from './genericoservice.service';
import { Infraccion } from '../models/Infraccion';
import { Papeleta } from '../models/papeleta';

@Injectable({
    providedIn: 'root'
})
export class PapeletaService extends GenericoserviceService {

    constructor(private http: HttpClient) {
        super();
     }

     findAllPapeletas() {
        return this.http.get<any>(environment.apiurl + 'papeleta/v1', this.options);
    }
    findAllPapeletasXFecha(desde: string, hasta: string) {
        return this.http.get<any>(environment.apiurl + 'papeleta/v1/' + desde + '/' + hasta, this.options);
    }
    savePapeleta(papeletaRequest: any) {
        return this.http.post<any>(environment.apiurl + 'papeleta/v1', papeletaRequest, this.options);
    }
    EliminarPapeleta(id: number) {
        return this.http.delete<any[]>(environment.apiurl + 'papeleta/v1/' + id, this.options);
    }
    editarPapeleta(papeleta: Papeleta) {
        return this.http.put<any>(environment.apiurl + 'papeleta/v1/' + papeleta.id, papeleta, this.options);
    }
}