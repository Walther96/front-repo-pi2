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
      placa: '5%',
      nombreconductor: '15%',
      destino_ruc: '20%',
      cantidadbultos: '5%',
      empresatransporte_ruc: '20%',
      empresaresguardo_ruc: '10%',
      comentarios: '10%',
      acciones: '5%'
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

  confirm1(objsalida: RequerimientoSalida) {
    this.confirmationService.confirm({
      message: 'Seguro de proceder con la autorización de Requerimiento de Salida?',
      header: 'Confirmar Salida',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.salidaservicio.autorizar(objsalida.id).subscribe(
          (data: any) => {
            Swal.close();
            this.toastr.success(
              notifyConstant.messages.success,
              notifyConstant.titleSuccesss,
              notifyConstant.optionsSuccess
            );
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
