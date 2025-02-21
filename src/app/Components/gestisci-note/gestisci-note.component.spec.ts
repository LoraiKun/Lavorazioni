import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestisciNoteComponent } from './gestisci-note.component';

describe('GestisciNoteComponent', () => {
  let component: GestisciNoteComponent;
  let fixture: ComponentFixture<GestisciNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestisciNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestisciNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
