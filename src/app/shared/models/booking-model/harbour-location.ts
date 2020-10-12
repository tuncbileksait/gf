export class HarbourLocation{
  idOrCode : string;
  name: string;
  country: string;

  constructor(  idOrCode : string, name: string, country: string){
    this.idOrCode = idOrCode;
    this.name = name;
    this.country = country;
  }
}



