export class Arqueros {
    nombreArquero: string;
    division: string;
    equipamientoPropio: string;
    equipamientoClub: string;
    estadoEquipo: string;
    rastreoEquipo: string;

      constructor(obj: any) {
      this.nombreArquero = obj.nombreArquero;
      this.division = obj.division;
      this.estadoEquipo = obj.estadoEquipo;
      this.rastreoEquipo = obj.rastreoEquipo;
      this.equipamientoPropio = obj.equipamientoPropio;
      this.equipamientoClub = obj.equipamientoClub;
    }

  }