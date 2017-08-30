import path from 'path';
import existsSync from 'exists-sync';
import httpProxy from 'http-proxy';
import handleProxyError from './handleProxyError';

const proxy = httpProxy.createProxyServer();

export default function createDevelopmentProxy(app) {
  // add error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
  proxy.on('error', handleProxyError);

  // eg /assets/*
  app.all(`${STATS.publicPath}*`, (req, res) => {
    // try to send the file from assets/*
    // if it doesn't exist, use the proxy instead
    const filename = path.join(__dirname, 'assets', path.basename(req.url));

    if (existsSync(filename)) {
      return res.sendFile(filename);
    }

    return proxy.web(req, res, {
      target: 'http://localhost:8080',
    });
  });
}
