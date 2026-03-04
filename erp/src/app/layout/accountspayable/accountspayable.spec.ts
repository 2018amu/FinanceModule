import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accountspayable } from './accountspayable';

describe('Accountspayable', () => {
  let component: Accountspayable;
  let fixture: ComponentFixture<Accountspayable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accountspayable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accountspayable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
