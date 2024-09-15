export function errorParser(errObj) {
    if (errObj.message) {
        return [errObj.message];
    }
    return Object.values(errObj).map((item) => {
        if (Array.isArray(item)) {
            return item[0];
        }
        return item
    });
}

export function dateFormater(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-EN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

export const maskedAccountNo = (accountNo) => {
    console.log(accountNo);
    return `**** **** **** ${accountNo.slice(-4)}`;
}
