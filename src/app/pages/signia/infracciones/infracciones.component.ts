import { Component, OnInit } from '@angular/core';
import { InfraccionService } from 'app/server/services/infraccion.service';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Infraccion } from '../../../server/models/Infraccion';

@Component({
  selector: 'app-infracciones',
  templateUrl: './infracciones.component.html',
  styleUrls: ['./infracciones.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class InfraccionesComponent implements OnInit {

  cols: any[];
  infraccionSelected: Infraccion;
  boolShowInfraccionDialog: boolean;
  boolNuevo: boolean;

  lstinfraccions: any[];

  constructor(
    private infraccionService: InfraccionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

    this.boolShowInfraccionDialog = false;

    this.cols = [
      { field: 'id', header: 'Id', esfecha: false },
      { field: 'codigo', header: 'Codigo', esfecha: false },
      { field: 'nivel', header: 'Nivel', esfecha: false },
      { field: 'descripcion', header: 'Nombre infraccion', esfecha: false }
    ];

    this.cargarinfraccions();

  }

  cargarinfraccions() {
    Swal.fire(screenConstant.loading);
    this.lstinfraccions = [];
    this.infraccionService.findAllInfracciones().subscribe(
      (data: any) => {
          this.lstinfraccions = data.resultado
        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }

  click_btnEditarInfraccion(infraccion: Infraccion) {
    this.boolNuevo = false;
    this.infraccionSelected = infraccion;
    this.boolShowInfraccionDialog = true;
  }

  click_btnEliminarInfraccion(infraccion: Infraccion) {
    Swal.fire({
      title: '¿Deseas eliminar esta infraccion?',
      text: "Se eliminará la infraccion",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.infraccionService.EliminarInfraccion(infraccion.id).subscribe(
          (data: any[]) => {
            this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });

            this.cargarinfraccions();
        
          }, (err) => {
            Swal.close();
            this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
          }, () => Swal.close()
        );
        
      }
    })
  }

  click_btnNuevo() {
    this.infraccionSelected = new Infraccion();
    this.boolShowInfraccionDialog = true;
    this.boolNuevo = true;
  }

  click_btnCancelarGrabarInfraccion() {
    this.infraccionSelected = new Infraccion();
    this.boolShowInfraccionDialog = false;
  }

  click_btnGrabarInfraccion() {
    Swal.fire(screenConstant.loading);
    if (this.boolNuevo) {
      this.infraccionService.saveInfraccion(this.infraccionSelected).subscribe(
        (data: any) => {
          this.boolShowInfraccionDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargarinfraccions();
          Swal.close();
        }, (err) => {
          console.log(err);
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err.error), life: 3000 });
        }, () => Swal.close()
      );

    } else {
      this.infraccionService.editarInfraccion(this.infraccionSelected).subscribe(
        (data: any) => {
          this.boolShowInfraccionDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargarinfraccions();
          Swal.close();
        }, (err) => {
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err), life: 3000 });
        }, () => Swal.close()
      );
    }
  }

}
