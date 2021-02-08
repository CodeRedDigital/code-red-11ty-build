/**
 * Takes a collection and returns it back in display order
 *
 * @param {Array} collection The 11ty collection
 * @returns {Array} the sorted collection
 */
module.exports = collection =>
  collection.sort((a, b) =>
    Number(a.data.date) > Number(b.data.date) ? 1 : -1
  );
