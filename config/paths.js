import path from 'path';
import fs from 'fs';
import url from 'url';

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(pathStr, needsSlash) {
  const hasSlash = pathStr.endsWith('/');
  if (hasSlash && !needsSlash) {
    return pathStr.substr(pathStr, pathStr.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${pathStr}/`;
  }

  return pathStr;
}

// eslint-disable-next-line
const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/assets/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
export default {
  root: resolveApp(''),
  dotenv: resolveApp('.env'),
  appDist: resolveApp('dist'),
  appAssets: resolveApp('dist/main/assets'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  serverIndexJs: resolveApp('server/index.js'),
  serverClusterJs: resolveApp('server/cluster.js'),
  serverRecords: resolveApp('dist/main/records.json'),
  statsJson: resolveApp('dist/stats.json'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
};
