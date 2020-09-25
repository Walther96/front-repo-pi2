import { OpcionesMenu } from './opciones-menu';
import { Usuario } from './usuario';

export class Perfil {
    id: number;
    nombre: string;

    usuarios: Usuario[];
    opcionesmenu: OpcionesMenu[];

}