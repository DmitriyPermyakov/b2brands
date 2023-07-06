import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitiComponent } from './quantiti.component';

describe('QuantitiComponent', () => {
  let component: QuantitiComponent;
  let fixture: ComponentFixture<QuantitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantitiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
