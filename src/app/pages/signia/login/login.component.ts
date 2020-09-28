import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LoginService } from '../../../server/services/login.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Login } from 'app/server/models/login';
import { Usuario } from 'app/server/models/usuario';

declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'login-cmp',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  focus;
  focus1;
  focus2;
  test: Date = new Date();
  private toggleButton;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  private toastr: ToastrService;
  login: Login;
  usuario: Usuario;

  loginForm: FormGroup;

  constructor(private loginservice: LoginService, private fb: FormBuilder, private router: Router) {

    this.loginForm = this.fb.group({
      user: ['', Validators.compose([])],
      password: ['', Validators.compose([])]
    })
  }


  checkFullPageBackgroundImage() {
    var $page = $('.full-page');
    var image_src = $page.data('image');

    if (image_src !== undefined) {
      var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
      $page.append(image_container);
    }
  };
  iniciarSesion({ user, password }): void {


    if (this.loginForm.valid) {

      this.login = {
        usuario: this.loginForm.get('user').value,
        contrasena: this.loginForm.get('password').value
      };
      this.loginservice.logueo(this.login).then((data: any) => {

        this.loginservice.logueado = true;
        this.usuario = data;
        localStorage.setItem("usuario", JSON.stringify(data));

        console.log(JSON.parse(localStorage.getItem("usuario")));
        this.router.navigate(['/requerimientosalida'])

      }, (error) => {
        console.log(JSON.stringify(error));
        swal.fire(({
          icon: 'error',
          title: 'Ocurrió un problema',
          text: JSON.stringify(error.error)
        }));
      });
    } else {
      Object.keys(this.loginForm.controls).map((controlName) => {
        this.loginForm.get(controlName).markAsTouched({ onlySelf: true });
      });
    }
  }
  ngOnInit() {
    this.checkFullPageBackgroundImage();
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');


  }

}

