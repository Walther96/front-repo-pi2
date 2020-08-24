import { Perfil } from './perfil';

export class Usuario {
    id: number;
    usuario: string;
    dni: string;
    nombres: string;
    apellidos: string;

    perfil: Perfil;
}