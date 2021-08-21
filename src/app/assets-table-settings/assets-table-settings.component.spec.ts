import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsTableSettingsComponent } from './assets-table-settings.component';

describe('AssetsTableSettingsComponent', () => {
  let component: AssetsTableSettingsComponent;
  let fixture: ComponentFixture<AssetsTableSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsTableSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsTableSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
