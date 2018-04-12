import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Marble Monday!';

  constructor(
    public router: Router
  ) { }

  dash() {
    this.router.navigate(['/dashboard']);
  }

  dancers() {
    this.router.navigate(['/dancers']);
  }
}
