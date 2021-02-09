// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const fromNowDateFilter = require('./src/filters/fromNow-date-filter.js');

const sortByDateOrder = require('./src/utils/sort-by-date-order.js');
module.exports = config => {
    // Add filters
    config.addFilter('dateFilter', dateFilter);
    config.addFilter('w3DateFilter', w3DateFilter);
    config.addFilter('fromNowDateFilter', fromNowDateFilter);
    // Set directories to pass through to the dist folder
    config.addPassthroughCopy('./src/images/');
    // Returns posts items, sorted by display order
    config.addCollection('posts', collection => {
      return sortByDateOrder(collection.getFilteredByGlob('./src/posts/*.html'));
    });
    
    // Returns posts items, sorted by display order then filtered by featured
    config.addCollection('featuredPosts', collection => {
      return sortByDateOrder(collection.getFilteredByGlob('./src/posts/*.html')).filter(
        x => x.data.featured
      );
    });
    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
      dir: {
        input: 'src',
        output: 'dist'
      }
    };
};