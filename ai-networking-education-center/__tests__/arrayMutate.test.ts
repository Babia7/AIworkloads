import { describe, it, expect } from 'vitest';
import { arraySet, arraySetNested } from '../utils/arrayMutate';

describe('arraySet', () => {
  it('returns a new array reference', () => {
    const arr = [{ a: 1 }, { a: 2 }];
    const result = arraySet(arr, 0, 'a', 99);
    expect(result).not.toBe(arr);
  });

  it('returns a new object reference for the modified index', () => {
    const arr = [{ a: 1 }, { a: 2 }];
    const result = arraySet(arr, 0, 'a', 99);
    expect(result[0]).not.toBe(arr[0]);
  });

  it('sets the specified field on the target index', () => {
    const arr = [{ a: 1, b: 'x' }, { a: 2, b: 'y' }];
    const result = arraySet(arr, 1, 'b', 'z');
    expect(result[1].b).toBe('z');
  });

  it('does not mutate other indices', () => {
    const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const result = arraySet(arr, 1, 'a', 99);
    expect(result[0]).toBe(arr[0]);
    expect(result[2]).toBe(arr[2]);
  });

  it('does not mutate the original array', () => {
    const arr = [{ a: 1 }];
    arraySet(arr, 0, 'a', 99);
    expect(arr[0].a).toBe(1);
  });
});

describe('arraySetNested', () => {
  it('returns a new top-level array reference', () => {
    const arr = [{ items: [{ title: 'a' }] }];
    const result = arraySetNested(arr, 0, 'items', 0, 'title', 'b');
    expect(result).not.toBe(arr);
  });

  it('returns a new object reference for the modified top-level index', () => {
    const arr = [{ items: [{ title: 'a' }] }];
    const result = arraySetNested(arr, 0, 'items', 0, 'title', 'b');
    expect(result[0]).not.toBe(arr[0]);
  });

  it('returns a new nested array reference', () => {
    const arr = [{ items: [{ title: 'a' }] }];
    const result = arraySetNested(arr, 0, 'items', 0, 'title', 'b');
    expect(result[0].items).not.toBe(arr[0].items);
  });

  it('returns a new object reference for the modified nested index', () => {
    const arr = [{ items: [{ title: 'a' }] }];
    const result = arraySetNested(arr, 0, 'items', 0, 'title', 'b');
    expect(result[0].items[0]).not.toBe(arr[0].items[0]);
  });

  it('sets the specified nested field', () => {
    const arr = [{ items: [{ title: 'a', desc: 'old' }, { title: 'b', desc: 'also-old' }] }];
    const result = arraySetNested(arr, 0, 'items', 1, 'desc', 'new');
    expect(result[0].items[1].desc).toBe('new');
  });

  it('does not mutate the original nested array', () => {
    const arr = [{ items: [{ title: 'a' }] }];
    arraySetNested(arr, 0, 'items', 0, 'title', 'b');
    expect(arr[0].items[0].title).toBe('a');
  });
});
