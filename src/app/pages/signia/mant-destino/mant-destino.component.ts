import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Destino } from 'app/server/models/destino';


@Component({
  selector: 'app-mant-destino',
  templateUrl: './mant-destino.component.html',
  styleUrls: ['./mant-destino.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MantDestinoComponent implements OnInit {

  cols: any[];
  destinoSelected: Destino;
  boolShowDialog: boolean;
  boolNuevo: boolean;

  lstDestinos: any[];

  constructor(
    private generalservice: GeneralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.boolShowDialog = false;

    this.cols = [
      { field: 'id', header: 'Id', esfecha: false },
      { field: 'ruc', header: 'RUC', esfecha: false },
      { field: 'nombre', header: 'Nombre Base', esfecha: false },
      { field: 'fechacreacion', header: 'Fecha creación', esfecha: true }
    ];

    this.cargaDestinos();
  }

  cargaDestinos() {
    Swal.fire(screenConstant.loading);
    this.lstDestinos = [];
    this.generalservice.findAllDestinos().subscribe(
      (data: any) => {
        this.lstDestinos = data;
        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }

  click_btnEditar(destino: Destino) {
    this.boolNuevo = false;
    this.destinoSelected = destino;
    this.boolShowDialog = true;
  }

  click_btnEliminar() {
    this.messageService.add({ severity: 'warn', summary: 'Advertencia!', detail: 'Método aún no implementado', life: 3000 });
  }

  click_btnNuevo() {
    this.destinoSelected = new Destino();
    this.boolShowDialog = true;
    this.boolNuevo = true;
  }

  click_btnCancelarGrabarBase() {
    this.destinoSelected = new Destino();
    this.boolShowDialog = false;
  }

  click_btnGrabarBase() {
    Swal.fire(screenConstant.loading);
    if (this.boolNuevo) {
      this.generalservice.saveDestino(this.destinoSelected).subscribe(
        (data: any) => {
          this.boolShowDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaDestinos();
          Swal.close();
        }, (err) => {
          console.log(err);
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err.error), life: 3000 });
        }, () => Swal.close()
      );

    } else {
      this.generalservice.editarDestino(this.destinoSelected).subscribe(
        (data: any) => {
          this.boolShowDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaDestinos();
          Swal.close();
        }, (err) => {
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err), life: 3000 });
        }, () => Swal.close()
      );
    }
  }


}
