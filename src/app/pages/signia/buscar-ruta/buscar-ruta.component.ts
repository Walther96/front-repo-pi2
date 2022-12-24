import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-ruta',
  templateUrl: './buscar-ruta.component.html',
  styleUrls: ['./buscar-ruta.component.css']
})
export class BuscarRutaComponent implements OnInit {
  lat: number = -12.050468091883483;
  lng: number = -77.035911028205;
  markers: any[] = [];
  ruta: any;
  constructor(private serviceruta: GeneralService) { }

  ngOnInit(): void {
  }
  BuscarRuta(){
    this.serviceruta.findRuta(this.ruta).subscribe(data=>{
      this.markers = data.resultado.detalleruta;
    },error=>{
      Swal.fire({
        icon: 'error',
        title: 'La ruta no existe',
        showConfirmButton: true
      });
      this.markers = [];
    })
  }
}
