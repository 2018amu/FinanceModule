import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fixedassets } from './fixedassets.component';

describe('Fixedassets', () => {
  let component: Fixedassets;
  let fixture: ComponentFixture<Fixedassets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fixedassets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fixedassets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
