import { BasePartida } from './base-partida';
import { Destino } from './destino';
import { GrupoInspector } from './grupo-inspectores';
export class Ruta {
    estado: string;
    id: 1;
    nombreruta: string;
    origen: BasePartida;
    destino: Destino;
    grupoInspectores: GrupoInspector;
}
