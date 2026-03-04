import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Budjeting } from './budgeting.component';

describe('Budjeting', () => {
  let component: Budjeting;
  let fixture: ComponentFixture<Budjeting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Budjeting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Budjeting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
