import { Azienda } from "./aziende.models";
import { Nota } from "./note.models";
import { Risorsa, Team } from "./team.models";

// export class Lavorazione {
//     Descrizione: string;
//     NumeroOfferta: string;
//     Azienda!: Azienda;
//     DataLavorazione: Date;
//     TempiSviluppo: string;
//     StatoLavorazione: string;
//     TeamAssociato!: Team;
//     Note: Nota[];

//     constructor(
//         Descrizione: string = '',
//         NumeroOfferta: string = '',
//         DataLavorazione: Date = new Date(),
//         TempiSviluppo: string = '',
//         StatoLavorazione: string = '',
//         Note: Nota[] = []
//     ) {
//         this.Descrizione = Descrizione;
//         this.NumeroOfferta = NumeroOfferta;
//         this.DataLavorazione = DataLavorazione;
//         this.TempiSviluppo = TempiSviluppo;
//         this.StatoLavorazione = StatoLavorazione;
//         this.Note = Note;
//     }

 
// }

export interface Lavorazione {
    id: string
    Descrizione: string;
    NumeroOfferta: string;
    Azienda: Azienda;
    DataLavorazione: Date;
    TempiSviluppo: string;
    StatoLavorazione: string;
    Risorse: Risorsa[];
    Note: Nota[];
}