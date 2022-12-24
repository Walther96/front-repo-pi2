import { Tipodocumento } from "./tipodocumento";

export class Empleado {
    id: number;
    documento: string;
    nombres: string;
    apellidos: string;
    telefono: string;

    tipodocumento: Tipodocumento;
}