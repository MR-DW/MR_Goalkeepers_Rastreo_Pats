import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArquerosComponent } from './componentes/home/arqueros/arqueros.component';
import { CrearArqueroComponent } from './componentes/home/arqueros/crear-arquero/crear-arquero.component';
import { DetalleArquerosComponent } from './componentes/home/arqueros/detalle-arqueros/detalle-arqueros.component';
import { BolsosComponent } from './componentes/home/bolsos/bolsos.component';
import { CrearBolsosComponent } from './componentes/home/bolsos/crear-bolsos/crear-bolsos.component';
import { DetalleBolsosComponent } from './componentes/home/bolsos/detalle-bolsos/detalle-bolsos.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { EditarComponent } from './componentes/shared/editar/editar.component';
import { LoginGuard } from './servicios/login.guard';
import { ReglamentoComponent } from './componentes/home/reglamento/reglamento.component';
import { EditarReglamentoComponent } from './componentes/home/reglamento/editar-reglamento/editar-reglamento.component';
import { EditarArquerosComponent } from './componentes/home/arqueros/editar-arqueros/editar-arqueros.component';
import { EditarBolsoComponent } from './componentes/home/bolsos/editar-bolso/editar-bolso.component';

const routes: Routes = [
  { path: 'ingresar', component: LoginComponent },
  { path: 'registrar', component: RegistroComponent },

  { path: ':club', component: HomeComponent },

  { path: 'reglamento', component: ReglamentoComponent },
  { path: 'editar-reglamento', component: EditarReglamentoComponent, canActivate:[LoginGuard] },

  { path: 'bolsos', component: BolsosComponent },
  { path: 'bolsos/detalle-bolso/:id', component: DetalleBolsosComponent },
  { path: 'bolsos/crear-bolso', component: CrearBolsosComponent, canActivate:[LoginGuard] },
  { path: 'bolsos/editar-bolso/:id', component: EditarBolsoComponent, canActivate:[LoginGuard] },

  { path: 'arqueros', component: ArquerosComponent },
  { path: 'arqueros/detalle-arquero/:id', component: DetalleArquerosComponent },
  { path: 'arqueros/crear-arquero', component: CrearArqueroComponent, canActivate:[LoginGuard] },
  { path: 'arqueros/editar-arquero/:id', component: EditarArquerosComponent, canActivate:[LoginGuard] },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
