import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navbarNav', { static: false }) navbarNav!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    // Ensure that the navbarNav is available after the view has initialized
    console.log(this.navbarNav);
  }

  collapseNavbar(): void {
    // Ensure navbarNav is defined before accessing nativeElement
    if (this.navbarNav) {
      this.navbarNav.nativeElement.classList.remove('show');
    } else {
      console.error('navbarNav is undefined');
    }
  }
}
