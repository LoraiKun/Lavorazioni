import {  Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Azienda } from '../../models/modelli lavorazione/aziende.models';
import {
  AziendaService,
  LavorazioniService,
  RisorseService,
} from '../../services/lavorazioni-service/lavorazioni.service';
import { CommonModule } from '@angular/common';
import { Lavorazione } from '../../models/modelli lavorazione/lavorazioni.models';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-lavorazione',
  imports: [ReactiveFormsModule, CommonModule, ButtonModule],
  templateUrl: './add-lavorazione.component.html',
  styleUrl: './add-lavorazione.component.css',
})
export class AddLavorazioneComponent {
  listaAziende!: Azienda[];
  form!: FormGroup;
  constructor(
    private aziendaService: AziendaService,
    private fb: FormBuilder,
    private lavorazioneService: LavorazioniService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.aziendaService.readAzienda().subscribe({
      next: (res) => {
        this.listaAziende = res;
      },
    });

    this.form = this.fb.group({
      Azienda: this.fb.group({
        id: [null, Validators.required],
        Denominazione: [null],
        Referente: [null],
        RecTelReferente: [null],
        Indirizzo: [null],
        Piva: [null], // Array dinamico di ruoli
      }),
      Descrizione: [null, Validators.required],
      DataLavorazione: [new Date().toISOString().split('T')[0]],
      TempiSviluppo: [null],
      StatoLavorazione: ['In corso'],
      Risorse: this.fb.array([]),
    });

  }






  onSubmit() {
    const newLavorazione: Lavorazione = this.form.value
    console.log('lavorazione copia:' ,newLavorazione, "lavorazione originale:", this.form.value)
    this.lavorazioneService.writeLavorazioni(newLavorazione).subscribe({
      next:(res)=>{
        console.log('Successo!')
        window.location.reload()
      }
    })
  }
  selezionaAzienda(event: any) {
    const aziendaSelezionata = this.listaAziende.find(a => a.id == event.target.value);
    console.log(event.target.value)
    if (aziendaSelezionata) {
      this.form.get('Azienda')?.patchValue({
        Denominazione: aziendaSelezionata.Denominazione,
        Referente: aziendaSelezionata.Referente,
        RecTelReferente: aziendaSelezionata.RecTelReferente,
        Indirizzo: aziendaSelezionata.Indirizzo,
        Piva: aziendaSelezionata.Piva
      });
    }
    console.log(this.form.value)
  }

  
  
}
