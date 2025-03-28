import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationAddFormComponentComponent } from './destination-add-form-component.component';

describe('DestinationAddFormComponentComponent', () => {
  let component: DestinationAddFormComponentComponent;
  let fixture: ComponentFixture<DestinationAddFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationAddFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationAddFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
