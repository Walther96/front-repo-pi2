import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { MantBaseComponent } from 'app/pages/signia/mant-base/mant-base.component';
import { MantDestinoComponent } from 'app/pages/signia/mant-destino/mant-destino.component';
import { MantEmpleadoComponent } from '../../pages/signia/mant-empleado/mant-empleado.component';
import { MantVehiculoComponent } from '../../pages/signia/mant-vehiculo/mant-vehiculo.component';
import { RutaComponent } from '../../pages/signia/ruta/ruta.component';
import { BuscarRutaComponent } from '../../pages/signia/buscar-ruta/buscar-ruta.component';
import { InfraccionesComponent } from 'app/pages/signia/infracciones/infracciones.component';
import { PapeletaComponent } from 'app/pages/signia/papeleta/papeleta.component';
import { GrupoInspectoresComponent } from 'app/pages/signia/grupo-inspectores/grupo-inspectores.component';
import { ReportePapeletasComponent } from 'app/pages/signia/reporte-papeletas/reporte-papeletas.component';
import { MantUsuarioComponent } from 'app/pages/signia/mant-usuario/mant-usuario.component';




export const AdminLayoutRoutes: Routes = [
   
    { path: 'ruta', component: RutaComponent },
    { path: 'buscaruta', component: BuscarRutaComponent },
    { path: 'mant-base', component: MantBaseComponent },
    { path: 'mant-destino', component: MantDestinoComponent },
    { path: 'mant-empleado', component: MantEmpleadoComponent },
    { path: 'mant-vehiculo', component: MantVehiculoComponent },
    { path: 'mant-infracciones', component: InfraccionesComponent },
    { path: 'mant-papeleta', component: PapeletaComponent },
    { path: 'mant-grupo-inspectores', component: GrupoInspectoresComponent },
    { path: 'reporte-papeleta', component: ReportePapeletasComponent },
    { path: 'mant-usuario', component: MantUsuarioComponent }




    




];
