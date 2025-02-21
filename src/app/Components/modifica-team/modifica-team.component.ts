import {  Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import {
  RisorseService,
  LavorazioniService,
} from '../../services/lavorazioni-service/lavorazioni.service';
import { Risorsa } from '../../models/modelli lavorazione/team.models';
import { CommonModule } from '@angular/common';
import { Lavorazione } from '../../models/modelli lavorazione/lavorazioni.models';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modifica-team',
  imports: [ReactiveFormsModule, DividerModule, CommonModule, ButtonModule, ToastModule],
  templateUrl: './modifica-team.component.html',
  styleUrl: './modifica-team.component.css',
  providers: [MessageService]
})
export class ModificaTeamComponent {
  risorseSelezionate: string[] = []
  listaRisorse!: Risorsa[];
  form!: FormGroup;
  modalita: 'visualizza'|'modifica' = 'visualizza'; 
  @Input() lavorazione!: Lavorazione
  constructor(
    private risorseService: RisorseService,
    private fb: FormBuilder,
    private lavorazioneService: LavorazioniService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.risorseService.readRisorse().subscribe({
      next: (res) => {
        this.listaRisorse = res;
      },
    });
    this.form = this.fb.group({
      Risorse: this.fb.array([]),
    });

    this.lavorazione.Risorse.forEach(risorsa =>{
      this.risorse.push(
        this.fb.group({
          id: [risorsa.id],
          Nome: [risorsa.Nome],
          Cognome: [risorsa.Cognome],
          Email: [risorsa.Email],
          OreLavorative: [risorsa.OreLavorative],
          Ruoli: [risorsa.Ruoli], // Array dinamico di ruoli
        })
      );
    })
    if(this.risorse.length == 0){
      this.aggiungiRisorsa()
      this.risorse.controls[0].patchValue({
        Ruoli: 'Project Manager'
      })
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.modalita = 'visualizza'
  }

  get risorse(): FormArray {
    return this.form.get('Risorse') as FormArray;
  }
  aggiungiRisorsa(): void {
    this.risorse.push(
      this.fb.group({
        id: [null],
        Nome: [null],
        Cognome: [null],
        Email: [null],
        OreLavorative: [0],
        Ruoli: [''], // Array dinamico di ruoli
      })
    );
  }

  rimuoviRisorsa(index: number): void {
    this.risorseSelezionate= this.risorseSelezionate.filter(r=> r != this.risorse.at(index).value.id)
    console.log(this.risorseSelezionate)
    this.risorse.removeAt(index);


  }
  isAviable(id: string){
    let isAviable = true
    this.risorseSelezionate.forEach(r=>{
      if(r == id) isAviable = false
    })
    return isAviable
  }
  addRisorsa(i: number, event: any) {
    this.risorseSelezionate.push(event.target.value)
    const risorsaSelezionata = this.listaRisorse.find(
      (a) => a.id == event.target.value
    );
    console.log(this.risorseSelezionate);
    this.risorse.at(i).patchValue({
      Nome: risorsaSelezionata?.Nome,
      Cognome: risorsaSelezionata?.Cognome,
      Email: risorsaSelezionata?.Email,
      OreLavorative: '10',
    });
  }

  // getRisorseDisponibili(index: number) {
  //   const selectedId = this.risorse.at(index).value.id || null; 

  //   const selectedIds = this.risorse.controls
  //     .map((r, i) => (i !== index ? r.value.id : null)) 
  //     .filter((id) => id);

  //   return this.listaRisorse.filter(
  //     (r) => !selectedIds.includes(r.id) || r.id === selectedId
  //   );
  // }


  returnFormGroup(element: any){
    return element as FormGroup
  }
  onSubmit(){
    if(this.pmCheck()){
      const nuovaLavorazione = this.lavorazione
      nuovaLavorazione.Risorse = this.form.value.Risorse
      this.lavorazioneService.updateLavorazioni(nuovaLavorazione.id, nuovaLavorazione).subscribe({
        next:()=>{
          console.log('Operazione riuscita')
          window.location.reload()
        }
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'Errore', detail: 'Non è stato selezionato un Project Manager per il team.' });

    }

  }

  pmCheck(){
    let check:boolean = false
    this.risorse.controls.forEach(r=>{
      if(r.value.Ruoli == 'Project Manager') check = true
    })
    return check
  }
  cambiaMod(){
    if(this.modalita == 'modifica'){
      this.modalita = 'visualizza'
    }else{
      this.risorse.clear()
      this.lavorazione.Risorse.forEach(risorsa =>{
        this.risorse.push(
          this.fb.group({
            id: [risorsa.id],
            Nome: [risorsa.Nome],
            Cognome: [risorsa.Cognome],
            Email: [risorsa.Email],
            OreLavorative: [risorsa.OreLavorative],
            Ruoli: [risorsa.Ruoli], // Array dinamico di ruoli
          })
        );
      })
      this.modalita = 'modifica'
    }
  }

  setPM(risorsa: AbstractControl){
    this.risorse.controls.forEach(r=>{
      if(r.value.Ruoli == 'Project Manager'){
        r.patchValue({
          Ruoli: ''
        })
      }
    })
    risorsa.patchValue({
      Ruoli: 'Project Manager'
    })
  }

}
