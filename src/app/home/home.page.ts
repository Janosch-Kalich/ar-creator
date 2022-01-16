import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  create() {
    this.router.navigate(["/create"]);
  }

  upload() {
    this.router.navigate(["/upload"]);
  }

  yourmodels() {
    this.router.navigate(["your-models"]);
  }
}
