import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bankandreconciliation } from './bankandreconciliation.component';

describe('Bankandreconciliation', () => {
  let component: Bankandreconciliation;
  let fixture: ComponentFixture<Bankandreconciliation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bankandreconciliation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bankandreconciliation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
