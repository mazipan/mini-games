module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css/fonts": "css/fonts" });
  eleventyConfig.addPassthroughCopy({ public: "/" });

  eleventyConfig.addFilter("categoryLabel", (category) => {
    const labels = {
      arcade: "Arcade",
      puzzle: "Puzzle",
      board: "Board",
      word: "Word",
    };
    return labels[category] || category;
  });

  eleventyConfig.addFilter("categoryColor", (category) => {
    const colors = {
      arcade: "bg-violet-500/20 text-violet-300 border-violet-500/30",
      puzzle: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      board: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      word: "bg-sky-500/20 text-sky-300 border-sky-500/30",
    };
    return colors[category] || "bg-slate-500/20 text-slate-300 border-slate-500/30";
  });

  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));

  eleventyConfig.addFilter("difficultyColor", (difficulty) => {
    const colors = {
      easy: "text-emerald-400",
      medium: "text-amber-400",
      hard: "text-red-400",
    };
    return colors[difficulty] || "text-slate-400";
  });

  return {
    cleanOutputDir: true,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
