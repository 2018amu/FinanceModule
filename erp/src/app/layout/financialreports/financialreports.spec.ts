import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Financialreports } from './financialreports.component';

describe('Financialreports', () => {
  let component: Financialreports;
  let fixture: ComponentFixture<Financialreports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Financialreports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Financialreports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
