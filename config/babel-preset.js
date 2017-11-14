const plugins = [];

if (process.env.BABEL_ENV === 'production') {
  plugins.push(['styled-components', { ssr: true, displayName: false, minify: true }]);
} else {
  plugins.push(['styled-components', { ssr: true, displayName: true, minify: false }]);
}

module.exports = {
  presets: ['react', 'env', 'stage-2', 'flow'],
  plugins,
};
