/**
 * @name FormValidator.js
 * @type { function }
 * @param { String } data
 * @returns { Boolean } 
 * @description This file contains all validation related stuff,
 *              every function returns a boolean which signifies
 *              if the field is valid or not.
 */

export const isFieldBlank = (string_data) => {

    return string_data === null || string_data === '';
};