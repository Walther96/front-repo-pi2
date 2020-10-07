import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Destino } from 'app/server/models/destino';
import { CheckboxModule } from 'primeng/checkbox';
import { Empleado } from '../../../server/models/empleado';
@Component({
  selector: 'app-mant-empleado',
  templateUrl: './mant-empleado.component.html',
  styleUrls: ['./mant-empleado.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class MantEmpleadoComponent implements OnInit {

  cols: any[];
  empleadoSelected: Empleado;
  boolShowDialog: boolean;
  boolNuevo: boolean;

  lstEmpleados: any[];

  constructor(
    private generalservice: GeneralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.boolShowDialog = false;

    this.cols = [
      { field: 'id', header: 'Id', esfecha: false },
      { field: 'dni', header: 'DNI', esfecha: false },
      { field: 'nombres', header: 'Nombres', esfecha: false },
      { field: 'apellidos', header: 'Apellidos', esfecha: false },
      { field: 'fechacreacion', header: 'Fecha creación', esfecha: true }
    ];

    this.cargaEmpleados();
  }

  cargaEmpleados() {
    Swal.fire(screenConstant.loading);
    this.lstEmpleados = [];
    this.generalservice.findAllEmpleados().subscribe(
      (data: any[]) => {
        data.forEach(element =>{
          if(element.estado){
            this.lstEmpleados.push(element);

          }
        })


      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
    Swal.close();

  }

  click_btnRefrescar(){
    this.cargaEmpleados();
  }

  click_btnEditar(empleado: Empleado) {
    this.boolNuevo = false;
    this.empleadoSelected = empleado;
    this.boolShowDialog = true;
  }

  click_btnEliminar() {
    this.messageService.add({ severity: 'warn', summary: 'Advertencia!', detail: 'Método aún no implementado', life: 3000 });
  }

  click_btnNuevo() {
    this.empleadoSelected = new Empleado();
    this.boolShowDialog = true;
    this.boolNuevo = true;
  }

  click_btnCancelarGrabarBase() {
    this.empleadoSelected = new Empleado();
    this.boolShowDialog = false;
  }

  click_btnGrabarBase() {
    Swal.fire(screenConstant.loading);
    if (this.boolNuevo) {
      this.generalservice.saveEmpleado(this.empleadoSelected).subscribe(
        (data: any) => {
          this.boolShowDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaEmpleados();
          Swal.close();
        }, (err) => {
          console.log(err);
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err.error), life: 3000 });
        }, () => Swal.close()
      );

    } else {
      this.generalservice.editarEmpleado(this.empleadoSelected).subscribe(
        (data: any) => {
          this.boolShowDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaEmpleados();
          Swal.close();
        }, (err) => {
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err), life: 3000 });
        }, () => Swal.close()
      );
    }
  }


}
