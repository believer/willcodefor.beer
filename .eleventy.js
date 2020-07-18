const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addWatchTarget("./_tmp/style.css");

  eleventyConfig.addPassthroughCopy({
    "./_tmp/style.css": "./style.css",
  });
  eleventyConfig.addPassthroughCopy({ "./_tmp/light.css": "./light.css" });
  eleventyConfig.addPassthroughCopy({ "./_tmp/dark.css": "./dark.css" });

  eleventyConfig.addShortcode("version", function() {
    return String(Date.now());
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
