# Tech Stack - Interaktywne Portfolio (Astro + Motion System)

## 1. Frontend (Astro & React)

* **Framework:** Astro 5 (SSG - Static Site Generation)

  * Główny szkielet aplikacji.
  * Zero JS by default dla treści statycznych.
  * **View Transitions:** płynne przejścia między podstronami przez `astro:transitions` i `<ClientRouter />` + opcjonalne `transition:name` dla “shared elements”.

* **Komponenty Interaktywne:** React 19

  * Używany tylko w "wyspach" (Islands Architecture) dla elementów wymagających stanu (Formularz, Modale).
  * Wykorzystanie nowych funkcji React 19 (np. Actions) tam, gdzie to możliwe.

* **Język:** TypeScript 5

  * Ścisłe typowanie propsów i danych.

* **Stylizacja:** Tailwind CSS 4 (Alpha/Beta)

  * Konfiguracja sterowana przez CSS (bez `tailwind.config.js`).
  * Definiowanie animacji i tokenów ruchu w stylu **CSS-first** przez `@theme` i zmienne `--animate-*` + `@keyframes`.
  * Wykorzystanie silnika Oxygen dla maksymalnej wydajności.

* **Komponenty UI:** shadcn/ui

  * Dostosowane do Tailwind 4.
  * Ikony: Lucide React.

* **Animacje:** (warstwowo, wg “motion budget”)

  * **CSS-first:** marquee/ticker, hover, shimmer, proste przejścia i mikro-animacje.
  * **Minimalny JS (bez React):** scroll-reveal / wejścia elementów (IntersectionObserver).
  * **Framer Motion (dla Reacta):** modale, interakcje zależne od stanu/gestów, bardziej złożone choreografie UI.
  * **Reduced motion:** globalne wsparcie `prefers-reduced-motion: reduce` (wyciszanie/wyłączanie nieistotnych animacji).

---

## 2. Motion & Interactions (niuansy “wow effects”)

### 2.1 Motion budget (zasada przewodnia)

* Najpierw **CSS**, potem minimalny JS, a React/Framer Motion tylko tam, gdzie trzeba.
* Unikanie ciężkich bibliotek do prostych efektów (marquee, reveal, hover).

### 2.2 Marquee / Ticker (CSS-only)

* Komponent `Marquee.astro` z “podwójnym trackiem” (seamless loop).
* Animacja zdefiniowana przez Tailwind v4:

  * `@theme { --animate-marquee: marquee 18s linear infinite; }`
  * `@keyframes marquee { from { translateX(0) } to { translateX(-50%) } }`

### 2.3 Scroll reveal / Mikro-animacje wejścia (IntersectionObserver)

* Elementy oznaczone `data-reveal`.
* Styl startowy: `opacity-0 translate-y-4 blur-sm`.
* Po wejściu w viewport: usuwanie klas startowych, `transition duration-700`.
* Optymalizacja: po pierwszym wejściu `unobserve()`.

### 2.4 Reduced motion (a11y)

* `@media (prefers-reduced-motion: reduce)`:

  * wyłączenie marquee/ticker,
  * ograniczenie intensywnych animacji,
  * zachowanie pełnej funkcjonalności UI.

### 2.5 Page transitions (Astro View Transitions)

* `astro:transitions` + `<ClientRouter />` dla SPA-like nawigacji bez pełnego SPA.
* `transition:name` dla kluczowych elementów (np. logo/hero/miniatury) między stronami.

---

## 3. Backend & Dane (Architektura Statyczna)

* **Baza danych:** BRAK.
* Dane trzymane w plikach lokalnych w repozytorium (Git-based CMS):

  * `src/content/projects/*.mdx` (Portfolio z obsługą Markdown/MDX).
  * `src/data/config.json` (Konfiguracja globalna).

---

## 4. Formularz kontaktowy

* **EmailJS**

  * Obsługa wysyłki maili po stronie klienta (Client-side).
  * Walidacja **Zod** przed wysyłką.
* Antyspam / UX-guardrails:

  * honeypot field,
  * blokada wielokrotnego submitu (disabled + cooldown),
  * (opcjonalnie) prosta heurystyka: minimalny czas wypełniania formularza.

---

## 5. Infrastruktura & Hosting (Netlify na start)

* **Hosting:** Netlify (na początek).
* **Deployment:** automatyczny build & deploy połączony z GitHub.
* **CDN/Edge:** zarządzane przez Netlify (cache/kompresja zależnie od ustawień).
* **SSL:** automatyczny SSL od Netlify.
* **Bezpieczeństwo:** standardowe zabezpieczenia platformy Netlify.

---

## 6. CI/CD & DevOps

* **Repozytorium:** GitHub.
* **Deploy (główny):** Netlify (po push do `main`).
* **GitHub Actions (opcjonalnie jako quality gate):**

  * Trigger: PR + push do `main`.
  * Proces:

    1. Checkout kodu.
    2. `npm ci`
    3. Lint/format (`eslint`, `prettier`)
    4. Build check (`npm run build`) jako walidacja przed deployem.

---

## 7. Narzędzia i Metryki

* **Package Manager:** npm.
* **Jakość kodu:** ESLint + Prettier.
* **Analityka:** (opcjonalnie) Plausible / Netlify Analytics (zależnie od potrzeb).
* **SEO:** automatyczna generacja `sitemap.xml` i `robots.txt` przez Astro.
