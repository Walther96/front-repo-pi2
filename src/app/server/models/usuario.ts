import { Perfil } from './perfil';
import { BasePartida } from './base-partida';

export class Usuario {
    id: number;
    usuario: string;
    dni: string;
    nombres: string;
    apellidos: string;

    perfil: Perfil;
    base: BasePartida;
}