import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceChildComponent } from './device-child.component';

describe('DeviceChildComponent', () => {
  let component: DeviceChildComponent;
  let fixture: ComponentFixture<DeviceChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
