import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modulesetup } from './modulesetup.component';

describe('Modulesetup', () => {
  let component: Modulesetup;
  let fixture: ComponentFixture<Modulesetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modulesetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modulesetup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
