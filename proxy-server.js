/**
 * Quagga API用プロキシサーバー
 * CORSエラーを回避するためのシンプルなプロキシ
 */

import http from 'http';
import https from 'https';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 設定を読み込む
let config = {};
try {
  const configModule = await import('./config.js');
  config = configModule.config;
} catch (error) {
  console.error('config.jsの読み込みに失敗しました:', error.message);
  process.exit(1);
}

const PORT = 3000;
const QUAGGA_API_BASE = config.apiBase || 'https://quagga.studio/api/v1';
const MOCK_API_BASE = 'https://ranking-quagga.tiltpapa.workers.dev';

const server = http.createServer((req, res) => {
  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // プリフライトリクエストに対応
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // APIプロキシ
  if (req.url.startsWith('/api/')) {
    const apiPath = req.url.replace('/api', '');
    const targetUrl = config.debugMode 
      ? `${MOCK_API_BASE}${apiPath}`
      : `${QUAGGA_API_BASE}${apiPath}`;

    console.log(`プロキシ: ${req.method} ${targetUrl}`);

    const urlObj = new URL(targetUrl);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: req.method,
      headers: {}
    };

    // 本番環境の場合、Authorizationヘッダーを追加
    if (!config.debugMode && config.token) {
      options.headers['Authorization'] = `Bearer ${config.token}`;
    }

    const proxyReq = https.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (error) => {
      console.error('プロキシエラー:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    });

    req.pipe(proxyReq);
    return;
  }

  // 静的ファイルの配信
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.md': 'text/markdown'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code, 'utf-8');
      }
    } else {
      // キャッシュを無効化
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
  console.log(`デバッグモード: ${config.debugMode ? 'ON (モックAPI使用)' : 'OFF (本番API使用)'}`);
  console.log(`イベントID: ${config.eventId}`);
});
