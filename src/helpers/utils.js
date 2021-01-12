
/**
* @description get getir status code format
* @param {number} statusCode http status code
* @function getHttpCode

* @returns {number} getir status code format
*/
export const getHttpCode = (statusCode) => statusCode < 400 ? 0 : 1


/**
* @description format error messages from validation
* @param {Object[]} errors http status code
* @param {string} errors[].message validation error message
* @param {Object[]} errors[].path validation error message
* @param {string} errors[].path[] path of failed validation
* @function formatErrors

* @returns {Object[]} getir status code format
* @param {string} errors[].message validation error message
* @param {string} errors[].path validation error message
*/
export const formatErrors = error => error.map(err => ({ message: err.message, path: err.path[0] }))
