# Grenady VPS Deployment

Diese Anleitung bereitet Grenady für Docker, GitHub Container Registry und Deployment auf einen VPS vor. Der Mailversand läuft im Container über Nodemailer + SMTP und nutzt die SMTP-Zugangsdaten aus `/opt/grenady/.env`.

## Ergebnis

- Docker Image: `ghcr.io/<owner>/<repo>:latest`
- Docker Image mit Commit: `ghcr.io/<owner>/<repo>:<commit-sha>`
- Container-Name: `grenady-app`
- Deployment-Pfad: `/opt/grenady`
- Interner Container-Port: `3000`
- VPS-Port-Binding: `127.0.0.1:3000:3000`
- Nginx leitet von `grenady.de` und `www.grenady.de` intern an `http://127.0.0.1:3000`

## GitHub Secrets

In GitHub setzen unter:

`GitHub Repository -> Settings -> Secrets and variables -> Actions -> New repository secret`

Pflicht:

```text
VPS_HOST
VPS_USER
VPS_SSH_KEY
VPS_PORT
```

Optional, falls das GHCR Package privat ist:

```text
GHCR_PAT
```

`GHCR_PAT` braucht mindestens `read:packages`. SMTP-Zugangsdaten kommen nicht in GitHub Secrets, sondern nur in `/opt/grenady/.env` auf dem VPS.

## ENV-Datei auf dem VPS

Diese Datei liegt nur auf dem VPS und wird nicht aus GitHub deployt:

```bash
sudo mkdir -p /opt/grenady
sudo nano /opt/grenady/.env
```

Beispiel:

```env
NODE_ENV=production
PORT=3000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mail@example.com
SMTP_PASS=dein-smtp-passwort
SMTP_FROM="Grenady <mail@grenady.de>"
INQUIRY_RECIPIENT_EMAIL=ishakfeuer@gmail.com
INQUIRY_ALLOWED_ORIGIN=https://grenady.de,https://www.grenady.de
```

Im aktuellen Projekt verwendete Runtime-Variablen:

```text
NODE_ENV
PORT
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
SMTP_FROM
INQUIRY_RECIPIENT_EMAIL
INQUIRY_ALLOWED_ORIGIN
```

Nur lokale Entwicklung:

```text
API_PORT
```

Nur Build-time, im VPS-Container normalerweise nicht nötig:

```text
VITE_INQUIRY_API_URL
VITE_BASE_PATH
```

## Lokal testen

1. `.env.local` aus `.env.example` erstellen.
2. SMTP-Testdaten eintragen, zum Beispiel vom echten Mailprovider oder einem SMTP-Testpostfach.
3. Für Vite lokal setzen:

```env
INQUIRY_ALLOWED_ORIGIN=http://127.0.0.1:5173
```

4. Installieren und prüfen:

```bash
npm ci
npm run lint
VITE_BASE_PATH=/ npm run build
```

5. Entwicklungsmodus:

```bash
npm run dev:api
npm run dev
```

6. Produktionsnah lokal:

```bash
npm run start
```

7. Konfigurator im Browser absenden. Fehler siehst du im Terminal des API-/Production-Servers.

API-Test mit Dummy-Daten:

```bash
curl -X POST http://127.0.0.1:3000/api/send-inquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Kunde","email":"kunde@example.com","phone":"0123456789","projectTypes":["website","seo"],"notes":"SMTP Test"}'
```

## Einmalige VPS-Vorbereitung

Beispiel für Ubuntu/Debian:

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg nginx certbot python3-certbot-nginx
```

Docker installieren:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
. /etc/os-release
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu ${UBUNTU_CODENAME:-$VERSION_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Deployment-User für Docker berechtigen:

```bash
sudo usermod -aG docker "$USER"
newgrp docker
docker ps
```

Deployment-Ordner vorbereiten:

```bash
sudo mkdir -p /opt/grenady
sudo chown "$USER":"$USER" /opt/grenady
nano /opt/grenady/.env
chmod 600 /opt/grenady/.env
```

SSH-Key für GitHub Actions erstellen:

```bash
ssh-keygen -t ed25519 -C "github-actions-grenady" -f ~/.ssh/grenady_actions
cat ~/.ssh/grenady_actions.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
cat ~/.ssh/grenady_actions
```

Den privaten Key aus `~/.ssh/grenady_actions` als GitHub Secret `VPS_SSH_KEY` speichern.

Weitere GitHub Secrets setzen:

```text
VPS_HOST=<deine-vps-ip-oder-hostname>
VPS_USER=<ssh-user>
VPS_PORT=22
GHCR_PAT=<optional-falls-ghcr-package-privat>
```

DNS setzen:

```text
@    A    <VPS-IP>
www  A    <VPS-IP>
```

## Nginx Reverse Proxy

Beispielkonfiguration kopieren:

```bash
sudo nano /etc/nginx/sites-available/grenady.conf
```

Inhalt aus `deploy/nginx/grenady.conf.example` einfügen und Domain bei Bedarf austauschen.

Aktivieren:

```bash
sudo ln -s /etc/nginx/sites-available/grenady.conf /etc/nginx/sites-enabled/grenady.conf
sudo nginx -t
sudo systemctl reload nginx
```

HTTPS mit Certbot:

```bash
sudo certbot --nginx -d grenady.de -d www.grenady.de
sudo certbot renew --dry-run
```

## Ersten Deploy auslösen

Ein Push auf `main` startet automatisch:

```bash
git push origin main
```

Der Workflow baut das Image, pusht es nach GHCR und startet auf dem VPS den Container `grenady-app` neu.

## Kontaktformular testen

Nach dem Deploy:

```bash
curl -I http://127.0.0.1:3000
curl -I https://grenady.de
curl -X POST http://127.0.0.1:3000/api/send-inquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Kunde","email":"kunde@example.com","phone":"0123456789","projectTypes":["website"],"notes":"SMTP Test vom VPS"}'
```

Danach im Browser den Konfigurator testweise absenden und prüfen, ob die E-Mail ankommt.

## Prüf- und Debug-Befehle

Auf dem VPS:

```bash
docker ps
docker logs grenady-app
docker inspect grenady-app
docker images
sudo nginx -t
sudo systemctl status nginx
sudo journalctl -u nginx --no-pager -n 100
curl -I http://127.0.0.1:3000
curl -I http://127.0.0.1:3000/healthz
curl -I https://grenady.de
```

Wenn der Container nicht startet, zuerst prüfen:

```bash
docker logs grenady-app
docker inspect grenady-app
cat /opt/grenady/.env
```

Wenn keine E-Mail ankommt:

```bash
docker logs grenady-app
docker exec -it grenady-app env | grep -E 'SMTP|INQUIRY'
```

Dann SMTP-Werte, Absenderdomain, Firewall und Login-Daten beim Mailprovider prüfen.

Wenn Nginx nicht liefert:

```bash
sudo nginx -t
sudo systemctl status nginx
sudo journalctl -u nginx --no-pager -n 100
curl -I http://127.0.0.1:3000
```
