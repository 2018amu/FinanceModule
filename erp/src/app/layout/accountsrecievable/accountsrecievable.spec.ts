import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accountsrecievable } from './accountsrecievable';

describe('Accountsrecievable', () => {
  let component: Accountsrecievable;
  let fixture: ComponentFixture<Accountsrecievable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accountsrecievable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accountsrecievable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
