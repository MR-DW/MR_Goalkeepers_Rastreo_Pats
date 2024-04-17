// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  urlHome: '/',
  urlBolsos: '/bolsos',
  urlArqueros: '/arqueros',
  urlDetalleBolsos: '/bolsos/detalle-bolso/:id',
  urlDetalleArqueros: '/bolsos/detalle-arquero/:id',
  urlCrearArqueros: '/arqueros/crear-arquero',
  urlCrearBolsos: '/bolsos/crear-bolso',
  pathImgLocal: '../assets/img/',
  urlImg: 'gs://mrgoalkeepers-rastreo-pats.appspot.com',

  firebase: {
    apiKey: "AIzaSyA1TFVnXJaI0RqCgsbNH8v92EOpQLBL7E8",
    authDomain: "mr-goalkeepers-control-pats.firebaseapp.com",
    projectId: "mr-goalkeepers-control-pats",
    storageBucket: "mr-goalkeepers-control-pats.appspot.com",
    messagingSenderId: "721088633661",
    appId: "1:721088633661:web:e09a2e31df30db8856c354"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
