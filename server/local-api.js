import { existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createCorsHeaders, createInquiryResponse, isOriginAllowed } from './inquiry-mailer.js';

const port = Number(process.env.API_PORT || 8787);
const bodyLimit = 1024 * 1024;

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
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
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    request.on('error', reject);
  });
}

function sendJson(response, status, body, origin = '') {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    ...createCorsHeaders(origin),
  });
  response.end(JSON.stringify(body));
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const origin = request.headers.origin || '';
  const ip = request.headers['x-forwarded-for']?.split(',')[0]?.trim() || request.socket.remoteAddress || 'unknown';

  if (request.method === 'OPTIONS') {
    response.writeHead(isOriginAllowed(origin) ? 204 : 403, createCorsHeaders(origin));
    response.end();
    return;
  }

  if (url.pathname !== '/api/send-inquiry') {
    sendJson(response, 404, { message: 'Not found' }, origin);
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { message: 'Method not allowed' }, origin);
    return;
  }

  try {
    const payload = await readJsonBody(request);
    const result = await createInquiryResponse(payload, { origin, ip });
    sendJson(response, result.status, result.body, origin);
  } catch (error) {
    console.error('Local API error:', error);
    sendJson(response, 400, { message: 'Invalid request body' }, origin);
  }
});

server.listen(port, () => {
  console.log(`Grenady inquiry API running at http://127.0.0.1:${port}/api/send-inquiry`);
});
