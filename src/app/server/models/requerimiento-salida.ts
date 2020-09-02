import { BasePartida } from './base-partida';
import { Empleado } from './empleado';
import { Destino } from './destino';
import { EmpresaTransporte } from './empresa-transporte';
import { EmpresaResguardo } from './empresa-resguardo';

export class RequerimientoSalida {
    id: number;
    basepartida: BasePartida;
    placa: string;
    hojaruta: string;
    conductor: Empleado;
    auxiliar1: Empleado;
    auxiliar2: Empleado;
    destino: Destino;
    cantidadbultos: number;
    empresatransporte: EmpresaTransporte;
    empresaresguardo: EmpresaResguardo;
    nombreresguardocabina: string;
    nombreresguardoescolta: string;
    nombreresguardocopiloto: string;
    comentarios: string;

    dniconductor: string;
    dniauxiliar1: string;
    dniauxiliar2: string;

    rucempresaresguardo: string;
}