import { Component, OnInit } from '@angular/core';
import { SalidaService } from 'app/server/services/salida.service';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';

import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { notifyConstant } from 'app/constants/notifyconstant';
import { RequerimientoSalida } from 'app/server/models/requerimiento-salida';
import { ConfirmationService } from 'primeng/api';
import { UsuarioService } from 'app/server/services/usuario.service';
import { PushNotificationService } from 'app/server/services/push-notification.service';
import { PushMensaje } from '../../../server/models/push-mensaje';


@Component({
  selector: 'app-requerimiento-salida',
  templateUrl: './requerimiento-salida.component.html',
  styleUrls: ['./requerimiento-salida.component.css'],
  providers: [ConfirmationService]
})
export class RequerimientoSalidaComponent implements OnInit {

  lstSalidas: any[];
  columnWidth: any;
  strObservacion: string;
  displayModal: boolean;
  displayModalDenegar: boolean;
  data: PushMensaje;

  salidaSelected: RequerimientoSalida;

  constructor(
    private toastr: ToastrService,
    private salidaservicio: SalidaService,
    private confirmationService: ConfirmationService,
    private usuarioservice: UsuarioService,
    private pushnotification: PushNotificationService
  ) { }

  ngOnInit(): void {

    this.displayModal = false;
    this.displayModalDenegar = false;
    this.columnWidth =
    {
      id: '5%',
      basepartida: '6%',
      destino_ruc: '14%',
      fechacreacion: '7%',
      hojaruta: '5%',
      placa: '5%'
    };

    this.lstSalidas = [];

    this.listarSalidasPorAutorizar();
  }

  listarSalidasPorAutorizar() {
    Swal.fire(screenConstant.loading);
    this.lstSalidas = [];
    this.salidaservicio.findPorAutorizar().subscribe(
      (data: any) => {
        this.lstSalidas = data;
        Swal.close();
      }, (err) => {
        Swal.close();
        this.toastr.warning(
          err.error.message,
          notifyConstant.titleError,
          notifyConstant.optionsError
        );
      }, () => Swal.close()
    );
  }

  click_btnAutorizar() {
    if (this.salidaSelected == undefined) {
      this.toastr.warning(
        notifyConstant.messages.debeSeleccionarRegistro,
        notifyConstant.titleWarning,
        notifyConstant.optionsWarning
      );
      return false;
    }

    /*this.confirmationService.confirm({
      message: 'Seguro de proceder con la autorización de Requerimiento de Salida?',
      header: 'Confirmar Salida',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.salidaservicio.autorizar(this.salidaSelected.id, this.usuarioservice.get().usuario).subscribe(
          (data: any) => {
            Swal.close();
            this.toastr.success(
              notifyConstant.messages.success,
              notifyConstant.titleSuccesss,
              notifyConstant.optionsSuccess
            );
            this.salidaSelected = undefined;
            this.listarSalidasPorAutorizar();
          }, (err) => {
            Swal.close();
            this.toastr.warning(
              err.error.message,
              notifyConstant.titleError,
              notifyConstant.optionsError
            );
          }
        );
      },
      reject: () => {
        //this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });*/

    this.strObservacion = "";
    this.displayModal = true;
  }

  click_grabarAutorizacion() {
    this.salidaservicio.autoriza_comentarios(this.salidaSelected.id, this.strObservacion, this.usuarioservice.get().usuario).subscribe(
      (data: any) => {
        Swal.close();
        this.toastr.success(
          notifyConstant.messages.success,
          notifyConstant.titleSuccesss,
          notifyConstant.optionsSuccess
        );
        this.salidaSelected = undefined;
        this.listarSalidasPorAutorizar();

        this.strObservacion = "";
        this.displayModal = false;
        this.data ={
          app_id: "f1db39ee-06f3-4af8-9ffd-d6e94de8a3bd",
          included_segments: ["Active Users", "Inactive Users"],
          headings: {es: "Autorizado", en:"Update"},
          contents: {es: "Se autorizó un requerimiento de salida", en: "req update"},
          isAndroid: true,
          isAnyWeb: false
        }
        this.pushnotification.EnviarPush(this.data);
      }, (err) => {
        Swal.close();
        this.toastr.warning(
          err.error.message,
          notifyConstant.titleError,
          notifyConstant.optionsError
        );

        this.strObservacion = "";
        this.displayModal = false;
      }
    );
  }

  click_btnDenegar() {

    if (this.salidaSelected == undefined) {
      this.toastr.warning(
        notifyConstant.messages.debeSeleccionarRegistro,
        notifyConstant.titleWarning,
        notifyConstant.optionsWarning
      );
      return false;
    }

    this.strObservacion = "";
    this.displayModalDenegar = true;

    /*this.confirmationService.confirm({
      message: 'Va a Denegar la solicitud de Requerimiento de Salida, desea continuar?',
      header: 'Anular Requerimiento de Salida',
      icon: 'pi pi-ban',
      accept: () => {
        this.salidaservicio.denegar(this.salidaSelected.id, this.usuarioservice.get().usuario).subscribe(
          (data: any) => {
            Swal.close();
            this.toastr.success(
              notifyConstant.messages.success,
              notifyConstant.titleSuccesss,
              notifyConstant.optionsSuccess
            );
            this.salidaSelected = undefined;
            this.listarSalidasPorAutorizar();
          }, (err) => {
            Swal.close();
            this.toastr.warning(
              err.error.message,
              notifyConstant.titleError,
              notifyConstant.optionsError
            );
          }
        );
      },
      reject: () => {
        //this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });*/
  }


  click_grabarDenegar() {
    this.salidaservicio.denegar_comentarios(this.salidaSelected.id, this.strObservacion, this.usuarioservice.get().usuario).subscribe(
      (data: any) => {
        Swal.close();
        this.toastr.success(
          notifyConstant.messages.success,
          notifyConstant.titleSuccesss,
          notifyConstant.optionsSuccess
        );
        this.salidaSelected = undefined;
        this.listarSalidasPorAutorizar();

        this.strObservacion = "";
        this.displayModal = false;
        this.data ={
          app_id: "f1db39ee-06f3-4af8-9ffd-d6e94de8a3bd",
          included_segments: ["Active Users", "Inactive Users"],
          headings: {es: "Denegado", en:"Update"},
          contents: {es: "Se denegó un requerimiento de salida", en: "req update"},
          isAndroid: true,
          isAnyWeb: false
        }
        this.pushnotification.EnviarPush(this.data);
        this.displayModalDenegar = false;

      }, (err) => {
        Swal.close();
        this.toastr.warning(
          err.error.message,
          notifyConstant.titleError,
          notifyConstant.optionsError
        );

        this.strObservacion = "";
        this.displayModal = false;

      }
    );
  }


}
