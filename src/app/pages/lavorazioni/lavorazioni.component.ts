import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Lavorazione } from '../../models/modelli lavorazione/lavorazioni.models';
import { LavorazioniService } from '../../services/lavorazioni-service/lavorazioni.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalComponent } from '../../Components/modal/modal.component';
import { AddLavorazioneComponent } from '../../Components/add-lavorazione/add-lavorazione.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ModificaTeamComponent } from '../../Components/modifica-team/modifica-team.component';
import { GestisciNoteComponent } from '../../Components/gestisci-note/gestisci-note.component';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-lavorazioni',
  imports: [TableModule, DatePipe, ModalComponent, AddLavorazioneComponent, TooltipModule, ButtonModule, ModificaTeamComponent, CommonModule, GestisciNoteComponent, MultiSelectModule],
  templateUrl: './lavorazioni.component.html',
  styleUrl: './lavorazioni.component.css'
})
export class LavorazioniComponent {
  lavorazioneAttuale!: Lavorazione
  stato_gestisciTeam: boolean = false
  stato_gestisciNote: boolean = false
  isVisible = false
  lavorazioni!: Lavorazione[]
  constructor(private lavorazioneService:LavorazioniService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.lavorazioneService.readLavorazioni().subscribe({
      next: (res) =>{
        this.lavorazioni = res
        console.log(this.lavorazioni)
      },
      error:(e)=>{
        console.log('Errore:',e)
      }
    })
  }
  eliminaLavorazione(id: string){
    this.lavorazioneService.deleteLavorazioni(id).subscribe({
      next:()=>{
        window.location.reload()
      }
    })
  }
  gestisciTeam(lavorazioneAttuale: Lavorazione){
    this.lavorazioneAttuale = lavorazioneAttuale
    this.stato_gestisciTeam = true
  }
  gestisciNote(lavorazioneAttuale: Lavorazione){
    this.lavorazioneAttuale = lavorazioneAttuale
    this.stato_gestisciNote = true
  }
}
