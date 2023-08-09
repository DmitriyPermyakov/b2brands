import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderItemComponent } from './add-order-item.component';

describe('AddOrderItemComponent', () => {
  let component: AddOrderItemComponent;
  let fixture: ComponentFixture<AddOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrderItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
