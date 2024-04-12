import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BolsosComponent } from './home/bolsos/bolsos.component';
import { DetalleBolsosComponent } from './home/bolsos/detalle-bolsos/detalle-bolsos.component';
import { DetalleArquerosComponent } from './home/arqueros/detalle-arqueros/detalle-arqueros.component';
import { ArquerosComponent } from './home/arqueros/arqueros.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', component: HomeComponent},
  {path:'bolsos', component: BolsosComponent, children:[
    {path:'detalle-bolso', component: DetalleBolsosComponent}
  ]},
  {path:'arqueros', component: ArquerosComponent, 
    children:[
    {path:'detalle-arquero', component: DetalleArquerosComponent}
  ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
