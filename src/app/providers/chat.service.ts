import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel, MensajeModel } from '../model/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  urlMessage = 'https://chat-angular-973e6.firebaseio.com/chats/message.json';
  urlUser = 'https://chat-angular-973e6.firebaseio.com/chats/user.json';

  constructor(
    private http: HttpClient) {}

  agregarUsuario(usuario: UsuarioModel) {
    return this.http.post( this.urlUser, usuario);
  }

  obtenerUsuarioId(usuario: UsuarioModel) {
    let usuarios: any;
    let emailUsuario: string;
    return this.http.get( this.urlUser)
      .pipe(
        map( (response: any) => {
          usuarios = response;
          emailUsuario = usuario.email;

          // Buscar usuario y guardar en el local Storage
          for (const key in usuarios) {
            if (usuarios.hasOwnProperty(key)) {
              const el = usuarios[key];
              if (el.email.toLowerCase() === usuario.email.toLowerCase()) {
                return key;
              }
            }
          }
        })
      );
  }

  obtenerUsuarios() {
    return this.http.get(this.urlUser)
      .pipe(
        map( resp => {
          return convertirArreglo(resp);
        })
      );

    function convertirArreglo(usuarios) {
      const arrUsuario = [];

      for (const i in usuarios) {
        if (usuarios.hasOwnProperty(i)) {
          usuarios[i].idUsuario = i;
          arrUsuario.push(usuarios[i]);
        }
      }

      return arrUsuario;
    }
  }

  obtenerMensajes(idEmisor, idReceptor) {
    return this.http.get(this.urlMessage)
      .pipe(
        map( resp => {
          return convertirArreglo(resp);
        })
      );

    function convertirArreglo(mensajes) {
      const arrMensajes = [];

      for (const i in mensajes) {
        if (mensajes.hasOwnProperty(i)) {
          const mensaje = mensajes[i];
          if (
            (idEmisor === mensaje.emisor || idEmisor === mensaje.receptor) &&
            (idReceptor === mensaje.emisor || idReceptor === mensaje.receptor)
            ) {
            arrMensajes.push(mensajes[i]);
          }
        }
      }

      return arrMensajes;
    }
  }

  enviarMensaje(mensaje: MensajeModel) {
    return this.http.post(this.urlMessage, mensaje);
  }
}
