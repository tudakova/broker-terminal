import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOverviewSettingsComponent } from './dialog-overview-settings.component';

describe('DialogOverviewSettingsComponent', () => {
  let component: DialogOverviewSettingsComponent;
  let fixture: ComponentFixture<DialogOverviewSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOverviewSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOverviewSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
