const sortByDateOrder = require('./src/utils/sort-by-date-order.js');
module.exports = config => {
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