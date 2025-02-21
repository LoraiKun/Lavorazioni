import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-modal',
  imports: [DialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
@Input() header!: string
@Input() isVisible: boolean = false
@Output() evento_hide: EventEmitter<void> = new EventEmitter<void>(false) 
hide(){
  this.evento_hide.emit()
}
}
