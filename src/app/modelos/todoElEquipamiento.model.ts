export class Equipamiento {
    parteEquipamiento: string;
    arquero: string;

    // urlImgBolso: string;

      constructor(obj: any) {
      this.parteEquipamiento = obj.nombreBolso;
      this.arquero = obj.arquero;

    //   this.urlImgBolso = obj.urlImgBolso;
    }

  }