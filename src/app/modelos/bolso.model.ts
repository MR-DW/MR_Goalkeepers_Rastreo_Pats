export class Bolso {
    id: string;
    nombreBolso: string;
    arquero: string;
    partes: string;
    estado: string;
    rastreo: string;

      constructor(obj: any) {
      this.id = obj.id;
      this.nombreBolso = obj.nombreBolso;
      this.arquero = obj.arquero;
      this.partes = obj.partes;
      this.estado = obj.estado;
      this.rastreo = obj.rastreo;
    }

  }