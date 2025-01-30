import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu visibility', () => {
    expect(component.menuOpen).toBeFalse();

    component.toggleMenu();
    expect(component.menuOpen).toBeTrue();

    component.toggleMenu();
    expect(component.menuOpen).toBeFalse();
  });

  it('should toggle admin dropdown visibility', () => {
    expect(component.dropdownOpen.admin).toBeFalse();

    component.toggleDropdown('admin');
    expect(component.dropdownOpen.admin).toBeTrue();

    component.toggleDropdown('admin');
    expect(component.dropdownOpen.admin).toBeFalse();
  });

  it('should toggle user dropdown visibility', () => {
    expect(component.dropdownOpen.user).toBeFalse();

    component.toggleDropdown('user');
    expect(component.dropdownOpen.user).toBeTrue();

    component.toggleDropdown('user');
    expect(component.dropdownOpen.user).toBeFalse();
  });

  it('should close all dropdowns', () => {
    component.dropdownOpen.admin = true;
    component.dropdownOpen.user = true;

    component.closeAllDropdowns();

    expect(component.dropdownOpen.admin).toBeFalse();
    expect(component.dropdownOpen.user).toBeFalse();
  });

  it('should navigate and close menus', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.menuOpen = true;
    component.dropdownOpen.user = true;

    component.navigateTo('search-flight');

    expect(navigateSpy).toHaveBeenCalledWith(['search-flight']);
    expect(component.menuOpen).toBeFalse();
    expect(component.dropdownOpen.user).toBeFalse();
  });

  it('should close side menu when toggled off', () => {
    component.menuOpen = true;
    component.toggleMenu();
    expect(component.menuOpen).toBeFalse();
  });

  it('should open and close the dropdown independently', () => {
    component.toggleDropdown('user');
    expect(component.dropdownOpen.user).toBeTrue();

    component.toggleDropdown('user');
    expect(component.dropdownOpen.user).toBeFalse();
  });
});
