import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lavorazione } from '../../models/modelli lavorazione/lavorazioni.models';
import { APIURL } from '../../constants/url';
import { Risorsa } from '../../models/modelli lavorazione/team.models';
import { Azienda } from '../../models/modelli lavorazione/aziende.models';
import { TAGS } from '../../constants/tags';

@Injectable({
  providedIn: 'root'
})
export class LavorazioniService {
  private jsonUrl = JSONURL
  private apiUrl = APIURL
  constructor(private http: HttpClient) {}
  readLavorazioni(){
    return this.http.get<Lavorazione[]>(this.apiUrl+this.jsonUrl.lavorazioni)
  }
  writeLavorazioni(lavorazione:Lavorazione){
    return this.http.post<any>(this.apiUrl+this.jsonUrl.lavorazioni, lavorazione);
  }
  deleteLavorazioni(id:string){
      return this.http.delete<any>(`${this.apiUrl+this.jsonUrl.lavorazioni}/${id}`);
  }
  updateLavorazioni(id: string, user: Lavorazione) {
    return this.http.put<any>(`${this.apiUrl+this.jsonUrl.lavorazioni}/${id}`, user);
  }

}

@Injectable({
  providedIn: 'root'
})
export class RisorseService{
  private jsonUrl = JSONURL
  private apiUrl = APIURL
  constructor(private http: HttpClient) {}
  readRisorse(){
    return this.http.get<Risorsa[]>(this.apiUrl+this.jsonUrl.risorse)
  }
  writeRisorse(lavorazione:Risorsa){
    return this.http.post<any>(this.apiUrl+this.jsonUrl.risorse, lavorazione);
  }
  deleteRisorse(id:string){
      return this.http.delete<any>(`${this.apiUrl+this.jsonUrl.risorse}/${id}`);
  }
  updateRisorse(id: string, user: Risorsa) {
    return this.http.put<any>(`${this.apiUrl+this.jsonUrl.risorse}/${id}`, user);
  }
}

@Injectable({
  providedIn: 'root'
})
export class TagService{
  tags = TAGS
  readTag(){
    return this.tags
  }

}

@Injectable({
  providedIn: 'root'
})
export class AziendaService{
  private jsonUrl = JSONURL
  private apiUrl = APIURL
  constructor(private http: HttpClient) {}
  readAzienda(){
    return this.http.get<Azienda[]>(this.apiUrl+this.jsonUrl.aziende)
  }
  writeAzienda(lavorazione:Azienda){
    return this.http.post<any>(this.apiUrl+this.jsonUrl.aziende, lavorazione);
  }
  deleteAzienda(id:string){
      return this.http.delete<any>(`${this.apiUrl+this.jsonUrl.aziende}/${id}`);
  }
  updateAzienda(id: string, user: Azienda) {
    return this.http.put<any>(`${this.apiUrl+this.jsonUrl.aziende}/${id}`, user);
  }
}
const JSONURL = {
  lavorazioni: 'Lavorazioni',
  aziende: 'Aziende',
  note: 'Note',
  risorse: 'Risorse',
  ruoli: 'Ruoli',
  team: 'Team',
  tag: 'Tag'
}