import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BolsosComponent } from './home/bolsos/bolsos.component';
import { DetalleBolsosComponent } from './home/bolsos/detalle-bolsos/detalle-bolsos.component';
import { DetalleArquerosComponent } from './home/arqueros/detalle-arqueros/detalle-arqueros.component';
import { ArquerosComponent } from './home/arqueros/arqueros.component';
import { CrearBolsosComponent } from './home/bolsos/crear-bolsos/crear-bolsos.component';
import { CrearArqueroComponent } from './home/arqueros/crear-arquero/crear-arquero.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
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
  { path: 'arqueros/detalle-arquero/:id', component: DetalleArquerosComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
