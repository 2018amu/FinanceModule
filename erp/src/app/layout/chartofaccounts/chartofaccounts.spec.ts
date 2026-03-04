import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chartofaccounts } from './chartofaccounts.component';

describe('Chartofaccounts', () => {
  let component: Chartofaccounts;
  let fixture: ComponentFixture<Chartofaccounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chartofaccounts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chartofaccounts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
