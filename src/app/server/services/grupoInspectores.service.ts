import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { GenericoserviceService } from './genericoservice.service';
import { Infraccion } from '../models/Infraccion';
import { GrupoInspector } from '../models/grupo-inspectores';

@Injectable({
    providedIn: 'root'
})
export class GrupoInspectoresService extends GenericoserviceService {

    constructor(private http: HttpClient) {
        super();
     }

     findAllGruposInspectores() {
        return this.http.get<any>(environment.apiurl + 'grupoinspectores/v1', this.options);
    }
    saveGrupoInspector(grupoInspector: any) {
        return this.http.post<any>(environment.apiurl + 'grupoinspectores/v1', grupoInspector, this.options);
    }
    EliminarGrupoInspector(id: number) {
        return this.http.delete<any[]>(environment.apiurl + 'grupoinspectores/v1/' + id, this.options);
    }
    editarGrupoInspector(grupoInspector: GrupoInspector) {
        return this.http.put<any>(environment.apiurl + 'grupoinspectores/v1/' + grupoInspector.id, grupoInspector, this.options);
    }
}