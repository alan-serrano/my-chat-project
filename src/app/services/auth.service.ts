import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../model/usuario.model';
import { NgIf } from '@angular/common';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = 'AIzaSyB7HA1FjPYWQyZJZv-NzCuKleOWzZwVbiU';
  private url = 'https://identitytoolkit.googleapis.com/v1';
  private idToken: string;

  // Signup https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // Signin https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http: HttpClient) {
    this.leerToken();
  }

  login(usuario: UsuarioModel) {
    const peticion = '/accounts:signInWithPassword?key=';
    const requestData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post( `${this.url + peticion + this.apiKey}`, requestData)
      .pipe(
        map( (response: any) => {
          this.guardarToken(response.idToken);
          return response;
        })
      );

  }

  logout() {

  }

  nuevoUsuario(usuario: UsuarioModel) {
    const peticion = '/accounts:signUp?key=';
    const requestData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post( `${this.url + peticion + this.apiKey}`, requestData)
      .pipe(
        map((response: any) => {
          this.guardarToken(response.idToken);
          return response;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.idToken = idToken;
    localStorage.setItem('token', idToken);
  }

  private leerToken() {
    if (localStorage.getItem('token')) {
      this.idToken = localStorage.getItem('token');
    } else {
      this.idToken = '';
    }
  }
}
