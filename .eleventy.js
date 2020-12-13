const htmlmin = require("html-minifier");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addWatchTarget("./_tmp/style.css");

  eleventyConfig.addPassthroughCopy({
    "./_tmp/style.css": "./style.css",
  });
  eleventyConfig.addPassthroughCopy({
    "./styles/dracula.css": "./dracula.css",
  });

  eleventyConfig.addShortcode("version", function() {
    return String(Date.now());
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Intl.DateTimeFormat("sv-SE").format(dateObj);
  });

  eleventyConfig.addFilter("noPostTag", (tags) => {
    return tags.filter((t) => t !== "post");
  });

  // Calculate days I've owned my keyboard
  eleventyConfig.addShortcode("keyboardDays", function() {
    const keyboardTime =
      new Date().getTime() - new Date("2016-09-21T00:00:00.000Z").getTime();
    const keyboardDays = (keyboardTime / (1000 * 60 * 60 * 24 * 365)).toFixed(
      2
    );

    return keyboardDays;
  });

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (
      process.env.NODE_ENV === "production" &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });
};
