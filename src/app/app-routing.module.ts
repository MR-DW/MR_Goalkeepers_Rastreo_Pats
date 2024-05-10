import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArquerosComponent } from './componentes/home/arqueros/arqueros.component';
import { CrearArqueroComponent } from './componentes/home/arqueros/crear-arquero/crear-arquero.component';
import { DetalleArquerosComponent } from './componentes/home/arqueros/detalle-arqueros/detalle-arqueros.component';
import { EditarArquerosComponent } from './componentes/home/arqueros/editar-arqueros/editar-arqueros.component';
import { BolsosComponent } from './componentes/home/bolsos/bolsos.component';
import { CrearBolsosComponent } from './componentes/home/bolsos/crear-bolsos/crear-bolsos.component';
import { DetalleBolsosComponent } from './componentes/home/bolsos/detalle-bolsos/detalle-bolsos.component';
import { EditarBolsoComponent } from './componentes/home/bolsos/editar-bolso/editar-bolso.component';
import { HomeComponent } from './componentes/home/home.component';
import { EditarReglamentoComponent } from './componentes/home/reglamento/editar-reglamento/editar-reglamento.component';
import { ReglamentoComponent } from './componentes/home/reglamento/reglamento.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ClubUsuarioGuard } from './servicios/clubUsuario.guard';
import { LoginGuard } from './servicios/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/ingresar', pathMatch: 'full' },

  { path: 'ingresar', component: LoginComponent },
  { path: 'registrar', component: RegistroComponent },

  { path: ':club', component: HomeComponent },

  { path: ':club/reglamento', component: ReglamentoComponent, canActivate: [ClubUsuarioGuard] },
  { path: ':club/reglamento/editar-reglamento', component: EditarReglamentoComponent, canActivate: [LoginGuard, ClubUsuarioGuard] },

  { path: ':club/bolsos', component: BolsosComponent, canActivate: [ClubUsuarioGuard] },
  { path: ':club/bolsos/detalle-bolso/:id', component: DetalleBolsosComponent, canActivate: [ClubUsuarioGuard] },
  { path: ':club/bolsos/crear-bolso', component: CrearBolsosComponent, canActivate: [LoginGuard, ClubUsuarioGuard] },
  { path: ':club/bolsos/editar-bolso/:id', component: EditarBolsoComponent, canActivate: [LoginGuard, ClubUsuarioGuard] },

  { path: ':club/arqueros', component: ArquerosComponent, canActivate: [ClubUsuarioGuard] },
  { path: ':club/arqueros/detalle-arquero/:id', component: DetalleArquerosComponent, canActivate: [ClubUsuarioGuard] },
  { path: ':club/arqueros/crear-arquero', component: CrearArqueroComponent, canActivate: [LoginGuard, ClubUsuarioGuard] },
  { path: ':club/arqueros/editar-arquero/:id', component: EditarArquerosComponent, canActivate: [LoginGuard, ClubUsuarioGuard] },

  // { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
