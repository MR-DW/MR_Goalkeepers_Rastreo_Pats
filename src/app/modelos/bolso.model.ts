export class Bolso {
    nombreBolso: string;
    arquero: string;
    partes: string;
    estado: string;
    rastreo: string;
    urlImgBolso: string;

      constructor(obj: any) {
      this.nombreBolso = obj.nombreBolso;
      this.arquero = obj.arquero;
      this.partes = obj.partes;
      this.estado = obj.estado;
      this.rastreo = obj.rastreo;
      this.urlImgBolso = obj.urlImgBolso;
    }

  }