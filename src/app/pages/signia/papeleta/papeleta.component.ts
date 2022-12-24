import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Papeleta } from 'app/server/models/papeleta';
import { CheckboxModule } from 'primeng/checkbox';
import { PapeletaService } from '../../../server/services/papeleta.service';
import { PapeletaRequest } from '../../../server/models/papeleta-request';
import { Vehiculo } from '../../../server/models/vehiculo';
import { InfraccionService } from 'app/server/services/infraccion.service';

@Component({
  selector: 'app-papeleta',
  templateUrl: './papeleta.component.html',
  styleUrls: ['./papeleta.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class PapeletaComponent implements OnInit {

 
  cols: any[];
  vehiculos: any[] = [];
  infracciones: any[] = [];
  papeletaRequest: PapeletaRequest;
  papeletaSelected: Papeleta;
  boolShowDialog: boolean;
  boolShowNuevoDialog: boolean;

  boolNuevo: boolean;

  lstPapeletas: any[];

  constructor(
    private papeletaService: PapeletaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private infraccionService: InfraccionService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.boolShowDialog = false;

    this.cols = [
      { field: 'id', header: 'Id', esfecha: false },
      { field: 'infraccion', header: 'Infracción', esfecha: false },
      { field: 'vehiculo.placa', header: 'Placa', esfecha: false },
      { field: 'fecha', header: 'Fecha', esfecha: true },

    ];

    this.cargaPapeletas();
    this.cargarInfraciones();
    this.cargarVehiculos();
  }

  cargaPapeletas() {
    Swal.fire(screenConstant.loading);
    this.lstPapeletas = [];
    this.papeletaService.findAllPapeletas().subscribe(
      (data: any) => {
            this.lstPapeletas= data.resultado;

        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }

  cargarInfraciones(){
    this.infracciones = [];
    this.infraccionService.findAllInfracciones().subscribe(
      (data: any) => {
            this.infracciones= data.resultado;

      }
    );
  }

  cargarVehiculos(){
    this.vehiculos = [];
    this.generalService.findAllVehiculos().subscribe(
      (data: any) => {
            this.vehiculos= data.resultado;

      }
    );
  }

  click_btnRefrescar(){
    this.cargaPapeletas();
  }

  click_btnEditar(papeleta: Papeleta) {
    this.boolNuevo = false;
    this.papeletaSelected = papeleta;
    this.boolShowDialog = true;
  }

  click_btnEliminar(papeleta: Papeleta) {
    Swal.fire({
      title: '¿Deseas eliminar este papeleta?',
      text: "Se eliminará el papeleta",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.papeletaService.EliminarPapeleta(papeleta.id).subscribe(
          (data: any[]) => {
            this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });

            this.cargaPapeletas();
        
          }, (err) => {
            Swal.close();
            this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
          }, () => Swal.close()
        );
        
      }
    })
  }

  click_btnNuevo() {
    this.papeletaSelected = new Papeleta();
    this.papeletaRequest = new PapeletaRequest();
    this.boolShowNuevoDialog = true;
    this.boolNuevo = true;
  }

  click_btnCancelarGrabarBase() {
    this.papeletaSelected = new Papeleta();
    this.papeletaRequest = new PapeletaRequest();
    this.boolShowNuevoDialog = false;
  }

  click_btnGrabarBase() {
    Swal.fire(screenConstant.loading);
    if (this.boolNuevo) {
      this.papeletaService.savePapeleta(this.papeletaRequest).subscribe(
        (data: any) => {
          this.boolShowNuevoDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaPapeletas();
          Swal.close();
        }, (err) => {
          console.log(err);
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err.error), life: 3000 });
        }, () => Swal.close()
      );

    } else {
      this.papeletaService.editarPapeleta(this.papeletaSelected).subscribe(
        (data: any) => {
          this.boolShowDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaPapeletas();
          Swal.close();
        }, (err) => {
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err), life: 3000 });
        }, () => Swal.close()
      );
    }
  }


}
