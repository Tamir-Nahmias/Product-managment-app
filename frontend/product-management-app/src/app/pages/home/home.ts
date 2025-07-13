import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'home-page-app',
  imports: [CommonModule, RouterModule],
  styleUrl: 'home.css',
  templateUrl: 'home.html',
})
export class HomePage {}
