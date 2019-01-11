import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemonitorComponent } from './themonitor.component';

describe('ThemonitorComponent', () => {
  let component: ThemonitorComponent;
  let fixture: ComponentFixture<ThemonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
