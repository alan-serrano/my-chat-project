import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';
import { UsuarioModel, MensajeModel } from '../../model/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  usuarios: UsuarioModel[] = [];
  idReceptor: string;
  mensajes: MensajeModel[] = [];
  idUsuarioActual: string;
  usuarioActual: UsuarioModel = {
    email: '',
    nombre: '',
    password: ''
  };

  vistaCelular = false;
  cargandoMensaje = false;
  mostrarMensajeInicial = false;

  mensajePorEnviar: string;

  constructor(
    private chat: ChatService,
    private route: ActivatedRoute,
    private auth: AuthService) {

    }

    ngOnInit() {

    // Contador para simular real time
    const temporizador = setInterval( () => {
      this.chat.obtenerMensajes(this.idUsuarioActual, this.idReceptor)
          .subscribe( mensajes => {
            this.mensajes = mensajes;
          });
        }, 1500);
    this.chat.obtenerUsuarios()
      .subscribe(resp => {
        this.usuarios = resp;
        this.idUsuarioActual = localStorage.getItem('idUsuario');
        this.obtenerUsuarioActual(resp);
      });

    this.route.params.subscribe( resp => {
      if (resp.id === 'escoge-un-chat') {
        this.mostrarMensajeInicial = true;
        this.vistaCelular = false;
      } else {
        this.vistaCelular = true;
        this.mostrarMensajeInicial = false;
        this.idReceptor = resp.id;
        this.cargandoMensaje = true;
        this.chat.obtenerMensajes(this.idUsuarioActual, this.idReceptor)
        .subscribe( mensajes => {
          this.mensajes = mensajes;
          this.cargandoMensaje = false;
        });
      }
    });

    this.chat.obtenerUsuarios()
      .subscribe( resp => {
        this.usuarios = resp;
        this.idUsuarioActual = localStorage.getItem('idUsuario');
        this.obtenerUsuarioActual(resp);
      });
  }

  enviarMensaje(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.idReceptor = this.route.snapshot.paramMap.get('id');

    const mensajeModel: MensajeModel = {
      emisor: this.idUsuarioActual,
      receptor: this.idReceptor,
      mensaje: this.mensajePorEnviar,
      fecha: new Date().getTime()
    };

    this.mensajes.push(mensajeModel);

    this.chat.enviarMensaje(mensajeModel)
      .subscribe( resp => {

        this.chat.obtenerMensajes(this.idUsuarioActual, this.idReceptor)
          .subscribe( mensajes => {
            this.mensajes = mensajes;
          });

      });

    form.resetForm();
  }

  obtenerUsuarioActual(arrUsuarios: UsuarioModel[]) {

    arrUsuarios.forEach( (usuario) => {
      if (usuario.idUsuario === this.idUsuarioActual) {
        this.usuarioActual = usuario;
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  mostrarContactos() {
    document.getElementById('col-contactos').classList.remove('oculto');
    document.getElementById('col-historial').classList.add('oculto');
    document.getElementById('btn-atras').classList.add('oculto');
  }

}
