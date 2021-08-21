import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCellComponent } from './asset-cell.component';

describe('AssetCellComponent', () => {
  let component: AssetCellComponent;
  let fixture: ComponentFixture<AssetCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
