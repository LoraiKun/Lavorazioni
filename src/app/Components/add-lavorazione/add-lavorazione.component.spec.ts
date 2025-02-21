import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLavorazioneComponent } from './add-lavorazione.component';

describe('AddLavorazioneComponent', () => {
  let component: AddLavorazioneComponent;
  let fixture: ComponentFixture<AddLavorazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLavorazioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLavorazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
