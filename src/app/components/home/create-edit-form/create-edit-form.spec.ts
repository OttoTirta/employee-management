import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditForm } from './create-edit-form';

describe('CreateEditForm', () => {
  let component: CreateEditForm;
  let fixture: ComponentFixture<CreateEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
