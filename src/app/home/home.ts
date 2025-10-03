import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  constructor(
    private route : Router
  ) {}

  protected title = 'reto1';

  onRute(){
    this.route.navigate(['/reto']);
  }
}
