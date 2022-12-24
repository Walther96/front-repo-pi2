import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'app/server/services/general.service';
import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Usuario } from 'app/server/models/usuario';
import { CheckboxModule } from 'primeng/checkbox';
import { UsuarioService } from '../../../server/services/usuario.service';

@Component({
  selector: 'app-mant-usuario',
  templateUrl: './mant-usuario.component.html',
  styleUrls: ['./mant-usuario.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class MantUsuarioComponent implements OnInit {

  
  cols: any[];
  usuarioSelected: Usuario;
  boolShowDialog: boolean;
  boolNuevo: boolean;
  lstRoles: any[];
  lstUsuarios: any[];

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.boolShowDialog = false;

    this.cols = [
      { field: 'id', header: 'Id', esfecha: false },
      { field: 'dni', header: 'DNI', esfecha: false },
      { field: 'apellido', header: 'Apellidos', esfecha: false },
      { field: 'nombre', header: 'Nombre', esfecha: false }

    ];
    this.cargarRoles();

    this.cargaUsuarios();
  }

  cargaUsuarios() {
    Swal.fire(screenConstant.loading);
    this.lstUsuarios = [];
    this.usuarioService.findAllUsuarios().subscribe(
      (data: any) => {
            this.lstUsuarios= data.resultado;

        Swal.close();
      }, (err) => {
        Swal.close();
        this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
      }, () => Swal.close()
    );
  }

  cargarRoles(){
    this.lstRoles = [];
    this.usuarioService.findAllRoles().subscribe(
      (data: any) => {
            this.lstRoles = data.resultado;

      }
    );
  }

  click_btnRefrescar(){
    this.cargaUsuarios();
  }

  click_btnEditar(usuario: Usuario) {
    this.boolNuevo = false;
    this.usuarioSelected = usuario;
    this.boolShowDialog = true;
  }

  click_btnEliminar(usuario: Usuario) {
    Swal.fire({
      title: '¿Deseas eliminar este usuario?',
      text: "Se eliminará el usuario",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.EliminarUsuario(usuario.id).subscribe(
          (data: any[]) => {
            this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });

            this.cargaUsuarios();
        
          }, (err) => {
            Swal.close();
            this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: 'Por favor, comuníquese con el administrador', life: 3000 });
          }, () => Swal.close()
        );
        
      }
    })
  }

  click_btnNuevo() {
    this.usuarioSelected = new Usuario();
    this.boolShowDialog = true;
    this.boolNuevo = true;
  }

  click_btnCancelarGrabarBase() {
    this.usuarioSelected = new Usuario();
    this.boolShowDialog = false;
  }

  click_btnGrabarBase() {
    Swal.fire(screenConstant.loading);
    if (this.boolNuevo) {
      this.usuarioService.saveUsuario(this.usuarioSelected).subscribe(
        (data: any) => {
          this.boolShowDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaUsuarios();
          Swal.close();
        }, (err) => {
          console.log(err);
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err.error), life: 3000 });
        }, () => Swal.close()
      );

    } else {
      this.usuarioService.editarUsuario(this.usuarioSelected.id,this.usuarioSelected).subscribe(
        (data: any) => {
          this.boolShowDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Ok!', detail: 'Proceso culminado satisfactoriamente', life: 3000 });
          this.cargaUsuarios();
          Swal.close();
        }, (err) => {
          Swal.close();
          this.messageService.add({ severity: 'error', summary: 'Ups! Error!', detail: JSON.stringify(err), life: 3000 });
        }, () => Swal.close()
      );
    }
  }

}
