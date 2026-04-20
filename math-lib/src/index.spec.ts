import { expect, test, type TestContext } from 'vitest';
import { average, sum, factorial } from './index.ts';

test('template', (testContext: TestContext & object): void => {
  console.log(testContext);
  // arrange
  // act
  // assert
});

test('average of 1, 7 and 13 and expect 7', (): void => {
  // arrange
  const first: number = 1;
  const second: number = 7;
  const third: number = 13;

  // act
  const result: number = average(first, second, third);

  // assert
  const expected: number = 7;
  expect(result).toBe(expected);
});

test('add 1 and 6 and expect 7', (): void => {
  const first: number = 1;
  const second: number = 6;
  const result: number = sum(first, second);
  const expected: number = 7;

  expect(result).toBe(expected);
});

test('factorial of 7 and expect 7', (): void => {
  const first: number = 7;
  const result: number = factorial(first);
  const expected: number = 5040;

  expect(result).toBe(expected);
});
