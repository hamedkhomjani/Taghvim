export const toPersianDigits = (num: number | string): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num
        .toString()
        .replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

export const formatPersianDate = (date: Date): string => {
    return new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    }).format(date);
};

export const formatGregorianDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    }).format(date);
};

/**
 * Converts a Gregorian date string (YYYY-MM-DD) to a Persian date object
 */
export const gregToPersian = (date: Date) => {
    const parts = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).formatToParts(date);
    
    const findPart = (type: string) => parts.find(p => p.type === type)?.value || "";
    return {
        year: findPart('year'),
        month: findPart('month'),
        day: findPart('day')
    };
};

