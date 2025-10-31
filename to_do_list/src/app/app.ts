import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {ListsComponent} from './lists/lists'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ListsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('to_do_list');
}
