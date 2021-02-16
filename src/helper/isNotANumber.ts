export const isNotANumber = (s: any): boolean => {
    if (typeof s === 'number') {
        return false;
    }
    if (typeof s === 'string') {
        return isNaN(Number(s))
    }
    return true;
};
