import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadChatComponent } from './components/head-chat/head-chat.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { HistorialComponent } from './components/historial/historial.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadChatComponent,
    ContactosComponent,
    HistorialComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ChatComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
