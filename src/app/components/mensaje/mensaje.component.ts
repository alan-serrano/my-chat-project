import { Component, OnInit, Input } from '@angular/core';
import { MensajeModel, UsuarioModel } from '../../model/usuario.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent implements OnInit {
  @Input() mensaje: MensajeModel;
  @Input() idUsuarioActual: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( resp => {

    });
  }

  ngOnInit() {
  }

  mostrarFecha() {
    const horas = new Date(this.mensaje.fecha).getHours();
    const minutos = new Date(this.mensaje.fecha).getMinutes();
    return `${horas}:${minutos}`;
  }
}
