import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ball } from './ball';

describe('Ball', () => {
  let component: Ball;
  let fixture: ComponentFixture<Ball>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ball]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ball);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
