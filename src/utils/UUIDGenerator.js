/**
 * @name UUIDGenerator.js
 * @type { function }
 * @returns { String }
 * @description This file contains a utility function which is used to
 *              generate unique id for user created cards.
 */

export const generateUUID = () => {

    function s4() {

        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};