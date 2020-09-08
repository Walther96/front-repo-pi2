import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { notifyConstant } from 'app/constants/notifyconstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { BasePartida } from 'app/server/models/base-partida';

@Component({
  selector: 'app-mant-base',
  templateUrl: './mant-base.component.html',
  styleUrls: ['./mant-base.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MantBaseComponent implements OnInit {

  cols: any[];
  baseSelected: BasePartida;
  boolShowBaseDialog: boolean;
  boolNuevo: boolean;

  lstBases: any[];

  constructor(
    private generalservice: GeneralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

    this.boolShowBaseDialog = false;

    this.cols = [
      { field: 'id', header: 'Id', esfecha: false },
      { field: 'nombre', header: 'Nombre Base', esfecha: false },
      { field: 'fechacreacion', header: 'Fecha creación', esfecha: true }
    ];

    this.cargarBases();

  }

  cargarBases() {
    Swal.fire(screenConstant.loading);
    this.lstBases = [];
    this.generalservice.findAllBases().subscribe(
      (data: any) => {
        this.lstBases = data;
        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }

  click_btnEditarBase(base: BasePartida) {
    this.boolNuevo = false;
    this.baseSelected = base;
    this.boolShowBaseDialog = true;
  }

  click_btnEliminarBase() {
    this.messageService.add({ severity: 'warn', summary: 'Advertencia!', detail: 'Método aún no implementado', life: 3000 });
  }

  click_btnNuevo() {
    this.baseSelected = new BasePartida();
    this.boolShowBaseDialog = true;
    this.boolNuevo = true;
  }

  click_btnCancelarGrabarBase() {
    this.baseSelected = new BasePartida();
    this.boolShowBaseDialog = false;
  }

  click_btnGrabarBase() {
    Swal.fire(screenConstant.loading);
    if (this.boolNuevo) {
      this.generalservice.saveBase(this.baseSelected).subscribe(
        (data: any) => {
          this.boolShowBaseDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargarBases();
          Swal.close();
        }, (err) => {
          console.log(err);
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err.error), life: 3000 });
        }, () => Swal.close()
      );

    } else {
      this.generalservice.editarBase(this.baseSelected).subscribe(
        (data: any) => {
          this.boolShowBaseDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargarBases();
          Swal.close();
        }, (err) => {
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err), life: 3000 });
        }, () => Swal.close()
      );
    }
  }

}
