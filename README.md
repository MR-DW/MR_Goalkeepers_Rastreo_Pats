# MRGoalkeepersRastreoPats

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
"# MR_Goalkeepers_Rastreo_Pats" 


Instalar:
npm install
npm install -g firebase -tools
ng add @angular/material

Si da error en este archivo dentro del noce_module: rxfire, instalar: 
npm install rxfire@latest firebase@latest

Para usar firebase utilizar:
ng add @angular/fire
Y seleccionar las apps:
Cloud Storage / ng deploy -- hosting / Authentication


<!-- PARA SALIR A PRODUCCIÓN:

- En el componente de registro colocar mensajes de minimo 6 caracteres y maximo 10 caracteres o quitarle la limitacion de caracteres max.
- En el componente de registro manejar error de EMAIL_EXISTS.
- En el componente Home cambiar el label del boton logout por salir.

-->



<!-- Featuring:

- Registro: Colocar advertencia que deben ser minimo 6 caracteres en contraseña.
- Registro: Verificación de registro, con envío de email o sms.
- Login: Permitir recuperar contraseña.
- Arqueros: al crear un arquero o editarlo, que pueda seleccionar de un dropdown el equipamiento que está utilizando en función a los equipamientos que ya están creados.
- Arqueros: Que el arquero traiga la info de su equipamiento o tenga un link que redirija a su equipamiento.

- Router: Ver de reutilizar lo más posible el clubParam enviandoló y no tomandolo tantas veces de la url.

- SNACKBAR: Crear un servicio y llamarlo desde ahí para no repetirlo en todos lados.

- BOLSOS:
. Aplicar estilos al dropdown de equipamiento y a la tabla que se renderiza. Ver tema imagenes. 
. Aplicar estilos en los botones de editar ubicacion y fecha, también en el formulario de ubicación.
. Se crea sección para editar la ubicación del equipamiento pero se deja suspendido el tema de colocarle fecha.
. Carrucel de fotos para subir foto de cada parte del equipamiento.
. Cambiar en todos los lados que diga bolso por equipamiento.

- ARQUEROS: Crear un componente que liste todos los arqueros, según linea en orden de división.

- Mejorar los permisos de quien puede eliminar en firebase.

- LOGIN: Se dispara un mensaje Error al loguearse bien.

-->

