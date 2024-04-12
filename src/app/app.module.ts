import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BolsosComponent } from './home/bolsos/bolsos.component';
import { ArquerosComponent } from './home/arqueros/arqueros.component';
import { DetalleBolsosComponent } from './home/bolsos/detalle-bolsos/detalle-bolsos.component';
import { DetalleArquerosComponent } from './home/arqueros/detalle-arqueros/detalle-arqueros.component';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BolsosComponent,
    ArquerosComponent,
    DetalleBolsosComponent,
    DetalleArquerosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  exports:[    
    LoginComponent,
    HomeComponent,
    BolsosComponent,
    ArquerosComponent,
    DetalleBolsosComponent,
    DetalleArquerosComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
