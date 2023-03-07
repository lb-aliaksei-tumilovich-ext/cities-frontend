import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityEditorComponent } from './city-editor.component';

describe('CityEditorComponent', () => {
  let component: CityEditorComponent;
  let fixture: ComponentFixture<CityEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
