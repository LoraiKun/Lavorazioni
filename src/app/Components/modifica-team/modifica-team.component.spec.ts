import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaTeamComponent } from './modifica-team.component';

describe('ModificaTeamComponent', () => {
  let component: ModificaTeamComponent;
  let fixture: ComponentFixture<ModificaTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
