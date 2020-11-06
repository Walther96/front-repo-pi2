import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { notifyConstant } from 'app/constants/notifyconstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Vehiculo } from 'app/server/models/vehiculo';
@Component({
  selector: 'app-mant-vehiculo',
  templateUrl: './mant-vehiculo.component.html',
  styleUrls: ['./mant-vehiculo.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class MantVehiculoComponent implements OnInit {
  cols: any[];
  vehiculoSelected: Vehiculo;
  boolShowBaseDialog: boolean;
  boolNuevo: boolean;

  lstVehiculos: any[];
  lstTipoVehiculos: any[];

  constructor(
    private generalservice: GeneralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

    this.boolShowBaseDialog = false;

    this.cols = [
      { field: 'id', header: 'Id', esfecha: false, esobjeto: false },
      { field: 'codigo', header: 'Codigo', esfecha: false, esobjeto: false },
      { field: 'placa', header: 'Placa', esfecha: false, esobjeto: false },
      { field: 'tipovehiculo', header: 'Tipo Vehiculo', esfecha: false, esobjeto: true}

    ];

    this.cargarVehiculos();
    this.cargarTipoVehiculos();

  }

  cargarVehiculos() {
    Swal.fire(screenConstant.loading);
    this.lstVehiculos = [];
    this.generalservice.findAllVehiculos().subscribe(
      (data: any) => {
        data.forEach(element =>{
          if(element.estado){
            this.lstVehiculos.push(element);

          }
        })
        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }
  cargarTipoVehiculos() {
    Swal.fire(screenConstant.loading);
    this.lstTipoVehiculos = [];
    this.generalservice.findAllTipoVehiculos().subscribe(
      (data: any) => {
            this.lstTipoVehiculos = data;

          
        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }
  click_btnEditarBase(vehiculo: Vehiculo) {
    this.boolNuevo = false;
    this.vehiculoSelected = vehiculo;
    this.boolShowBaseDialog = true;
  }

  click_btnEliminarBase(vehiculo: Vehiculo) {
    Swal.fire({
      title: '¿Deseas eliminar a esta base?',
      text: "Se eliminará la base",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalservice.EliminarVehiculo(vehiculo.id).subscribe(
          (data: any[]) => {
        
            this.cargarVehiculos();
            this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });

          }, (err) => {
            Swal.close();
            this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
          }, () => Swal.close()
        );
        
      }
    })
  }

  click_btnNuevo() {
    this.vehiculoSelected = new Vehiculo();
    this.boolShowBaseDialog = true;
    this.boolNuevo = true;
  }

  click_btnCancelarGrabarBase() {
    this.vehiculoSelected = new Vehiculo();
    this.boolShowBaseDialog = false;
  }

  click_btnGrabarBase() {
    Swal.fire(screenConstant.loading);
    if (this.boolNuevo) {
      this.generalservice.saveVehiculo(this.vehiculoSelected).subscribe(
        (data: any) => {
          this.boolShowBaseDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargarVehiculos();
          Swal.close();
        }, (err) => {
          console.log(err);
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err.error), life: 3000 });
        }, () => Swal.close()
      );

    } else {
      this.generalservice.editarVehiculo(this.vehiculoSelected).subscribe(
        (data: any) => {
          this.boolShowBaseDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargarVehiculos();
          Swal.close();
        }, (err) => {
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err), life: 3000 });
        }, () => Swal.close()
      );
    }
  }


}
