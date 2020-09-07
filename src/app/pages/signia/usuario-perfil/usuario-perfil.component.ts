import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'app/server/services/usuario.service';
import { Perfil } from 'app/server/models/perfil';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';

import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { notifyConstant } from 'app/constants/notifyconstant';
import { Usuario } from 'app/server/models/usuario';
import { GeneralService } from 'app/server/services/general.service';
import { BasePartida } from 'app/server/models/base-partida';
import { data } from 'jquery';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {

  @ViewChild('ptablePerfiles') ptablePerfiles: Table;

  perfilSelected: Perfil;
  usuarioSelected: Usuario;
  boolShowModalUsuario: boolean;
  boolCodUsuarioActivo: boolean;
  boolNuevoUsuario: boolean;
  boolBtnGuardarActivo: boolean;

  lstPerfiles: Perfil[];
  lstUsuarios: Usuario[];
  lstBases: BasePartida[];

  constructor(
    private usuarioservice: UsuarioService,
    private toastr: ToastrService,
    private generalservice: GeneralService
  ) { }

  ngOnInit(): void {
    this.lstBases = [];
    this.lstPerfiles = [];
    this.lstUsuarios = [];

    this.cargaData_Perfiles();
  }

  cargaData_Perfiles() {

    this.boolShowModalUsuario = false;

    Swal.fire(screenConstant.loading);
    this.lstPerfiles = [];
    this.usuarioservice.findAllPerfiles().subscribe(
      (data: any) => {
        this.lstPerfiles = data;
        this.ptablePerfiles.sortOrder = 1;
        this.ptablePerfiles.sortField = 'id';
        this.cargarListaBases();
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

  cargarListaBases() {
    this.generalservice.findAllBases().subscribe(
      (data: any) => {
        this.lstBases = data;
      }, (err) => {
        this.toastr.warning(
          err.error.message,
          notifyConstant.titleError,
          notifyConstant.optionsError
        );
      }, () => Swal.close()
    );
  }

  onSelect_FilaPerfil() {
    this.lstUsuarios = [];
    this.lstUsuarios = this.perfilSelected.usuarios;
  }

  click_btnNuevoUsuario() {
    this.boolBtnGuardarActivo = true;
    if (this.perfilSelected == undefined) {
      this.toastr.warning(
        notifyConstant.messages.debeSeleccionarRegistro + ' Seleccionar Perfil',
        notifyConstant.titleWarning,
        notifyConstant.optionsWarning
      );
      return false;
    }
    this.usuarioSelected = new Usuario();
    this.usuarioSelected.base = this.lstBases[0];
    this.boolShowModalUsuario = true;
    this.boolCodUsuarioActivo = true;
    this.boolNuevoUsuario = true;
  }

  click_btnEditarUsuario() {
    this.boolBtnGuardarActivo = true;
    if (this.usuarioSelected == undefined) {
      this.toastr.warning(
        notifyConstant.messages.debeSeleccionarRegistro + ' Seleccionar Usuario',
        notifyConstant.titleWarning,
        notifyConstant.optionsWarning
      );
      return false;
    }

    this.boolCodUsuarioActivo = false;
    this.boolShowModalUsuario = true;
    this.boolNuevoUsuario = false;
  }

  click_btnGrabarUsuario() {
    this.boolBtnGuardarActivo = false;
    Swal.fire(screenConstant.loading);
    if (this.boolNuevoUsuario) {
      this.usuarioSelected.perfil = this.perfilSelected;
      this.usuarioservice.saveUsuario(this.usuarioSelected).subscribe(
        (data: any) => {
          this.toastr.success(
            notifyConstant.messages.success,
            notifyConstant.titleSuccesss,
            notifyConstant.optionsSuccess
          );
        }, (err) => {
          this.boolShowModalUsuario = false;
          this.toastr.warning(
            err.error.message,
            notifyConstant.titleError,
            notifyConstant.optionsError
          );
        }, () => {
          this.boolShowModalUsuario = false
          Swal.close();
          this.cargaData_Perfiles();
          this.boolBtnGuardarActivo = true;
        }
      );
    }
    else {
      let perfilUpd: Perfil = new Perfil();
      perfilUpd.id = this.perfilSelected.id;
      perfilUpd.nombre = this.perfilSelected.nombre;

      this.usuarioSelected.perfil = perfilUpd;
      this.usuarioservice.updateUsuario(this.usuarioSelected.id, this.usuarioSelected).subscribe(
        (data: any) => {
          this.toastr.success(
            notifyConstant.messages.success,
            notifyConstant.titleSuccesss,
            notifyConstant.optionsSuccess
          );
        }, (err) => {
          this.boolShowModalUsuario = false;
          this.toastr.warning(
            err.error.message,
            notifyConstant.titleError,
            notifyConstant.optionsError
          );
        }, () => {
          this.boolShowModalUsuario = false;
          Swal.close();
          this.cargaData_Perfiles();
          this.boolBtnGuardarActivo = true;
        }
      );
    }
  }

  hide_modalUsuario() {
    this.usuarioSelected = undefined;
  }


}
