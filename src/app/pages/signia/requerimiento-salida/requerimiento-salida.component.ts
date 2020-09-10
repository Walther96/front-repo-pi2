import { Component, OnInit } from '@angular/core';
import { SalidaService } from 'app/server/services/salida.service';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';

import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { notifyConstant } from 'app/constants/notifyconstant';
import { RequerimientoSalida } from 'app/server/models/requerimiento-salida';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-requerimiento-salida',
  templateUrl: './requerimiento-salida.component.html',
  styleUrls: ['./requerimiento-salida.component.css'],
  providers: [ConfirmationService]
})
export class RequerimientoSalidaComponent implements OnInit {

  lstSalidas: any[];
  columnWidth: any;

  salidaSelected: RequerimientoSalida;

  constructor(
    private toastr: ToastrService,
    private salidaservicio: SalidaService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

    this.columnWidth =
    {
      id: '5%',
      basepartida: '6%',
      destino_ruc: '20%',
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

    this.confirmationService.confirm({
      message: 'Seguro de proceder con la autorización de Requerimiento de Salida?',
      header: 'Confirmar Salida',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.salidaservicio.autorizar(this.salidaSelected.id, 'usuarioprueba').subscribe(
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
    });
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

    this.confirmationService.confirm({
      message: 'Va a Denegar la solicitud de Requerimiento de Salida, desea continuar?',
      header: 'Anular Requerimiento de Salida',
      icon: 'pi pi-ban',
      accept: () => {
        this.salidaservicio.denegar(this.salidaSelected.id, 'usuarioprueba').subscribe(
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
    });
  }


}
