import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent, { UserEvent } from '@testing-library/user-event';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    await render<App>(App, {
      inputs: {
        hello: 'vite-project'
      }
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = <HTMLElement>fixture.nativeElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, vite-project');
  });

  it('test h1 text', async () => {
    const header: HTMLElement = screen.getByRole('heading');

    expect(header.textContent).toBe('Hello, vite-project!');
  });

  test('renders the current value and can increment', async (): Promise<void> => {
    const user: UserEvent = userEvent.setup();
    const incrementControl: HTMLElement = screen.getByRole('button');

    await user.click(incrementControl);

    fireEvent.click(incrementControl);

    expect(incrementControl.textContent).toBe('2');
  });
});
