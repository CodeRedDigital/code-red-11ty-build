/**
 * Takes a date in format 2020-11-28 and returns 28 Nov 2020
 *
 * @param {Date} newDate The front matter date
 * @returns {String} the sorted collection
 */
module.exports = newDate => newDate.toDateString().slice(-11);