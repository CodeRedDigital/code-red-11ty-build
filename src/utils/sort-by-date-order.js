/**
 * Takes a collection and returns it back in display order
 *
 * @param {Array} collection The 11ty collection
 * @returns {Array} the sorted collection
 */
module.exports = collection =>
  collection.sort((a, b) =>
    Date(a.date) > Date(b.date) ? 1 : -1
  );
