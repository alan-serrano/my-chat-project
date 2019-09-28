import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../model/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {return; }
    this.auth.nuevoUsuario(this.usuario)
      .subscribe( response => {
        console.log(response);
      }, (error: any) => {
        console.log(error);
      });
  }

}
