import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCorsHeaders, createInquiryResponse, isOriginAllowed } from './inquiry-mailer.js';

const port = Number(process.env.PORT || 3000);
const bodyLimit = 1024 * 1024;
const distDir = fileURLToPath(new URL('../dist/', import.meta.url));
const indexFile = resolve(distDir, 'index.html');

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function sendJson(response, status, body, headers = {}) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    ...headers,
  });
  response.end(JSON.stringify(body));
}

function readJsonBody(request) {
  return new Promise((resolveBody, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;

      if (body.length > bodyLimit) {
        reject(new Error('Request body too large'));
        request.destroy();
      }
    });

    request.on('end', () => {
      if (!body) {
        resolveBody({});
        return;
      }

      try {
        resolveBody(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    request.on('error', reject);
  });
}

function normalizeStaticPath(pathname) {
  let normalizedPath = decodeURIComponent(pathname);

  if (normalizedPath === '/grenady') return '/';
  if (normalizedPath.startsWith('/grenady/')) {
    normalizedPath = normalizedPath.slice('/grenady'.length);
  }

  return normalizedPath;
}

function resolveStaticFile(pathname) {
  const normalizedPath = normalizeStaticPath(pathname);
  const requestedPath = normalizedPath === '/' ? '/index.html' : normalizedPath;
  const filePath = resolve(distDir, `.${requestedPath}`);

  if (!filePath.startsWith(resolve(distDir))) return null;
  if (existsSync(filePath) && statSync(filePath).isFile()) return filePath;
  if (existsSync(indexFile)) return indexFile;

  return null;
}

async function handleApiRequest(request, response) {
  const origin = request.headers.origin || '';
  const ip = request.headers['x-forwarded-for']?.split(',')[0]?.trim() || request.socket.remoteAddress || 'unknown';
  const corsHeaders = createCorsHeaders(origin);

  if (request.method === 'OPTIONS') {
    response.writeHead(isOriginAllowed(origin) ? 204 : 403, corsHeaders);
    response.end();
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { message: 'Method not allowed' }, corsHeaders);
    return;
  }

  try {
    const payload = await readJsonBody(request);
    const result = await createInquiryResponse(payload, { origin, ip });
    sendJson(response, result.status, result.body, corsHeaders);
  } catch {
    sendJson(response, 400, { message: 'Invalid request body' }, corsHeaders);
  }
}

function handleStaticRequest(request, response, pathname) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    sendJson(response, 405, { message: 'Method not allowed' });
    return;
  }

  const filePath = resolveStaticFile(pathname);

  if (!filePath) {
    sendJson(response, 404, { message: 'Not found' });
    return;
  }

  const extension = extname(filePath);
  const isAsset = filePath.includes('/assets/') || filePath.includes('\\assets\\');
  const headers = {
    'Content-Type': mimeTypes[extension] || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': isAsset ? 'public, max-age=31536000, immutable' : 'no-cache',
  };

  response.writeHead(200, headers);

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = url.pathname;

  if (pathname === '/healthz' || pathname === '/grenady/healthz') {
    sendJson(response, 200, { status: 'ok' });
    return;
  }

  if (pathname === '/api/send-inquiry' || pathname === '/grenady/api/send-inquiry') {
    await handleApiRequest(request, response);
    return;
  }

  handleStaticRequest(request, response, pathname);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Grenady production server listening on 0.0.0.0:${port}`);
});
