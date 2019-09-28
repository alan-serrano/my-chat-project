import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel } from '../../model/usuario.model';
import { AuthService } from 'src/app/providers/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(
    private auth: AuthService,
    private router: Router) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {return; }

    // Lanzar modal
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
      .subscribe( response => {
        console.log(response);

        // Llamar modal
        Swal.close();

        // Navegar al home
        this.router.navigateByUrl('/home');

        // Recordar usuario
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }

      }, (reject: any) => {
        console.log(reject);
        Swal.fire({
          type: 'error',
          text: reject.error.error.message
        });
      });
  }

}
