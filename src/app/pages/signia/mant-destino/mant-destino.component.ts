import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Destino } from 'app/server/models/destino';
import { CheckboxModule } from 'primeng/checkbox';

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
      { field: 'descripcion', header: 'Nombre Base', esfecha: false },

    ];

    this.cargaDestinos();
  }

  cargaDestinos() {
    Swal.fire(screenConstant.loading);
    this.lstDestinos = [];
    this.generalservice.findAllDestinos().subscribe(
      (data: any) => {
            this.lstDestinos= data.resultado;

        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }

  click_btnRefrescar(){
    this.cargaDestinos();
  }

  click_btnEditar(destino: Destino) {
    this.boolNuevo = false;
    this.destinoSelected = destino;
    this.boolShowDialog = true;
  }

  click_btnEliminar(destino: Destino) {
    Swal.fire({
      title: '¿Deseas eliminar este destino?',
      text: "Se eliminará el destino",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalservice.EliminarDestino(destino.id).subscribe(
          (data: any[]) => {
            this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });

            this.cargaDestinos();
        
          }, (err) => {
            Swal.close();
            this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
          }, () => Swal.close()
        );
        
      }
    })
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
