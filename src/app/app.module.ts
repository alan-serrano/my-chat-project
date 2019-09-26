import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadChatComponent } from './components/head-chat/head-chat.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { HistorialComponent } from './components/historial/historial.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadChatComponent,
    ContactosComponent,
    HistorialComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
