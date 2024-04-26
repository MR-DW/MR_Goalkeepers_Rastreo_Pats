import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArquerosComponent } from './componentes/home/arqueros/arqueros.component';
import { CrearArqueroComponent } from './componentes/home/arqueros/crear-arquero/crear-arquero.component';
import { DetalleArquerosComponent } from './componentes/home/arqueros/detalle-arqueros/detalle-arqueros.component';
import { BolsosComponent } from './componentes/home/bolsos/bolsos.component';
import { CrearBolsosComponent } from './componentes/home/bolsos/crear-bolsos/crear-bolsos.component';
import { DetalleBolsosComponent } from './componentes/home/bolsos/detalle-bolsos/detalle-bolsos.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { BotonesNavegacionComponent } from './componentes/shared/botones-navegacion/botones-navegacion.component';
import { CardComponent } from './componentes/shared/card/card.component';
import { DetalleComponent } from './componentes/shared/detalle/detalle.component';
import { ModalConfirmacionComponent } from './componentes/shared/modal-confirmacion/modal-confirmacion.component';
import { EditarComponent } from './componentes/shared/editar/editar.component';
import { environment } from 'src/environments/environment';
import { RegistroComponent } from './componentes/registro/registro.component';
import { SnackBarComponent } from './componentes/shared/snack-bar/snack-bar.component';
import { LoginGuard } from './servicios/login.guard';

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
    DetalleComponent,
    EditarComponent,
    RegistroComponent,
    SnackBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    MatSnackBarModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    BolsosComponent,
    ArquerosComponent,
    DetalleBolsosComponent,
    DetalleArquerosComponent,
    CrearArqueroComponent,
    CrearBolsosComponent
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
