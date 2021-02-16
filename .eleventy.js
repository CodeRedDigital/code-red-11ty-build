const rssPlugin = require('@11ty/eleventy-plugin-rss');
// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const fromNowDateFilter = require('./src/filters/fromNow-date-filter.js');
// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';
const sortByDateOrder = require('./src/utils/sort-by-date-order.js');
module.exports = config => {
    // Add layouts
    config.addLayoutAlias('feed', 'feed.html');
    config.addLayoutAlias('home', 'home.html');
    config.addLayoutAlias('pages', 'pages.html');
    config.addLayoutAlias('posts', 'posts.html');
    config.addLayoutAlias('style-guide', 'style-guide.html');

    // Add filters
    config.addFilter('dateFilter', dateFilter);
    config.addFilter('w3DateFilter', w3DateFilter);
    config.addFilter('fromNowDateFilter', fromNowDateFilter);

    // Set directories to pass through to the dist folder
    config.addPassthroughCopy('./src/images/');
    // Only minify HTML if we are in production because it slows builds _right_ down
    if (isProduction) {
      config.addTransform('htmlmin', htmlMinTransform);
    }

    // Returns posts items, sorted by display order
    config.addCollection('posts', collection => {
      return sortByDateOrder(collection.getFilteredByGlob('./src/posts/*.html'));
    });
    // Plugins
    config.addPlugin(rssPlugin);
    // Returns posts items, sorted by display order then filtered by featured
    config.addCollection('featuredPosts', collection => {
      return sortByDateOrder(collection.getFilteredByGlob('./src/posts/*.html')).filter(
        x => x.data.featured
      );
    });
    // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
    config.setUseGitIgnore(false);

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'dist',
            includes: '_includes',
            layouts: '_includes/layouts',
        }
    };
};