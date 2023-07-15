import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  public isNavBarVisible:boolean = false;


  ngOnInit(): void {
    this.isNavBarVisible = window.innerWidth > 600;   
    
  }

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
