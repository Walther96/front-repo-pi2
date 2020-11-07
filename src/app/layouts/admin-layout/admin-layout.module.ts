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
import { UsuarioPerfilComponent } from 'app/pages/signia/usuario-perfil/usuario-perfil.component';
import { RequerimientoSalidaComponent } from 'app/pages/signia/requerimiento-salida/requerimiento-salida.component';
import { HistoricoSalidasComponent } from 'app/pages/signia/historico-salidas/historico-salidas.component';
import { MantEmpleadoComponent } from '../../pages/signia/mant-empleado/mant-empleado.component';
import { CambiorutaComponent } from '../../pages/signia/cambioruta/cambioruta.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MantBaseComponent } from 'app/pages/signia/mant-base/mant-base.component';
import { MantResguardoComponent } from 'app/pages/signia/mant-resguardo/mant-resguardo.component';
import { MantDestinoComponent } from 'app/pages/signia/mant-destino/mant-destino.component';
import { MantVehiculoComponent } from 'app/pages/signia/mant-vehiculo/mant-vehiculo.component';
import { MantClienteComponent } from 'app/pages/signia/mant-cliente/mant-cliente.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';

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
    InputTextareaModule
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
    UsuarioPerfilComponent,
    RequerimientoSalidaComponent,
    HistoricoSalidasComponent,
    MantBaseComponent,
    MantResguardoComponent,
    MantDestinoComponent,
    MantEmpleadoComponent,
    MantVehiculoComponent,
    CambiorutaComponent,
    MantClienteComponent
  ]
})

export class AdminLayoutModule { }
