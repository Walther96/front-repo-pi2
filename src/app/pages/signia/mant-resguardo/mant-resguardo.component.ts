import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { EmpresaResguardo } from 'app/server/models/empresa-resguardo';

@Component({
  selector: 'app-mant-resguardo',
  templateUrl: './mant-resguardo.component.html',
  styleUrls: ['./mant-resguardo.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MantResguardoComponent implements OnInit {

  cols: any[];
  resguardoSelected: EmpresaResguardo;
  boolShowDialog: boolean;
  boolNuevo: boolean;

  lstResguardo: any[];

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

    this.cargaResguardo();
  }

  cargaResguardo() {
    Swal.fire(screenConstant.loading);
    this.lstResguardo = [];
    this.generalservice.findAllResguardos().subscribe(
      (data: any) => {
        this.lstResguardo = data;
        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }

  click_btnEditar(resguardo: EmpresaResguardo) {
    this.boolNuevo = false;
    this.resguardoSelected = resguardo;
    this.boolShowDialog = true;
  }

  click_btnEliminar() {
    this.messageService.add({ severity: 'warn', summary: 'Advertencia!', detail: 'Método aún no implementado', life: 3000 });
  }

  click_btnNuevo() {
    this.resguardoSelected = new EmpresaResguardo();
    this.boolShowDialog = true;
    this.boolNuevo = true;
  }

  click_btnCancelar() {
    this.resguardoSelected = new EmpresaResguardo();
    this.boolShowDialog = false;
  }

  click_btnGrabar() {
    Swal.fire(screenConstant.loading);
    if (this.boolNuevo) {
      this.generalservice.saveResguardo(this.resguardoSelected).subscribe(
        (data: any) => {
          this.boolShowDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaResguardo();
          Swal.close();
        }, (err) => {
          console.log(err);
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err.error), life: 3000 });
        }, () => Swal.close()
      );

    } else {
      this.generalservice.editarResguardo(this.resguardoSelected).subscribe(
        (data: any) => {
          this.boolShowDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaResguardo();
          Swal.close();
        }, (err) => {
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err), life: 3000 });
        }, () => Swal.close()
      );
    }
  }



}
