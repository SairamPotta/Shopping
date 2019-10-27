import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNavbarComponent } from './app-navbar.component';

describe('BsNavbarComponent', () => {
  let component: AppNavbarComponent;
  let fixture: ComponentFixture<AppNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
