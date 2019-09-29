import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsuarioModel } from '../../model/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactoComponent implements OnInit {
  @Input() usuario: UsuarioModel;

  idUsuarioActual: string;


  constructor(private router: Router) { }

  ngOnInit() {
    this.idUsuarioActual = localStorage.getItem('idUsuario');
  }

  onClick() {
    this.router.navigateByUrl(`chat/${this.usuario.idUsuario}`);

    document.getElementById('col-contactos').classList.add('oculto');
    document.getElementById('col-historial').classList.remove('oculto');
    document.getElementById('btn-atras').classList.remove('oculto');
  }
}
