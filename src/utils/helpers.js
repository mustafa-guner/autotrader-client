function errorParser(errObj) {
    return Object.values(errObj).map((item) => item);
}
export default errorParser;