import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../model/usuario.model';
import { AuthService } from '../../providers/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioModel();
  recordarme = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private chat: ChatService) { }

  ngOnInit() {

    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.auth.login(this.usuario)
      .subscribe( response => {

        // Lanzar modal
        Swal.close();

        // Navegar a la página de inicio
        this.router.navigateByUrl('');

        // Opción recordarme

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }

        // Obtener id Usuario y guardarlo en local storage
        this.chat.obtenerUsuarioId(this.usuario)
          .subscribe( resp => {
            localStorage.setItem('idUsuario', resp);
          });


      }, (reject: any) => {
        Swal.fire({
          type: 'error',
          text: reject.error.error.message
        });
      });
  }

}
