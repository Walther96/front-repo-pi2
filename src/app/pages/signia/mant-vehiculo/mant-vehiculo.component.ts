import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { notifyConstant } from 'app/constants/notifyconstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Vehiculo } from 'app/server/models/vehiculo';
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';

declare var $: any;
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
  exportColumns: any[];

  lstVehiculos: any[];
  lstTipoVehiculos: any[];
  lstRutas: any[];
  lstEmpleado: any[];

  constructor(
    private generalservice: GeneralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {

    this.boolShowBaseDialog = false;

    this.cols = [
      { field: 'id', header: 'Id', esfecha: false, esobjeto: false },
      { field: 'modelo', header: 'Modelo', esfecha: false, esobjeto: false },
      { field: 'placa', header: 'Placa', esfecha: false, esobjeto: false },
      { field: 'marca', header: 'Marca', esfecha: false, esobjeto: false }

    ];
    this.cargarRutas();
    this.cargarVehiculos();
    this.cargarEmpleadosLibres();
    this.cargarTipoVehiculos();

  }

  cargarEmpleadosLibres() {
    Swal.fire(screenConstant.loading);
    this.lstVehiculos = [];
    this.generalservice.findAllEmpleadosLibres().subscribe(
      (data: any) => {
        this.lstEmpleado = data.resultado;


        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }
  cargarRutas() {
    Swal.fire(screenConstant.loading);
    this.lstVehiculos = [];
    this.generalservice.findAllRutas().subscribe(
      (data: any) => {
        this.lstRutas = data.resultado;


        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }
  cargarVehiculos() {
    Swal.fire(screenConstant.loading);
    this.lstVehiculos = [];
    this.generalservice.findAllVehiculos().subscribe(
      (data: any) => {
        this.lstVehiculos = data.resultado;


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
        this.lstTipoVehiculos = data.resultado;


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
      title: '¿Deseas eliminar a este vehiculo?',
      text: "Se eliminará el vehiculo",
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
            this.cargarEmpleadosLibres();

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
          this.cargarEmpleadosLibres();

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
          this.cargarEmpleadosLibres();

          Swal.close();
        }, (err) => {
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err), life: 3000 });
        }, () => Swal.close()
      );
    }
  }







  exportExcel() {

    let lstExcel: any[];
    lstExcel = [];
    this.lstVehiculos.forEach(element => {


      let item = {
        Id: element.id,
        Placa: element.placa,
        Modelo: element.modelo,
        Marca: element.marca,
        Tipo_Vehiculo: element.tipovehiculo.descripcion,
        Conductor: element.empleado.nombres + ' ' + element.empleado.apellidos,
        Tipo_Documento_Conductor: element.empleado.tipodocumento.descripcion,
        Documento: element.empleado.documento,
        Ruta: element.ruta.nombreruta
      };
      lstExcel.push(item);
    });

    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(lstExcel);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Reporte de Vehiculos");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }



  exportPdf() {

    this.exportColumns = [[
      'Id',
      'Placa',
      'Modelo',
      'Marca',
      'Tipo_Vehiculo',
      'Conductor',
      'Tipo_Documento',
      'N° Documento',
      'Ruta'
    ]
    ];

    let lstPdf: any[];
    lstPdf = [];
    this.lstVehiculos.forEach(element => {

      let item = [
        element.id,
        element.placa,
        element.modelo,
        element.marca,
        element.tipovehiculo.descripcion,
        element.empleado.nombres + ' ' + element.empleado.apellidos,
        element.empleado.tipodocumento.descripcion,
        element.empleado.documento,
        element.ruta.nombreruta
      ];
      lstPdf.push(item);
    });
    var pdf = new jsPDF();
    var pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
    pdf.text('Reporte de Vehiculos', pageWidth / 2, 11, { align: 'center' });
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    (pdf as any).autoTable({
      head: this.exportColumns,
      body: lstPdf,
      theme: 'striped',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })

    // Open PDF document in browser's new tab

    // Download PDF doc  
    pdf.save('Reporte_de_Vehiculos.pdf');
  }


}
function P(arg0: number, P: any) {
  throw new Error('Function not implemented.');
}

