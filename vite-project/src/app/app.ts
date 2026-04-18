import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { factorial } from 'math-lib';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly counter: WritableSignal<number> = signal<number>(0);
  protected readonly title: WritableSignal<string> = signal<string>('vite-project');

  constructor() {
    console.log(factorial(13));
  }
}
