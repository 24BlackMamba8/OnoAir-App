import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationEditFormComponent } from './destination-edit-form.component';

describe('DestinationEditFormComponent', () => {
  let component: DestinationEditFormComponent;
  let fixture: ComponentFixture<DestinationEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
