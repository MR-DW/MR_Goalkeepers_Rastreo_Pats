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
  urlImg:'https://firebasestorage.googleapis.com/v0/b/mrgoalkeepers-rastreo-pats.appspot.com/o/',
  urlImgBolso:'https://firebasestorage.googleapis.com/v0/b/mrgoalkeepers-rastreo-pats.appspot.com/o/bolsos%2F',
  urlImgBolsosFinal: '?alt=media',

  firebase: {
    apiKey: "AIzaSyCli6bmpwgT4vkNapbS0xFlF7P0BbQ5nbI",
    authDomain: "mrgoalkeepers-rastreo-pats.firebaseapp.com",
    databaseURL: "https://mrgoalkeepers-rastreo-pats-default-rtdb.firebaseio.com",
    projectId: "mrgoalkeepers-rastreo-pats",
    storageBucket: "mrgoalkeepers-rastreo-pats.appspot.com",
    messagingSenderId: "210599205938",
    appId: "1:210599205938:web:08cc582a66d077da67302b"
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
