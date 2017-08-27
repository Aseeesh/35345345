import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFiltersComponent } from './flight-filters.component';

describe('FlightFiltersComponent', () => {
  let component: FlightFiltersComponent;
  let fixture: ComponentFixture<FlightFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
