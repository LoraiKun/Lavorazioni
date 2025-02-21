

export interface Risorsa {
  id: string;
  Nome: string;
  Cognome: string;
  Email: string;
  OreLavorative: number;
  Ruoli: string;
}

export interface Team {
  Risorse: Risorsa[];
}
