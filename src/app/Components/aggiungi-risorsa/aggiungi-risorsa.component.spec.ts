import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiRisorsaComponent } from './aggiungi-risorsa.component';

describe('AggiungiRisorsaComponent', () => {
  let component: AggiungiRisorsaComponent;
  let fixture: ComponentFixture<AggiungiRisorsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiungiRisorsaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiungiRisorsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
