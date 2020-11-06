import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasePartida } from '../models/base-partida';
import { environment } from 'environments/environment';
import { Destino } from '../models/destino';
import { EmpresaResguardo } from '../models/empresa-resguardo';
import { Empleado } from '../models/empleado';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    constructor(private http: HttpClient) { }

    findAllBases() {
        return this.http.get<BasePartida[]>(environment.apiurl + "general/base");
    }

    findAllDestinos() {
        return this.http.get<BasePartida[]>(environment.apiurl + "general/destino");
    }
    findAllVehiculos() {
        return this.http.get<any[]>(environment.apiurl + "general/vehiculo");
    }
    findAllTipoVehiculos() {
        return this.http.get<any[]>(environment.apiurl + "general/tipovehiculo");
    }
    findAllResguardos() {
        return this.http.get<any[]>(environment.apiurl + "general/resguardo");
    }
    
    findAllEmpleados() {
        return this.http.get<any[]>(environment.apiurl + "general/empleado");
    }
    EliminarVehiculo(id: number) {
        return this.http.get<any[]>(environment.apiurl + "general/vehiculo/"+id+"/desactivar");
    }
    EliminarEmpleado(id: number) {
        return this.http.get<any[]>(environment.apiurl + "general/empleado/"+id+"/desactivar");
    }
    EliminarBase(id: number) {
        return this.http.get<any[]>(environment.apiurl + "general/base/"+id+"/desactivar");
    }
    EliminarDestino(id: number) {
        return this.http.get<any[]>(environment.apiurl + "general/destino/"+id+"/desactivar");
    }
    EliminarEmpresaResguardo(id: number) {
        return this.http.get<any[]>(environment.apiurl + "general/resguardo/"+id+"/desactivar");
    }
    saveEmpleado(empleado: Empleado) {
        return this.http.post<any>(environment.apiurl + "general/empleado", empleado);
    }
    editarEmpleado(empleado: Empleado) {
        return this.http.post<any>(environment.apiurl + "general/empleado/"+empleado.id, empleado);
    }
    saveBase(base: BasePartida) {
        return this.http.post<any>(environment.apiurl + "general/base", base);
    }

    editarBase(base: BasePartida) {
        return this.http.post<any>(environment.apiurl + "general/base/" + base.id, base);
    }

    saveDestino(destino: Destino) {
        return this.http.post<any>(environment.apiurl + "general/destino", destino);
    }
    saveVehiculo(vehiculo: Vehiculo) {
        return this.http.post<any>(environment.apiurl + "general/vehiculo", vehiculo);
    }
    editarVehiculo(vehiculo: Vehiculo) {
        return this.http.post<any>(environment.apiurl + "general/vehiculo/" + vehiculo.id, vehiculo);
    }
    editarDestino(destino: Destino) {
        return this.http.post<any>(environment.apiurl + "general/destino/" + destino.id, destino);
    }

    
    saveResguardo(resguardo: EmpresaResguardo) {
        return this.http.post<any>(environment.apiurl + "general/resguardo", resguardo);
    }

    editarResguardo(resguardo: EmpresaResguardo) {
        return this.http.post<any>(environment.apiurl + "general/resguardo/" + resguardo.id, resguardo);
    }

}