import { GrupoInspectoresDetalle } from "./grupo-inspectores-detalle";

export class GrupoInspector {
    id: number;
    codigo: string;
    distrito: string;
    zona: string;
    turno: string;
    estado: string;
    detalleGrupoInspectores: GrupoInspectoresDetalle[];

}