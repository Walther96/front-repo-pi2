import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasePartida } from '../models/base-partida';
import { environment } from 'environments/environment';
import { Destino } from '../models/destino';
import { Empleado } from '../models/empleado';
import { GenericoserviceService } from './genericoservice.service';
import { Infraccion } from '../models/Infraccion';

@Injectable({
    providedIn: 'root'
})
export class InfraccionService extends GenericoserviceService {

    constructor(private http: HttpClient) {
        super();
     }

     findAllInfracciones() {
        return this.http.get<any>(environment.apiurl + 'infraccion/v1', this.options);
    }
    saveInfraccion(infraccion: any) {
        return this.http.post<any>(environment.apiurl + 'infraccion/v1', infraccion, this.options);
    }
    EliminarInfraccion(id: number) {
        return this.http.delete<any[]>(environment.apiurl + 'infraccion/v1/' + id, this.options);
    }
    editarInfraccion(infraccion: Infraccion) {
        return this.http.put<any>(environment.apiurl + 'infraccion/v1/' + infraccion.id, infraccion, this.options);
    }
}