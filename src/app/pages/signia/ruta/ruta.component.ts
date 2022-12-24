import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import Swal from 'sweetalert2';
import { GrupoInspectoresService } from '../../../server/services/grupoInspectores.service';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit {
  lat: number = -12.050468091883483;
  lng: number = -77.035911028205;
  markers: any[] = [];
  origenes: any[] =[];
  destinos: any[] =[];
  grupoInspector: any[] =[];
  ruta: any = {
    nombreruta :null,
    origen: {},
    destino: {},
    detalleruta :[]
  };

  constructor(private serviceruta: GeneralService, private grupoInspectorService: GrupoInspectoresService) { }

  ngOnInit(): void {
    this.getOrigenes();
    this.getdestinos();
    this.getGrupoInspector();
    console.log(this.origenes);
  }

  getOrigenes(){
    this.serviceruta.findAllBases().subscribe(data=>{
    this.origenes = data.resultado;

    })
  }
  getdestinos(){
    this.serviceruta.findAllDestinos().subscribe(data=>{
      this.destinos = data.resultado;
  
      })
  }
  getGrupoInspector(){
    this.grupoInspectorService.findAllGruposInspectores().subscribe(data=>{
      this.grupoInspector = data.resultado;
  
      })
  }
  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }
  clickedMarker(label: any) {
    console.log(label)
    this.markers= this.markers.filter(x=> x.lat!=label.lat && x.lng !=label.lng)
  }

  GuardarRuta(){

    this.ruta.detalleruta = this.markers;
    console.log(this.markers);
    console.log(this.ruta);
    this.serviceruta.saveRuta(this.ruta).subscribe(data=>{
      this.markers = [];
      this.ruta = {
        nombreruta :null,
        origen: {},
        destino: {},
        detalleruta :[]
      };
      Swal.fire({
        icon: 'success',
        title: 'Ruta Guardada',
        showConfirmButton: false,
        timer: 1500
      });
    },error =>{
      console.log(error)
      console.log(JSON.stringify(error.error))

      Swal.fire({
        icon: 'error',
        title: error.error.estado.mensaje,
        text: JSON.stringify(error.error.estado.detalle),
        showConfirmButton: true
      })
    });
    

  }
}
