import { Infraccion } from './Infraccion';
import { Vehiculo } from './vehiculo';

export class Papeleta {
    id: number;
    camara: string;
    descripcion: string;
    infraccion: Infraccion;
    vehiculo: Vehiculo;
    fecha: Date;
    estado: string;
}