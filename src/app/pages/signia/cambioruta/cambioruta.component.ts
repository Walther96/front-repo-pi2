import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { CambioRutaService } from '../../../server/services/cambio-ruta.service';
@Component({
  selector: 'app-cambioruta',
  templateUrl: './cambioruta.component.html',
  styleUrls: ['./cambioruta.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class CambiorutaComponent implements OnInit {
  cols: any[];
  boolShowDialog: boolean;
  boolNuevo: boolean;
  placas: any[];
  ruta: any[];
  idPlaca: number;
  idRuta: number;
  rutaActual: string;
  isrutaactual: boolean;

  lstEmpleados: any[];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cambioservice: CambioRutaService) { }

  ngOnInit(): void {
    this.idPlaca = 0;
    this.idRuta = 0;
    this.boolShowDialog = false;
    this.isrutaactual = false;
    this.cols = [
      { field: 'id', header: 'Id', esfecha: false },
      { field: 'dni', header: 'DNI', esfecha: false },
      { field: 'nombres', header: 'Nombres', esfecha: false },
      { field: 'apellidos', header: 'Apellidos', esfecha: false },
      { field: 'fechacreacion', header: 'Fecha creación', esfecha: true }
    ];

    this.cambioservice.getUnidades().subscribe(
      (data: any) => {
        this.placas = data.unidades;
        this.ruta = data.rutas;
        console.log(data)
      }
    );
  }

 
 

 



  
  callType(selectedValue: string) {
    var Nombre = this.placas.filter(x => x.id = this.idPlaca);
    console.log(Nombre[0].ruta);
    this.isrutaactual = true;
    this.rutaActual = Nombre[0].ruta;
  }

  CambiarRuta() {
 
    this.cambioservice.cambiarRuta(this.idPlaca, this.idRuta).subscribe(data => {
      console.log(data);
      if (data.status == 1) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ruta Cambiada',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Ocurrió un error',
          showConfirmButton: false,
          timer: 1500
        })
      }

    });
  }
}
