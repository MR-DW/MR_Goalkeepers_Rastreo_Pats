import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { BolsosComponent } from './componentes/home/bolsos/bolsos.component';
import { DetalleBolsosComponent } from './componentes/home/bolsos/detalle-bolsos/detalle-bolsos.component';
import { DetalleArquerosComponent } from './componentes/home/arqueros/detalle-arqueros/detalle-arqueros.component';
import { ArquerosComponent } from './componentes/home/arqueros/arqueros.component';
import { CrearBolsosComponent } from './componentes/home/bolsos/crear-bolsos/crear-bolsos.component';
import { CrearArqueroComponent } from './componentes/home/arqueros/crear-arquero/crear-arquero.component';
import { EditarComponent } from './componentes/shared/editar/editar.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  { path: 'ingresar', component: LoginComponent },
  { path: 'registrar', component: RegistroComponent },

  { path: '', component: HomeComponent },
  {
    path: 'bolsos', component: BolsosComponent,
    // children:[
    // {path:'detalle-bolso', component: DetalleBolsosComponent},
    // {path:'crear-bolso', component: CrearBolsosComponent}
    // ]
  },
  { path: 'bolsos/detalle-bolso/:id', component: DetalleBolsosComponent },
  { path: 'bolsos/crear-bolso', component: CrearBolsosComponent },
  {
    path: 'arqueros', component: ArquerosComponent,
    // children:[
    // {path:'detalle-arquero', component: DetalleArquerosComponent},
    // {path:'crear-arquero', component: CrearArqueroComponent}
    // ]
  },
  { path: 'arqueros/crear-arquero', component: CrearArqueroComponent },
  { path: 'arqueros/detalle-arquero/:id', component: DetalleArquerosComponent },
  { path: 'bolsos/editar-bolso/:id', component: EditarComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
