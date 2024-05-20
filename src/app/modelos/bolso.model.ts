export class Bolso {
    nombreBolso: string;
    arquero: string;
    observaciones: string;
    ubicacion: string;
    casco: string;
    cuello: string;
    pechera: string;
    coderas: string;
    guantes: string;
    inguinal: string;
    bermuda: string;
    legguards: string;
    kickers: string;
    bolso: string;

    urlImgBolso: string;

      constructor(obj: any) {
      this.nombreBolso = obj.nombreBolso;
      this.arquero = obj.arquero;
      this.observaciones = obj.observaciones;
      this.ubicacion = obj.ubicacion;
      this.casco = obj.casco;
      this.cuello = obj.cuello;
      this.pechera = obj.pechera;
      this.coderas = obj.coderas;
      this.guantes = obj.guantes;
      this.inguinal = obj.inguinal;
      this.bermuda = obj.bermuda;
      this.legguards = obj.legguards;
      this.kickers = obj.kickers;
      this.bolso = obj.bolso;

      this.urlImgBolso = obj.urlImgBolso;
    }

  }