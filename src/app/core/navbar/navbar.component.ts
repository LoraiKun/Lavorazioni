import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarService } from '../../services/sidebar-service/sidebar.service';
import { DividerModule } from 'primeng/divider';
import { LoginService } from '../../services/auth/login.service';
import { DropdownModule } from 'primeng/dropdown';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SidebarModule, DividerModule, DropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isVisible: boolean = true
  email!: string
  dropdownOpen = false;
  @ViewChild('dropdownElement') dropdownElement!: ElementRef;



  constructor(private sidebarService: SidebarService, private loginService: LoginService) {
    
    if(loginService.getEmail()){
      this.email = loginService.getEmail()!
    }else{
      loginService.logOut()
    }

  }

  ngOnInit() {
    this.sidebarService.isVisible$.subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(){
    this.dropdownOpen = false;
    this.loginService.logOut()
    window.location.reload()
  }
}
