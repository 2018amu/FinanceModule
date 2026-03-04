import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Domaincomparison } from './domaincomparison.component';

describe('Domaincomparison', () => {
  let component: Domaincomparison;
  let fixture: ComponentFixture<Domaincomparison>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Domaincomparison]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Domaincomparison);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
