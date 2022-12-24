import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { GrupoInspector } from 'app/server/models/grupo-inspectores';
import { GrupoInspectoresService } from '../../../server/services/grupoInspectores.service';
import { Usuario } from '../../../server/models/usuario';
import { GrupoInspectoresDetalle } from 'app/server/models/grupo-inspectores-detalle';
import { UsuarioService } from '../../../server/services/usuario.service';

@Component({
  selector: 'app-grupo-inspectores',
  templateUrl: './grupo-inspectores.component.html',
  styleUrls: ['./grupo-inspectores.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class GrupoInspectoresComponent implements OnInit {

  detalle: GrupoInspectoresDetalle;
  cols: any[];
  grupoInspectorSelected: GrupoInspector = new GrupoInspector();
  boolShowDialog: boolean;
  boolNuevo: boolean;
  usuarios: Usuario[] = [];
  lstGrupoInspectors: any[];
  inspector: Usuario;

  colsUsuario: any[];
  constructor(
    private grupoInspectorService: GrupoInspectoresService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.boolShowDialog = false;

    this.cols = [
      { field: 'id', header: 'Id', esfecha: false },
      { field: 'codigo', header: 'Código', esfecha: false },
      { field: 'distrito', header: 'Distrito', esfecha: false },
      { field: 'turno', header: 'Turno', esfecha: false },
      { field: 'fecha', header: 'Fecha', esfecha: true },

    ];

    this.colsUsuario = [
      { field: 'nombre', header: 'Nombre', esfecha: false },

    ];
    this.cargaUsuarios();
    this.cargaGrupoInspectors();
  }

  cargaGrupoInspectors() {
    Swal.fire(screenConstant.loading);
    this.lstGrupoInspectors = [];
    this.grupoInspectorService.findAllGruposInspectores().subscribe(
      (data: any) => {
            this.lstGrupoInspectors= data.resultado;

        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }

  cargaUsuarios() {
    this.usuarios = [];
    this.usuarioService.findAllUsuarios().subscribe(
      (data: any) => {
            this.usuarios= data.resultado;

      }
    );
  }

  click_btnRefrescar(){
    this.cargaGrupoInspectors();
  }

  click_btnEditar(grupoinspector: GrupoInspector) {
    this.boolNuevo = false;
    this.grupoInspectorSelected = grupoinspector;
    this.boolShowDialog = true;
  }

  click_btnEliminar(grupoinspector: GrupoInspector) {
    Swal.fire({
      title: '¿Deseas eliminar este grupo de inspectores?',
      text: "Se eliminará el grupo inspector",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.grupoInspectorService.EliminarGrupoInspector(grupoinspector.id).subscribe(
          (data: any[]) => {
            this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });

            this.cargaGrupoInspectors();
        
          }, (err) => {
            Swal.close();
            this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
          }, () => Swal.close()
        );
        
      }
    })
  }

  click_btnNuevo() {
    this.grupoInspectorSelected = new GrupoInspector();
    this.boolShowDialog = true;
    this.boolNuevo = true;
  }

  click_btnCancelarGrabarBase() {
    this.grupoInspectorSelected = new GrupoInspector();
    this.boolShowDialog = false;
  }

  click_btnGrabarGrupoInspector() {
    Swal.fire(screenConstant.loading);
    if (this.boolNuevo) {
      this.grupoInspectorService.saveGrupoInspector(this.grupoInspectorSelected).subscribe(
        (data: any) => {
          this.boolShowDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaGrupoInspectors();
          Swal.close();
        }, (err) => {
          console.log(err);
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err.error), life: 3000 });
        }, () => Swal.close()
      );

    } else {
      this.grupoInspectorService.editarGrupoInspector(this.grupoInspectorSelected).subscribe(
        (data: any) => {
          this.boolShowDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaGrupoInspectors();
          Swal.close();
        }, (err) => {
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err), life: 3000 });
        }, () => Swal.close()
      );
    }
  }

  btn_AgregarInspector(){
    // tslint:disable-next-line: triple-equals
    // tslint:disable-next-line: whitespace
    // tslint:disable-next-line: triple-equals
    if(this.grupoInspectorSelected.detalleGrupoInspectores==undefined){
      this.detalle = new GrupoInspectoresDetalle();
      this.detalle.usuario = this.inspector;
      this.grupoInspectorSelected.detalleGrupoInspectores = [];
      this.grupoInspectorSelected.detalleGrupoInspectores.push(this.detalle);
   }else{
    if(this.grupoInspectorSelected.detalleGrupoInspectores.filter(e=> e.usuario.nombre===this.inspector.nombre).length >0){
      this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Ya agregaste a este inspector', life: 3000 });

    }else{
        this.detalle = new GrupoInspectoresDetalle();
        this.detalle.usuario = this.inspector;
      this.grupoInspectorSelected.detalleGrupoInspectores.push(this.detalle);

    }
   }
    
  }

  btn_EliminarInspector(usuario: Usuario){
    // tslint:disable-next-line: triple-equals
    // tslint:disable-next-line: max-line-length
    this.grupoInspectorSelected.detalleGrupoInspectores = this.grupoInspectorSelected.detalleGrupoInspectores.filter(item => item.usuario.id != usuario.id);
  }
}
