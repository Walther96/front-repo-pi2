import { Component, OnInit } from '@angular/core';
import { RequerimientoSalida } from 'app/server/models/requerimiento-salida';
import { SalidaService } from 'app/server/services/salida.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { notifyConstant } from 'app/constants/notifyconstant';

declare var jsPDF: any;
declare var $: any;

@Component({
  selector: 'app-historico-salidas',
  templateUrl: './historico-salidas.component.html',
  styleUrls: ['./historico-salidas.component.css']
})
export class HistoricoSalidasComponent implements OnInit {

  columnWidth: any;
  salidaSelected: RequerimientoSalida;
  fechainicio: Date;
  fechafin: Date;

  rangeDates: Date[];
  lstSalidas: any[];
  cols: any[];
  exportColumns: any[];

  constructor(
    private toastr: ToastrService,
    private salidaservice: SalidaService
  ) { }

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

    this.lstSalidas = [];
    this.rangeDates = [];

    this.fechafin = new Date();
    this.fechainicio = new Date();
    this.fechainicio.setDate(this.fechafin.getDate() - 3);

    this.rangeDates.push(this.fechainicio);
    this.rangeDates.push(this.fechafin);

    this.cargarListaSalidas();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'base', header: 'Base partida' },
      { field: 'destino', header: 'Destino' },
      { field: 'placa', header: 'Placa' },
      { field: 'hojaruta', header: 'Hoja de Ruta' },
      { field: 'estado', header: 'Estado' },
    ];
    //this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

  }

  cargarListaSalidas() {


    let desde = this.rangeDates[0].toISOString().slice(0, 10).replace('-', '').replace('-', '');
    let hasta = this.rangeDates[1].toISOString().slice(0, 10).replace('-', '').replace('-', '');

    Swal.fire(screenConstant.loading);
    this.lstSalidas = [];
    this.salidaservice.findPorFechaCreacion(desde, hasta).subscribe(
      (data: any) => {
        this.lstSalidas = data;
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
  }

  exportPdf() {

    this.exportColumns = [
      { title: 'id', dataKey: 'id' },
      { title: 'Fecha Creación', dataKey: 'fechacreacion' },
      { title: 'Placa', dataKey: 'placa' },
      { title: 'Conductor', dataKey: 'dniconductor' },
      { title: 'Tlf Conductor', dataKey: 'telefonoconductor' },
      { title: 'Auxiliar 1', dataKey: 'dniauxiliar1' },
      { title: 'Tlf Aux1', dataKey: 'telefonoauxiliar1' },
      { title: 'Auxiliar 2', dataKey: 'dniauxiliar2' },
      { title: 'Tlf Aux2', dataKey: 'telefonoauxiliar2' },
      { title: 'Pto. partida', dataKey: 'basepartida' },
      { title: 'Pto. llegada', dataKey: 'destino' },
      { title: 'Cant bultos', dataKey: 'cantidadbultos' },
      { title: 'Emp Resguardo', dataKey: 'empresaresguardo' },
      { title: 'Nom Resg Cabina', dataKey: 'nombreresguardocabina' },
      { title: 'Nom Resg Escolta', dataKey: 'nombreresguardoescolta' },
      { title: 'Nom Resg Copiloto', dataKey: 'nombreresguardocopiloto' },
      { title: 'Usuario Cierre', dataKey: 'usuariocierre' }
    ];

    let lstPdf: any[];
    lstPdf = [];
    this.lstSalidas.forEach(element => {
      let item = {
        id: element.id,
        fechacreacion: element.fechacreacion,
        placa: element.placa,
        dniconductor: element.dniconductor,
        telefonoconductor: element.telefonoconductor,
        dniauxiliar1: element.dniauxiliar1,
        telefonoauxiliar1: element.telefonoauxiliar1,
        dniauxiliar2: element.dniauxiliar2,
        telefonoauxiliar2: element.telefonoauxiliar2,
        basepartida: element.basepartida.nombre,
        destino: element.destino.nombre,
        cantidadbultos: element.cantidadbultos,
        empresaresguardo: element.empresaresguardo.nombre,
        nombreresguardocabina: element.nombreresguardocabina,
        nombreresguardoescolta: element.nombreresguardoescolta,
        nombreresguardocopiloto: element.nombreresguardocopiloto
      };
      lstPdf.push(item);
    });

    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default('landscape', 'mm', 'a3');

        doc.autoTable(this.exportColumns, lstPdf);
        doc.save('Requerimientos_salida_export.pdf');
      })
    })
  }

  exportExcel() {

    let lstExcel: any[];
    lstExcel = [];
    this.lstSalidas.forEach(element => {
      let item = {
        id: element.id,
        fechacreacion: element.fechacreacion,
        placa: element.placa,
        dniconductor: element.dniconductor,
        telefonoconductor: element.telefonoconductor,
        dniauxiliar1: element.dniauxiliar1,
        telefonoauxiliar1: element.telefonoauxiliar1,
        dniauxiliar2: element.dniauxiliar2,
        telefonoauxiliar2: element.telefonoauxiliar2,
        basepartida: element.basepartida.nombre,
        destino: element.destino.nombre,
        cantidadbultos: element.cantidadbultos,
        empresaresguardo: element.empresaresguardo.nombre,
        nombreresguardocabina: element.nombreresguardocabina,
        nombreresguardoescolta: element.nombreresguardoescolta,
        nombreresguardocopiloto: element.nombreresguardocopiloto,
        usuariocierre: element.usuariocierre
      };
      lstExcel.push(item);
    });

    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(lstExcel);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Requerimientos_salida");
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

}
