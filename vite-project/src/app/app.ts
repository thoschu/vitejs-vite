import {Component, effect, input, InputSignal, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { add } from 'ramda';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly counter: WritableSignal<number> = signal<number>(0);
  protected readonly title: WritableSignal<string> = signal<string>('');
  protected readonly R: Record<'add', (a: number, b: number) => number> = { add };
  public readonly hello: InputSignal<string> = input<string>('vite-project');

  constructor() {
    effect((): void => {
      const inputValue: string = this.hello();

      this.title.set(`${inputValue}!`);
    });
  }
}
