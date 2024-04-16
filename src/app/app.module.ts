import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ArquerosComponent } from './home/arqueros/arqueros.component';
import { CrearArqueroComponent } from './home/arqueros/crear-arquero/crear-arquero.component';
import { DetalleArquerosComponent } from './home/arqueros/detalle-arqueros/detalle-arqueros.component';
import { BolsosComponent } from './home/bolsos/bolsos.component';
import { CrearBolsosComponent } from './home/bolsos/crear-bolsos/crear-bolsos.component';
import { DetalleBolsosComponent } from './home/bolsos/detalle-bolsos/detalle-bolsos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModalConfirmacionComponent } from './shared/modal-confirmacion/modal-confirmacion.component';
import { CardComponent } from './shared/card/card.component';
import { BotonesNavegacionComponent } from './shared/botones-navegacion/botones-navegacion.component';

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
    ModalConfirmacionComponent,
    CardComponent,
    BotonesNavegacionComponent,
    
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
    HttpClientModule,
    MatDialogModule,
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
