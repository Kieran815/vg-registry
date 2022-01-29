import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreationPopupComponent } from './list-creation-popup.component';

describe('ListCreationPopupComponent', () => {
  let component: ListCreationPopupComponent;
  let fixture: ComponentFixture<ListCreationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCreationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
