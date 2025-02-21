import { Component } from '@angular/core';
import { Risorsa } from '../../models/modelli lavorazione/team.models';
import { RisorseService } from '../../services/lavorazioni-service/lavorazioni.service';
import { TableModule } from 'primeng/table';
import { ModalComponent } from '../../Components/modal/modal.component';
import { AggiungiRisorsaComponent } from '../../Components/aggiungi-risorsa/aggiungi-risorsa.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-risorse',
  imports: [TableModule, ModalComponent, AggiungiRisorsaComponent, TooltipModule, ButtonModule],
  templateUrl: './risorse.component.html',
  styleUrl: './risorse.component.css'
})
export class RisorseComponent {
  // stati
  stato_NuovaRisorsaIsVisible:boolean = false
  // fine stati
  risorse!: Risorsa[]
  constructor(private risorseService: RisorseService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.risorseService.readRisorse().subscribe({
      next:(res)=>{
        this.risorse = res
        console.log(this.risorse)
      }
    })
  }

deleteRecord(risorsa: Risorsa){
  this.risorseService.deleteRisorse(risorsa.id).subscribe({
    next: (res)=>{
      console.log("risorsa eliminata correttamente")
      window.location.reload()

    }
  })
}
}
