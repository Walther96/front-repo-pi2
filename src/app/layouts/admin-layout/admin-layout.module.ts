import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MantEmpleadoComponent } from '../../pages/signia/mant-empleado/mant-empleado.component';
import { RutaComponent } from '../../pages/signia/ruta/ruta.component';
import { BuscarRutaComponent } from '../../pages/signia/buscar-ruta/buscar-ruta.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MantBaseComponent } from 'app/pages/signia/mant-base/mant-base.component';
import { MantDestinoComponent } from 'app/pages/signia/mant-destino/mant-destino.component';
import { MantVehiculoComponent } from 'app/pages/signia/mant-vehiculo/mant-vehiculo.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AgmCoreModule } from '@agm/core';
import { InfraccionesComponent } from 'app/pages/signia/infracciones/infracciones.component';
import { PapeletaComponent } from 'app/pages/signia/papeleta/papeleta.component';
import { GrupoInspectoresComponent } from 'app/pages/signia/grupo-inspectores/grupo-inspectores.component';
import { ReportePapeletasComponent } from 'app/pages/signia/reporte-papeletas/reporte-papeletas.component';
import { MantUsuarioComponent } from 'app/pages/signia/mant-usuario/mant-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    KeyFilterModule,
    ToastrModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ToolbarModule,
    CheckboxModule,
    InputTextareaModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en

    })
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    MantBaseComponent,
    MantDestinoComponent,
    MantEmpleadoComponent,
    MantVehiculoComponent,
    RutaComponent,
    BuscarRutaComponent,
    InfraccionesComponent,
    PapeletaComponent,
    GrupoInspectoresComponent,
    ReportePapeletasComponent,
    MantUsuarioComponent
  ]
})

export class AdminLayoutModule { }
