import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeAboutComponent } from './real-time-about.component';

describe('RealTimeAboutComponent', () => {
  let component: RealTimeAboutComponent;
  let fixture: ComponentFixture<RealTimeAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
