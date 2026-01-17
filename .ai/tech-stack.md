# Tech Stack - Interaktywne Portfolio

## 1. Frontend (Astro & React)
- **Framework:** Astro 5 (SSG - Static Site Generation)
  - Główny szkielet aplikacji.
  - Zero JS by default dla treści statycznych.
- **Komponenty Interaktywne:** React 19
  - Używany tylko w "wyspach" (Islands Architecture) dla elementów wymagających stanu (Formularz, Modale).
  - Wykorzystanie nowych funkcji React 19 (np. Compiler, Actions) tam, gdzie to możliwe.
- **Język:** TypeScript 5
  - Ścisłe typowanie propsów i danych.
- **Stylizacja:** Tailwind CSS 4 (Alpha/Beta)
  - Konfiguracja sterowana przez CSS (bez `tailwind.config.js`).
  - Wykorzystanie silnika Oxygen dla maksymalnej wydajności.
- **Komponenty UI:** shadcn/ui
  - Dostosowane do Tailwind 4.
  - Ikony: Lucide React.
- **Animacje:** Framer Motion (dla Reacta) oraz natywne View Transitions API w Astro.

## 2. Backend & Dane (Architektura Statyczna)
- **Baza danych:** BRAK.
  - Dane trzymane w plikach lokalnych w repozytorium (Git-based CMS):
    - `src/content/projects/*.mdx` (Portfolio z obsługą Markdown/MDX).
    - `src/data/config.json` (Konfiguracja globalna).
- **Formularz kontaktowy:** EmailJS
  - Obsługa wysyłki maili po stronie klienta (Client-side).
  - Walidacja Zod przed wysyłką.

## 3. Infrastruktura & Hosting (Self-Hosted)
- **Serwer:** VPS (Mikrus).
- **Serwer WWW:** Nginx.
  - Serwowanie statycznych plików z katalogu `dist/`.
  - Obsługa `try_files` dla routingu Astro.
  - Kompresja Gzip i nagłówki Cache-Control.
- **SSL:** Let's Encrypt (Certbot) - automatyczne odnawianie.
- **Bezpieczeństwo:**
  - UFW (Firewall) blokujący wszystko poza SSH (niestandardowy port), HTTP, HTTPS.
  - Dedykowany użytkownik systemowy do deployu.

## 4. CI/CD & DevOps
- **Repozytorium:** GitHub.
- **Pipeline:** GitHub Actions.
  - Trigger: Push do `main`.
  - Proces:
    1. Checkout kodu.
    2. Instalacja zależności (`npm ci`).
    3. Budowanie projektu (`npm run build`).
    4. Transfer plików na VPS via `rsync` po SSH.

## 5. Narzędzia i Metryki
- **Package Manager:** npm.
- **Jakość kodu:** ESLint + Prettier.
- **Analityka:** (Opcjonalnie) Plausible lub proste logi Nginx.
- **SEO:** Automatyczna generacja sitemap.xml i robots.txt przez Astro.
