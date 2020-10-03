import { PushMensajeDetalle } from './push-mensaje-detalle';
export class  PushMensaje {
    app_id: string;
    included_segments: string[];
    contents: PushMensajeDetalle;
    headings: PushMensajeDetalle;
    isAnyWeb: boolean;
    isAndroid: boolean;
}
