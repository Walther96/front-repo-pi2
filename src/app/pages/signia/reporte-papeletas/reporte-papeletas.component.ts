import { Component, OnInit } from '@angular/core';
import { Papeleta } from '../../../server/models/papeleta';
import { PapeletaService } from '../../../server/services/papeleta.service';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { notifyConstant } from 'app/constants/notifyconstant';
import { DatePipe, formatDate } from '@angular/common';
declare var jsPDF: any;
declare var $: any;

@Component({
  selector: 'app-reporte-papeletas',
  templateUrl: './reporte-papeletas.component.html',
  styleUrls: ['./reporte-papeletas.component.css'],
  providers: [MessageService, ConfirmationService, DatePipe]

})
export class ReportePapeletasComponent implements OnInit {
  private toastr: ToastrService;

  columnWidth: any;
  fechainicio: Date;
  fechafin: Date;
  papeletaSelected: Papeleta;
  rangeDates: Date[];
  lstPapeletas: Papeleta[];
  cols: any[];
  exportColumns: any[];
  boolShowDialog: boolean;

  constructor(private papeletaService: PapeletaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.columnWidth =
    {
      expand: '3%',
      id: '3%',
      basepartida: '20%',
      destino_ruc: '20%',
      placa: '10%',
      hojaruta: '20%',
      estado: '10%'
    };

    this.lstPapeletas = [];
    this.rangeDates = [];

    this.fechafin = new Date();
    this.fechainicio = new Date();
    this.fechainicio.setDate(this.fechafin.getDate() - 3);

    this.rangeDates.push(this.fechainicio);
    this.rangeDates.push(this.fechafin);

    
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'base', header: 'Base partida' },
      { field: 'destino', header: 'Destino' },
      { field: 'placa', header: 'Placa' },
      { field: 'hojaruta', header: 'Hoja de Ruta' },
      { field: 'estado', header: 'Estado' },
    ];
    this.cargarPapeletas();
  }

  cargarPapeletas(){
    Swal.fire(screenConstant.loading);
    this.lstPapeletas = [];
    this.papeletaService.findAllPapeletas().subscribe(
      (data: any) => {
            this.lstPapeletas= data.resultado;

        Swal.close();
      }, (err) => {
        Swal.close();
        // tslint:disable-next-line: max-line-length
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }


  click_btnMasInformacion(papeleta: Papeleta) {
    this.papeletaSelected = papeleta;
    this.boolShowDialog = true;
  }

  click_btnCerrar() {
    this.papeletaSelected = new Papeleta();
    this.boolShowDialog = false;
  }
  cargarPaletasPorFecha(){
    let desde = this.rangeDates[0].toISOString().slice(0, 10).replace('-', '').replace('-', '');
    let hasta = this.rangeDates[1].toISOString().slice(0, 10).replace('-', '').replace('-', '');

    Swal.fire(screenConstant.loading);
    this.lstPapeletas = [];
    this.papeletaService.findAllPapeletasXFecha(desde, hasta).subscribe(
      (data: any) => {
        this.lstPapeletas = data.resultado;
        console.log(data)
        Swal.close();
      }, (err) => {
        Swal.close();
        this.toastr.warning(
          err.error.message,
          notifyConstant.titleError,
          notifyConstant.optionsError
        );
      }, () => Swal.close()
    );
    return;
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

  exportExcel(){
    let lstExcel: any[];
    lstExcel = [];
    this.lstPapeletas.forEach(element => {

    
          
      var item ={};

      var fechaCreacion= this.datePipe.transform(element.fecha, 'yyyy-MM-dd').toString();
      item = {
        codigo: element.infraccion.codigo,
        nivel: element.infraccion.nivel,
        descripcion: element.descripcion,
        placa: element.vehiculo.placa,
        modelo: element.vehiculo.modelo,
        marca: element.vehiculo.marca,
        camara: element.camara,
        fecha: fechaCreacion
      };
      lstExcel.push(item);
      
    });
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(lstExcel);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Reporte de Papeletas");
    });
  }
  exportPdf() {
  
    this.exportColumns = [
      { title: 'Infraccion', dataKey: 'codigo' },
      { title: 'Nivel Infraccion', dataKey: 'nivel' },
      { title: 'Comentario', dataKey: 'descripcion' },
      { title: 'Placa', dataKey: 'placa' },
      { title: 'Modelo', dataKey: 'modelo' },
      { title: 'Marca', dataKey: 'marca' },
      { title: 'Camara', dataKey: 'camara' }, 
      { title: 'Fecha', dataKey: 'fecha' }  
 
    ];

    let lstPdf: any[];
    lstPdf = [];
    this.lstPapeletas.forEach(element => {
      var item ={};

      var fechaCreacion= this.datePipe.transform(element.fecha, 'yyyy-MM-dd').toString();
      item = {
        codigo: element.infraccion.codigo,
        nivel: element.infraccion.nivel,
        descripcion: element.descripcion,
        placa: element.vehiculo.placa,
        modelo: element.vehiculo.modelo,
        marca: element.vehiculo.marca,
        camara: element.camara,
        fecha: fechaCreacion
      };
      lstPdf.push(item);
      }

    );

    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default('landscape', 'mm', 'a3');

        doc.autoTable(this.exportColumns, lstPdf);
        doc.save('Reporte_De_Papeletas.pdf');
      })
    })
  }

}
