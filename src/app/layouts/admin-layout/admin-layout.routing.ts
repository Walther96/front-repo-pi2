import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { UsuarioPerfilComponent } from 'app/pages/signia/usuario-perfil/usuario-perfil.component';
import { RequerimientoSalidaComponent } from 'app/pages/signia/requerimiento-salida/requerimiento-salida.component';
import { HistoricoSalidasComponent } from 'app/pages/signia/historico-salidas/historico-salidas.component';
import { MantBaseComponent } from 'app/pages/signia/mant-base/mant-base.component';
import { MantDestinoComponent } from 'app/pages/signia/mant-destino/mant-destino.component';
import { MantResguardoComponent } from 'app/pages/signia/mant-resguardo/mant-resguardo.component';
import { MantEmpleadoComponent } from '../../pages/signia/mant-empleado/mant-empleado.component';
import { CambiorutaComponent } from '../../pages/signia/cambioruta/cambioruta.component';
import { MantVehiculoComponent } from '../../pages/signia/mant-vehiculo/mant-vehiculo.component';
import { MantClienteComponent } from '../../pages/signia/mant-cliente/mant-cliente.component';




export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'usuarioperfil', component: UsuarioPerfilComponent },
    { path: 'requerimientosalida', component: RequerimientoSalidaComponent },
    { path: 'historicosalidas', component: HistoricoSalidasComponent },
    { path: 'mantbase', component: MantBaseComponent },
    { path: 'mantdestino', component: MantDestinoComponent },
    { path: 'mantresguardo', component: MantResguardoComponent },
    { path: 'mantempleado', component: MantEmpleadoComponent },
    { path: 'cambioruta', component: CambiorutaComponent },
    { path: 'mantvehiculo', component: MantVehiculoComponent },
    { path: 'mantcliente', component: MantClienteComponent }





];
