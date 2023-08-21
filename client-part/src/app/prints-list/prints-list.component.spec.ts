import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintsListComponent } from './prints-list.component';

describe('PrintsListComponent', () => {
  let component: PrintsListComponent;
  let fixture: ComponentFixture<PrintsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
