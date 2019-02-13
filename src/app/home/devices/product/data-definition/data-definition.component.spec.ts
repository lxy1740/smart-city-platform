import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDefinitionComponent } from './data-definition.component';

describe('DataDefinitionComponent', () => {
  let component: DataDefinitionComponent;
  let fixture: ComponentFixture<DataDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
