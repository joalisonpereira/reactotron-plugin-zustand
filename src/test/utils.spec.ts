import { describe, it, expect } from 'vitest';
import { omitFunctionRecursively } from '../utils';

describe('omitFunctionRecursively', () => {
  it('should return the input as is when enable is false', () => {
    const input = { a: 1, b: () => {}, c: { d: 2 } };

    const result = omitFunctionRecursively(input, false);

    expect(result).toEqual(input);
  });

  it('should omit functions from an object', () => {
    const input = { a: 1, b: () => {}, c: { d: 2, e: () => {} } };

    const expected = { a: 1, c: { d: 2 } };

    const result = omitFunctionRecursively(input, true);

    expect(result).toEqual(expected);
  });

  it('should omit functions from an array', () => {
    const input = [1, () => {}, { a: 2, b: () => {} }];

    const expected = [1, { a: 2 }];

    const result = omitFunctionRecursively(input, true);

    expect(result).toEqual(expected);
  });

  it('should handle nested structures', () => {
    const input = { a: 1, b: { c: () => {}, d: { e: 2, f: () => {} } } };

    const expected = { a: 1, b: { d: { e: 2 } } };

    const result = omitFunctionRecursively(input, true);

    expect(result).toEqual(expected);
  });

  it('should handle arrays within objects', () => {
    const input = { a: [1, () => {}, 2], b: { c: [3, () => {}, 4] } };

    const expected = { a: [1, 2], b: { c: [3, 4] } };

    const result = omitFunctionRecursively(input, true);

    expect(result).toEqual(expected);
  });

  it('should handle empty objects and arrays', () => {
    const input = { a: {}, b: [] };

    const expected = { a: {}, b: [] };

    const result = omitFunctionRecursively(input, true);

    expect(result).toEqual(expected);
  });
});
