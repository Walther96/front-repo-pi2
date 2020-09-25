import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Perfil } from '../models/perfil';
import { Usuario } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(private http: HttpClient) { }

    findAllPerfiles() {
        return this.http.get<Perfil[]>(environment.apiurl + "usuarios/perfiles");
    }

    savePerfil(perfil: Perfil) {
        return this.http.post(environment.apiurl + "usuarios/perfiles", perfil);
    }

    saveUsuario(usuario: Usuario) {
        return this.http.post(environment.apiurl + "usuarios/registrar", usuario);
    }

    updateUsuario(id: number, usuario: Usuario) {
        return this.http.post(environment.apiurl + "usuarios/" + id + "/actualizar", usuario);
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