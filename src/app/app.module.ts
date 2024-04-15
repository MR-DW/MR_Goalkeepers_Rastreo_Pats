import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BolsosComponent } from './home/bolsos/bolsos.component';
import { ArquerosComponent } from './home/arqueros/arqueros.component';
import { DetalleBolsosComponent } from './home/bolsos/detalle-bolsos/detalle-bolsos.component';
import { DetalleArquerosComponent } from './home/arqueros/detalle-arqueros/detalle-arqueros.component';
import { CrearArqueroComponent } from './home/arqueros/crear-arquero/crear-arquero.component';
import { CrearBolsosComponent } from './home/bolsos/crear-bolsos/crear-bolsos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RastreoComponent } from './home/rastreo/rastreo.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BolsosComponent,
    ArquerosComponent,
    DetalleBolsosComponent,
    DetalleArquerosComponent,
    CrearArqueroComponent,
    CrearBolsosComponent,
    RastreoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[    
    LoginComponent,
    HomeComponent,
    BolsosComponent,
    ArquerosComponent,
    DetalleBolsosComponent,
    DetalleArquerosComponent,
    CrearArqueroComponent,
    CrearBolsosComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
