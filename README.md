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


<!-- 
Mover usuarios a dentro del club? 
Para crear usuarios debo hacer lo mismo que para bolsos y arqueros, crear un array y hacer push del nuevo usuario y luego hacer un put de todo el arreglo a la base de datos.
 -->

 <!-- En el crear arquero me está pisando el arquero creado, debe agregarse uno al arreglo no pisarse. -->

 <!-- En componenete login: 
 - al hacer un click en los inputs no toma el club seleccionado, se deben hacer dos clicks para obtener el valor del formulario. 
 - Boton Home no funciona. Va a quedar?
 -
 -->

 <!-- En el componente registro: 
 - Como se crea un nuevo club? 
 -->

<!-- Home:
- Redirección de logout debe ser a /ingesar, no funciona redireccionamiento pero se deja así por ahora. Queda la home vacía, pero al presionar en los botones de navegación te llevan al login por el guard.
-->

<!-- Bolsos:
- Editar bolso al hacer click en el boton me aparece el mensaje de ruta incorrecta.
- El bolso que estoy creando pisa a los viejos.
- Al eliminar bolso, la var mensajeVacío debe pasar a True para que se muestre el mensaje y no quede el scrol solo.
 -->

<!-- Modal:
- Boton Home no tiene clubParam.
-->

<!-- Servicios:
- Pasar servicios a donde corresponda.
-->

<!-- Router:
- Ver de reutilizar lo más posible el clubParam enviandoló y no tomandolo tantas veces de la url. 
-->

<!-- Featuring:
- Crear los bolsos por piezas para de esa manera poder contabilizar un stock de cantidad. 
-->

