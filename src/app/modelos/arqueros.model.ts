export class Arqueros {
    nombreArquero: string;
    division: string;
    equipamientoPropio: string;
    equipamientoClub: string;

      constructor(obj: any) {
      this.nombreArquero = obj.nombreArquero;
      this.division = obj.division;
      this.equipamientoPropio = obj.equipamientoPropio;
      this.equipamientoClub = obj.equipamientoClub;
    }

  }