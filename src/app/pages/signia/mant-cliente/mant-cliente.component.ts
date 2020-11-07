import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { notifyConstant } from 'app/constants/notifyconstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Cliente } from 'app/server/models/cliente';


@Component({
  selector: 'app-mant-cliente',
  templateUrl: './mant-cliente.component.html',
  styleUrls: ['./mant-cliente.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class MantClienteComponent implements OnInit {

  cols: any[];
  clienteSelected: Cliente;
  boolShowBaseDialog: boolean;
  boolNuevo: boolean;

  lstClientes: any[];

  constructor(
    private generalservice: GeneralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

    this.boolShowBaseDialog = false;

    this.cols = [
      { field: 'id', header: 'Id', esfecha: false },
      { field: 'ruc', header: 'Ruc', esfecha: false },
      { field: 'razonsocial', header: 'Razon Social', esfecha: false }
    ];

    this.cargarClientes();

  }

  cargarClientes() {
    Swal.fire(screenConstant.loading);
    this.lstClientes = [];
    this.generalservice.findAllClientes().subscribe(
      (data: any) => {
        data.forEach(element =>{
          if(element.estado){
            this.lstClientes.push(element);

          }
        })
        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }

  click_btnEditarBase(cliente: Cliente) {
    this.boolNuevo = false;
    this.clienteSelected = cliente;
    this.boolShowBaseDialog = true;
  }

  click_btnEliminarBase(cliente :Cliente) {
    Swal.fire({
      title: '¿Deseas eliminar a este cliente?',
      text: "Se eliminará el cliente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalservice.EliminarCliente(cliente.id).subscribe(
          (data: any[]) => {
        
            this.cargarClientes();
        
          }, (err) => {
            Swal.close();
            this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
          }, () => Swal.close()
        );
        
      }
    })
  }

  click_btnNuevo() {
    this.clienteSelected = new Cliente();
    this.boolShowBaseDialog = true;
    this.boolNuevo = true;
  }

  click_btnCancelarGrabarBase() {
    this.clienteSelected = new Cliente();
    this.boolShowBaseDialog = false;
  }

  click_btnGrabarBase() {
    Swal.fire(screenConstant.loading);
    if (this.boolNuevo) {
      this.generalservice.saveCliente(this.clienteSelected).subscribe(
        (data: any) => {
          this.boolShowBaseDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargarClientes();
          Swal.close();
        }, (err) => {
          console.log(err);
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err.error), life: 3000 });
        }, () => Swal.close()
      );

    } else {
      this.generalservice.editarCliente(this.clienteSelected).subscribe(
        (data: any) => {
          this.boolShowBaseDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargarClientes();
          Swal.close();
        }, (err) => {
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err), life: 3000 });
        }, () => Swal.close()
      );
    }
  }

}
