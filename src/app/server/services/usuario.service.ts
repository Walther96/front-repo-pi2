import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Perfil } from '../models/perfil';
import { Usuario } from '../models/usuario';
import { GenericoserviceService } from './genericoservice.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService extends GenericoserviceService{

    constructor(private http: HttpClient) {
        super();

     }
     findUser(username: string) {
        return this.http.get<any>(environment.apiurl + "usuario/v1/findByUser/"+username, this.options);
    }
    findAllRoles() {
        return this.http.get<any[]>(environment.apiurl + "rol/v1", this.options);
    }
    
    savePerfil(perfil: Perfil) {
        return this.http.post(environment.apiurl + "usuarios/perfiles", perfil);
    }

    saveUsuario(usuario: Usuario) {
        return this.http.post(environment.apiurl + "usuario/v1", usuario, this.options);
    }

    editarUsuario(id: number, usuario: Usuario) {
        return this.http.put(environment.apiurl + "usuario/v1/" + id , usuario, this.options);
    }
    EliminarUsuario(id: number) {
        return this.http.delete<any[]>(environment.apiurl + 'usuario/v1/' + id, this.options);
    }
    findAllUsuarios() {
        return this.http.get<any[]>(environment.apiurl + "usuario/v1", this.options);
    }

    /**
     * Obtiene el dato del LocalStorage
     */
    get(): Usuario {
        try {
            return JSON.parse(localStorage.getItem("usuario"));
        } catch (e) {
            console.error('Error getting data from localStorage', e);
            return null;
        }
    }

}