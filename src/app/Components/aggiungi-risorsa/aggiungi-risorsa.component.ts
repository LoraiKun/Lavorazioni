import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AziendaService, RisorseService } from '../../services/lavorazioni-service/lavorazioni.service';
import { Risorsa } from '../../models/modelli lavorazione/team.models';
import { Azienda } from '../../models/modelli lavorazione/aziende.models';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-aggiungi-risorsa',
  imports: [ReactiveFormsModule, CommonModule, ButtonModule],
  templateUrl: './aggiungi-risorsa.component.html',
  styleUrl: './aggiungi-risorsa.component.css'
})
export class AggiungiRisorsaComponent {
form!: FormGroup
listaAziende!: Azienda[]
@Input() modalita: 'aggiungi' | 'modifica' = 'aggiungi'
@Output() evento_modifica: EventEmitter<Risorsa> = new EventEmitter<Risorsa>()
constructor(private risorseService: RisorseService, private aziendaService: AziendaService){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.form= new FormGroup({
    Nome: new FormControl (null, Validators.required),
    Cognome: new FormControl (null, Validators.required),
    Email: new FormControl (null, Validators.required),
    OreLavorative: new FormControl (null, Validators.required),
    Ruoli: new FormControl (null),
  })
  this.aziendaService.readAzienda().subscribe({
    next:(res)=>{
      this.listaAziende = res
    }
  })

}
aggiungi(){
  let elementoDaAggiungere = this.form.value

  this.risorseService.writeRisorse(elementoDaAggiungere).subscribe({
    next: (res)=>{
      console.log('operazione completata')
      window.location.reload()
    }
  })
}
selectID(){
  // console.log(this.listaAziende.filter(azienda => azienda.Id == this.form.value.AziendaId)[0].Denominazione)
this.form.value.Azienda= this.listaAziende.filter(azienda => azienda.id == this.form.value.AziendaId)[0].Denominazione
console.log(this.form.valid)
}


}
