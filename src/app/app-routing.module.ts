import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'chat', redirectTo: 'chat/escoge-un-chat' },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: 'chat/escoge-un-chat' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }


