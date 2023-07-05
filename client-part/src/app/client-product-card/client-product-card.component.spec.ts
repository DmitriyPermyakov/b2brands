import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProductCardComponent } from './client-product-card.component';

describe('ClientProductCardComponent', () => {
  let component: ClientProductCardComponent;
  let fixture: ComponentFixture<ClientProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
