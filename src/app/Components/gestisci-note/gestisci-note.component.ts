import { Component, Input } from '@angular/core';
import { Lavorazione } from '../../models/modelli lavorazione/lavorazioni.models';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LavorazioniService, TagService } from '../../services/lavorazioni-service/lavorazioni.service';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { Nota } from '../../models/modelli lavorazione/note.models';
import { MultiSelectModule } from 'primeng/multiselect';
import { TAGS } from '../../constants/tags';

@Component({
  selector: 'app-gestisci-note',
  imports: [ReactiveFormsModule, TextareaModule, SelectModule, ButtonModule, DatePipe, MultiSelectModule],
  templateUrl: './gestisci-note.component.html',
  styleUrl: './gestisci-note.component.css',
})
export class GestisciNoteComponent {
  tags = TAGS
  filter_selectedTags!: string[]
  filter_titolo!: string
  filter_autore!: string
  noteFiltrate!: Nota[]
  notaTarget?: number
  @Input() lavorazione!: Lavorazione;
  form!: FormGroup;
  modalita: 'visualizza' | 'modifica' = 'visualizza';
  tagList!: string[];
  tagAviabili!:string[];
  constructor(private fb: FormBuilder, private tagService: TagService, private lavorazioneService: LavorazioniService) {}
  get formTagArray(): FormArray {
    return this.form.get('Tag') as FormArray;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.fb.group({
      DataCreazione: [null],
      Descrizione: [null],
      Tag: this.fb.array([]),
      Titolo: [null],
      Autore: 'Lorenzo Dettori',
    });

    this.tagList = this.tagService.readTag()
    this.tagAviabili = this.tagList
    this.noteFiltrate = this.lavorazione.Note
  }
  addTag(tag: string){
    if(tag)this.formTagArray.push(new FormControl(tag)); // Ogni tag è un FormControl
    else{
      console.log('il tag non può essere vuoto')
    }
  }

  onSubmit(){

    if(this.lavorazione.Note){
      console.log(this.notaTarget)
      if(this.notaTarget){
        this.lavorazione.Note[this.notaTarget] = this.form.value
      }else{
        this.form.patchValue({
          DataCreazione: new Date()
        })
        this.lavorazione.Note.push(this.form.value)
      }
      console.log(this.lavorazione.Note)
    }else{
      this.form.patchValue({
        DataCreazione: new Date()
      })
      this.lavorazione.Note = [this.form.value]
    }
    this.lavorazioneService.updateLavorazioni(this.lavorazione.id, this.lavorazione).subscribe({
      next:()=>{
        console.log('operazione riuscita')
        // window.location.reload()
        this.modalita = 'visualizza'
      }
    })

  }

  deleteTag(index: number): void {
    this.formTagArray.removeAt(index);
  }
  // returnFormGroup(element: any){
  //   return element as FormGroup
  // }


  cambiaMod(index: number){
    this.notaTarget = index
    this.formTagArray.clear()
    this.lavorazione.Note[index].Tag.forEach(t=>{
      this.formTagArray.push(new FormControl(t))
    })
    this.form.patchValue({
      DataCreazione: [this.lavorazione.Note[index].DataCreazione],
      Descrizione: [this.lavorazione.Note[index].Descrizione],
      Titolo: [this.lavorazione.Note[index].Titolo],
      Autore: [this.lavorazione.Note[index].Autore],
    })
    this.modalita = 'modifica'
    console.log(this.notaTarget)
  }
  entraNuovaNota(){
    this.formTagArray.clear()
    this.form.patchValue({
      DataCreazione: [null],
      Descrizione: [null],
      Titolo: [null],
      Autore: ['Lorenzo Dettori'],
    })
    this.notaTarget = undefined
    this.modalita = 'modifica'
  }
  deleteNote(index: number){
    this.lavorazione.Note.splice(index, 1);
    this.lavorazioneService.updateLavorazioni(this.lavorazione.id, this.lavorazione).subscribe({
      next: ()=>{
        console.log('Operazione riuscita')
      }
    })  }

    selectTags(tags:string[]){
      this.filter_selectedTags = tags
      this.noteFiltrate = this.filtra()
    }
    filtraTitolo(titolo: string){
      this.filter_titolo = titolo
      this.noteFiltrate = this.filtra()
    }
    filtraAutore(autore: string){
      this.filter_autore = autore
      this.noteFiltrate = this.filtra()
    }
    filtra(){
      console.log('stai filtrando')
      return this.lavorazione.Note.filter(nota => {
        const titoloMatch =  this.filter_titolo? nota.Titolo.toLowerCase().includes(this.filter_titolo.toLowerCase()) : true;
        const autoreMatch = this.filter_autore ? nota.Autore.toLowerCase().includes(this.filter_autore.toLowerCase()) : true;
        const tagMatch = this.filter_selectedTags && this.filter_selectedTags.length > 0 
          ? this.filter_selectedTags.every(t => nota.Tag.map(tag => tag.toLowerCase()).includes(t.toLowerCase()))
          : true;
    
        return titoloMatch && autoreMatch && tagMatch;
      });
    }
}
