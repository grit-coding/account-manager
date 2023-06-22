import { convertArabicToRoman, memoizer } from './utils';
describe('convertArabicToRoman()', () => {
    test('arabicToRoman function should return correct results', () => {
        expect(convertArabicToRoman(1)).toBe('I');
        expect(convertArabicToRoman(2)).toBe('II');
        expect(convertArabicToRoman(3)).toBe('III');
        expect(convertArabicToRoman(4)).toBe('IV');
        expect(convertArabicToRoman(5)).toBe('V');
        expect(convertArabicToRoman(6)).toBe('VI');
        expect(convertArabicToRoman(7)).toBe('VII');
        expect(convertArabicToRoman(8)).toBe('VIII');
        expect(convertArabicToRoman(9)).toBe('IX');
        expect(convertArabicToRoman(100)).toBe('C');
        expect(convertArabicToRoman(500)).toBe('D');
        expect(convertArabicToRoman(1000)).toBe('M');
        expect(convertArabicToRoman(1950)).toBe('MCML');
        expect(convertArabicToRoman(1987)).toBe('MCMLXXXVII');
    });

    test('convertArabicToRoman function should throw error for invalid input', () => {
        expect(() => convertArabicToRoman(0)).toThrow();
        expect(() => convertArabicToRoman(-5)).toThrow();
        expect(() => convertArabicToRoman(1.5)).toThrow();
        expect(() => convertArabicToRoman(NaN)).toThrow();
    });
});

describe('memoizer()', () => {
    test('should throw an error if argument is not a function', () => {
        expect(() => memoizer(123 as any)).toThrowError("Argument should be a function");
    });

    test('should return a function', () => {
        expect(typeof memoizer(() => { })).toBe('function');
    });

    test('returns the same result as the original function', () => {
        const square = (n: number) => n * n;
        const memoizedSquare = memoizer(square);

        expect(memoizedSquare(5)).toBe(square(5));
    });

    test('returns the cached result when called with the same arguments', () => {
        const mockFn = jest.fn((n: number) => n * n);
        const memoizedMockFn = memoizer(mockFn);

        memoizedMockFn(5);
        memoizedMockFn(5);

        expect(mockFn).toHaveBeenCalledTimes(1);
    });
});