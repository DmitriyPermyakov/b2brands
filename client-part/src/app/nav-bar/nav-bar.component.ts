import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  public isNavBarVisible:boolean = false;

  toWorkStage() {
    document.getElementById("workStage")?.scrollIntoView({ behavior: "smooth" });
  }

  toDelivery() {
    document.getElementById("delivery")?.scrollIntoView({ behavior: "smooth"});
  }

  toPartners() {
    document.getElementById("partners")?.scrollIntoView({ behavior: "smooth"});
  }

  showNavBar() {
    this.isNavBarVisible = !this.isNavBarVisible;
  }
}
