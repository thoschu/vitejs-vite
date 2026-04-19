import {Component, effect, input, InputSignal, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly counter: WritableSignal<number> = signal<number>(0);
  protected readonly title: WritableSignal<string> = signal<string>('');
  public readonly hello: InputSignal<string> = input<string>('vite-project');

  constructor() {
    effect(() => {
      const inputValue: string = this.hello();

      this.title.set(`${inputValue}!`);
    });
  }
}
