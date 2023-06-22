interface RomanNumerals {
    [key: string]: number;
}

type Function<T, R> = (arg: T) => R;

export const convertArabicToRoman = (num: number): string => {
    if (num <= 0 || !Number.isInteger(num)) {
        throw new Error('Input must be a positive whole number');
    }

    let romanNumerals: RomanNumerals = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let roman = '';

    for (let key in romanNumerals) {
        while (num >= romanNumerals[key]) {
            roman += key;
            num -= romanNumerals[key];
        }
    }

    return roman;
};

export const memoizer = <T, R>(func: Function<T, R>): Function<T, R> => {
    if (typeof func !== 'function') {
        throw new Error("Argument should be a function");
    }
    const cache = new Map<T, R>();

    return (arg: T): R => {
        if (cache.has(arg)) {
            return cache.get(arg) as R;
        } else {
            const result = func(arg);
            cache.set(arg, result);
            return result;
        }
    };
};
