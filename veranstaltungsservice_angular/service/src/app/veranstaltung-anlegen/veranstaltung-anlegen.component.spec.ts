import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeranstaltungAnlegenComponent } from './veranstaltung-anlegen.component';

describe('VeranstaltungAnlegenComponent', () => {
  let component: VeranstaltungAnlegenComponent;
  let fixture: ComponentFixture<VeranstaltungAnlegenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeranstaltungAnlegenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeranstaltungAnlegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
