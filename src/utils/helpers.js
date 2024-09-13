function errorParser(errObj) {
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

export default errorParser;