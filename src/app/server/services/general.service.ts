import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasePartida } from '../models/base-partida';
import { environment } from 'environments/environment';
import { Destino } from '../models/destino';
import { Empleado } from '../models/empleado';
import { Vehiculo } from '../models/vehiculo';
import { GenericoserviceService } from './genericoservice.service';

@Injectable({
    providedIn: 'root'
})
export class GeneralService extends GenericoserviceService {

    constructor(private http: HttpClient) {
        super();
     }

    findAllBases() {
        return this.http.get<any>(environment.apiurl + "origen/v1",this.options);
    }

    findAllDestinos() {
        return this.http.get<any>(environment.apiurl + "destino/v1",this.options);
    }
    findRuta(ruta: any){
        return this.http.get<any>(environment.apiurl + "ruta/v1/nombreruta/"+ruta,this.options);

    }

    findAllTipoDocumento(){
        return this.http.get<any>(environment.apiurl + "tipodocumento/v1",this.options);

    }
    saveRuta(ruta: any) {
        return this.http.post<any>(environment.apiurl + "ruta/v1", ruta,this.options);
    }
    findAllRutas(){
        return this.http.get<any>(environment.apiurl + "ruta/v1",this.options);

    }




    findAllVehiculos() {
        return this.http.get<any[]>(environment.apiurl + "vehiculo/v1",this.options);
    }
   
    findAllTipoVehiculos() {
        return this.http.get<any>(environment.apiurl + "tipovehiculo/v1",this.options);
    }
    findAllEmpleadosLibres() {
        return this.http.get<any>(environment.apiurl + "empleado/v1/empleadoslibres",this.options);
    }
    
    findAllEmpleados() {
        return this.http.get<any>(environment.apiurl + "empleado/v1",this.options);
    }
    EliminarVehiculo(id: number) {
        return this.http.delete<any>(environment.apiurl + "vehiculo/v1/"+id,this.options);
    }
 
    EliminarEmpleado(id: number) {
        return this.http.delete<any>(environment.apiurl + "empleado/v1/"+id,this.options);
    }
    EliminarBase(id: number) {
        return this.http.delete<any[]>(environment.apiurl + "origen/v1/"+id,this.options);
    }
    EliminarDestino(id: number) {
        return this.http.delete<any[]>(environment.apiurl + "destino/v1/"+id,this.options);
    }
   
    saveEmpleado(empleado: Empleado) {
        return this.http.post<any>(environment.apiurl + "empleado/v1", empleado,this.options);
    }
    editarEmpleado(empleado: Empleado) {
        return this.http.put<any>(environment.apiurl + "empleado/v1/"+empleado.id, empleado,this.options);
    }
    saveBase(base: BasePartida) {
        return this.http.post<any>(environment.apiurl + "origen/v1", base,this.options);
    }

    editarBase(base: BasePartida) {
        return this.http.put<any>(environment.apiurl + "origen/v1/" + base.id, base,this.options);
    }

    saveDestino(destino: Destino) {
        return this.http.post<any>(environment.apiurl + "destino/v1/", destino,this.options);
    }
    saveVehiculo(vehiculo: Vehiculo) {
        return this.http.post<any>(environment.apiurl + "vehiculo/v1", vehiculo,this.options);
    }
  
    editarVehiculo(vehiculo: Vehiculo) {
        return this.http.put<any>(environment.apiurl + "vehiculo/v1/" + vehiculo.id, vehiculo,this.options);
    }
    editarDestino(destino: Destino) {
        return this.http.put<any>(environment.apiurl + "destino/v1/" + destino.id, destino,this.options);
    }

    
}