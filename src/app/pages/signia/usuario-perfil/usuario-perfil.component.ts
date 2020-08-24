import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'app/server/services/usuario.service';
import { Perfil } from 'app/server/models/perfil';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';

import Swal from 'sweetalert2';
import { screenConstant } from 'app/constants/screenConstant';
import { notifyConstant } from 'app/constants/notifyconstant';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {

  @ViewChild('ptablePerfiles') ptablePerfiles: Table;

  lstPerfiles: Perfil[];

  constructor(
    private usuarioservice: UsuarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.lstPerfiles = [];

    this.cargaData_Perfiles();
  }

  cargaData_Perfiles() {

    Swal.fire(screenConstant.loading);
    this.lstPerfiles = [];
    this.usuarioservice.findAllPerfiles().subscribe(
      (data: any) => {
        this.lstPerfiles = data;
        this.ptablePerfiles.sortOrder = 1;
        this.ptablePerfiles.sortField = 'id';
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

}
