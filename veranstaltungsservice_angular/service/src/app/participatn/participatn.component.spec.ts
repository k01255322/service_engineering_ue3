import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatnComponent } from './participatn.component';

describe('ParticipatnComponent', () => {
  let component: ParticipatnComponent;
  let fixture: ComponentFixture<ParticipatnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipatnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
