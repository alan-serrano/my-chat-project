import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../model/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioModel();

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {return; }

    this.auth.login(this.usuario)
      .subscribe( response => {
        console.log(response);
      }, (error: any) => {
        console.log(error);
      });
  }

}
