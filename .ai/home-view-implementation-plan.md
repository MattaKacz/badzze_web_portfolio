# Plan implementacji widoku Strona Główna (Home View)

## 1. Przegląd
Strona główna (`/`) pełni funkcję wizytówki freelancera (Portfolio). Jest to "Single Page" podzielony na sekcje, z kluczowymi funkcjonalnościami interaktywnymi (Modal Projektu, Formularz Kontaktowy) realizowanymi jako "wyspy" (Islands) w React. Celem jest maksymalna wydajność (Astro SSG), dostępność (WCAG) i konwersja.

## 2. Routing widoku
- **Ścieżka:** `/` (Root)
- **Obsługa stanu:** 
  - Modal projektu sterowany parametrem URL: `/?project={slug}`.
  - Nawigacja wewnątrz strony (kotwice): `/#about`, `/#portfolio`, `/#contact`.

## 3. Struktura komponentów

Widok zostanie zbudowany w oparciu o architekturę komponentową Astro, z wybranymi elementami interaktywnymi w React.

```text
src/pages/index.astro (Page)
├── Layout.astro (Wrapper z <ClientRouter /> i SEO)
│   ├── Header.astro (Nawigacja)
│   │   └── MobileMenu.tsx (React Island - Client Only)
│   ├── Main
│   │   ├── HeroSection.astro (Statyczny, LCP priority)
│   │   ├── AboutSection.astro (Statyczny)
│   │   ├── PortfolioSection.astro (Wrapper sekcji)
│   │   │   ├── PortfolioGrid.astro (Statyczna siatka z danymi z Content Collections)
│   │   │   │   └── ProjectCard.astro (Pojedynczy kafel)
│   │   │   └── ProjectModal.tsx (React Island - Client Load - Obsługa URL i wyświetlania)
│   │   ├── PricingSection.astro (Wrapper)
│   │   │   └── PricingList.tsx (React Island - Client Visible - Grid na desktop / Swiper na mobile)
│   │   └── ContactSection.astro (Wrapper)
│   │       └── ContactForm.tsx (React Island - Client Visible - Walidacja i EmailJS)
│   └── Footer.astro (Statyczny)
```

## 4. Szczegóły komponentów

### `src/content/config.ts` (Konfiguracja Danych)
Definicja kolekcji treści dla projektów, aby zarządzać nimi przez pliki MDX/Markdown zamiast hardcodowania w komponentach.
- **Kolekcja:** `projects`
- **Schema (Zod):**
  - `title`: string
  - `description`: string
  - `coverImage`: image() (Astro Assets)
  - `galleryImages`: array(image())
  - `techStack`: array(string) (np. ["React", "Astro"])
  - `liveUrl`: url (opcjonalne)
  - `repoUrl`: url (opcjonalne)
  - `order`: number (do sortowania)

### `PortfolioSection.astro` & `PortfolioGrid.astro`
- **Opis:** Statyczne wyrenderowanie siatki projektów pobranych z `getCollection('projects')`.
- **Główne elementy:** Sekcja HTML, Grid CSS.
- **Interakcje:** Kliknięcie w `ProjectCard` nie jest zwykłym linkiem, lecz aktualizuje URL (`history.pushState`) lub jest linkiem `<a>` z `preventDefault`, który komunikuje się z `ProjectModal`.
- **Optymalizacja:** Obrazy renderowane przez natywny komponent `<Image />` z Astro dla formatów AVIF/WebP.

### `ProjectModal.tsx` (React Island)
- **Opis:** Komponent nasłuchujący zmian w URL. Gdy pojawi się parametr `?project=slug`, otwiera overlay z detalami projektu.
- **Główne elementy:**
  - `Dialog` (z Shadcn/ui lub Radix UI primitives) dla dostępności (Focus Trap).
  - `Carousel` (Embla Carousel) dla galerii zdjęć.
- **Obsługiwane interakcje:**
  - Otwarcie: na podstawie URL.
  - Zamknięcie: przycisk X, kliknięcie w tło, klawisz ESC -> czyszczenie parametru URL.
- **Warunki walidacji:** Sprawdzenie, czy `slug` z URL istnieje w przekazanych danych (propsach).
- **Propsy:** `projects: ProjectDTO[]` (przekazane z Astro jako JSON).

### `PricingList.tsx` (React Island)
- **Opis:** Prezentacja cennika. Zgodnie z US-001, na mobile musi być wygodna (np. karuzela/swiper), a na desktopie siatka.
- **Główne elementy:** Grid (desktop) / Swiper (mobile).
- **Propsy:** `packages: PricingPackage[]`.

### `ContactForm.tsx` (React Island)
- **Opis:** Formularz kontaktowy z walidacją i integracją EmailJS.
- **Główne elementy:** Inputy (Imię, Email, Temat), Textarea, Checkbox (RODO), Button submit.
- **Obsługiwane interakcje:** Submit, Walidacja live (onBlur).
- **Warunki walidacji (Zod Schema):**
  - `name`: min 2 znaki.
  - `email`: poprawny format email.
  - `message`: min 10 znaków.
  - `consent`: wymagane true.
- **Zabezpieczenia:** Honeypot (ukryte pole) + opcjonalnie Cloudflare Turnstile (zgodnie z US-004 i PRD).

## 5. Typy

```typescript
// src/types.ts

// DTO dla Projektu (zgodne z Content Collections)
export interface ProjectDTO {
  slug: string;
  data: {
    title: string;
    description: string;
    coverImage: { src: string; width: number; height: number; format: string }; // Astro Image type
    galleryImages: Array<{ src: string; width: number; height: number; }>;
    techStack: string[];
    liveUrl?: string;
    repoUrl?: string;
  };
  body?: string; // Opcjonalnie renderowana treść
}

// Typ dla pakietu cenowego
export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

// Typ formularza (Inferowany z Zod schema)
export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
  honeypot?: string; // Pole pułapka
};
```

## 6. Zarządzanie stanem

W tej architekturze (MPA/Hybrid) stan jest zminimalizowany.

1.  **Globalny stan UI (Modal):**
    - "Single Source of Truth" to **URL**.
    - Hook `useProjectModal` wewnątrz `ProjectModal.tsx`:
      - `useEffect` nasłuchujący zmian `window.location.search`.
      - Funkcja `openProject(slug)` -> `history.pushState(null, '', '?project=' + slug)`.
      - Funkcja `closeProject()` -> `history.pushState(null, '', window.location.pathname)`.
2.  **Stan Formularza:**
    - `useForm` (React Hook Form) do zarządzania polami i walidacją.
    - `isSubmitting`, `isSuccess`, `error` (lokalny `useState`).

## 7. Integracja API

Integracja z usługami zewnętrznymi (Backendless).

1.  **EmailJS:**
    - **Biblioteka:** `@emailjs/browser`.
    - **Metoda:** `emailjs.send(serviceID, templateID, formValues, publicKey)`.
    - **Payload:** Obiekt `ContactFormData`.
    - **Odpowiedź:** Promise (200 OK lub Error).

2.  **Google Recaptcha / Turnstile (Opcjonalnie):**
    - Weryfikacja tokena po stronie klienta (lub brak weryfikacji backendowej, poleganie na ustawieniach EmailJS).

## 8. Interakcje użytkownika

1.  **Przeglądanie Portfolio:**
    - Użytkownik klika "Zobacz projekt" na kafelku.
    - URL zmienia się na `/?project=my-website`.
    - Modal otwiera się z animacją (Framer Motion lub CSS transition).
    - Tło strony jest zablokowane (`overflow: hidden` na `body`).
    - Użytkownik klika "Wstecz" w przeglądarce -> Modal się zamyka (dzięki obsłudze `popstate`).

2.  **Wysyłanie wiadomości:**
    - Użytkownik wypełnia formularz.
    - Błędy walidacji pojawiają się pod polami.
    - Po kliknięciu "Wyślij", przycisk zmienia stan na "Wysyłanie...".
    - Po sukcesie, formularz znika, pojawia się komunikat "Dziękujemy".

## 9. Warunki i walidacja

- **Formularz kontaktowy (Zod):**
  - Email: Musi być prawidłowym formatem.
  - Treść: Nie może być pusta, min. długość.
  - Honeypot: Musi być pusty (ukryte pole `_gotcha`). Jeśli wypełnione -> cichy odrzut (bot).
- **Modal:**
  - Jeśli parametr `project` w URL wskazuje na nieistniejący slug -> modal się nie otwiera (lub pokazuje błąd wewnątrz modala).

## 10. Obsługa błędów

1.  **EmailJS Failure:**
    - Wyświetlenie toast/alertu: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później lub napisz bezpośrednio na [email]."
2.  **Brakujące obrazki:**
    - Fallback image dla projektów.
3.  **404 dla Projektu:**
    - Jeśli użytkownik wejdzie z linku bezpośredniego `/?project=nieistnieje`, modal otworzy się z komunikatem "Projekt nie znaleziony".

## 11. Kroki implementacji

1.  **Konfiguracja Content Collections:**
    - Utworzenie folderu `src/content/projects`.
    - Zdefiniowanie `src/content/config.ts`.
    - Dodanie przykładowych plików `.mdx`.
2.  **Budowa Layoutu i Sekcji Statycznych:**
    - Implementacja `HeroSection`, `AboutSection` w Astro + Tailwind.
3.  **Implementacja Portfolio (Grid + Modal):**
    - Stworzenie `ProjectCard.astro`.
    - Stworzenie `ProjectModal.tsx` z logiką URL.
    - Integracja w `PortfolioSection.astro`.
4.  **Implementacja Cennika:**
    - Stworzenie `PricingList.tsx` z logiką responsywną (Grid/Swiper).
5.  **Implementacja Formularza:**
    - Konfiguracja konta EmailJS (lub mock na start).
    - Stworzenie `ContactForm.tsx` z Zod i React Hook Form.
6.  **Style i Animacje:**
    - Dodanie animacji wejścia (`IntersectionObserver`) w CSS/Tailwind (`data-reveal`).
7.  **Testy i Optymalizacja:**
    - Sprawdzenie Lighthouse (obrazki, CLS).
    - Weryfikacja dostępności (nawigacja klawiaturą w modalu).
