import { Perfil } from './perfil';
import { BasePartida } from './base-partida';

export class Usuario {
    id: number;
    usuario: string;
    dni: string;
    nombre: string;
    apellido: string;
    email: string;
    clave: string;

    rol: Perfil;
}