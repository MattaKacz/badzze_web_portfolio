# Architektura UI dla Portfolio Badzze

## 1. Przegląd struktury UI

Interfejs użytkownika (UI) został zaprojektowany w oparciu o architekturę **Astro Islands** w modelu **One-Page Application**. Strona główna stanowi statyczny szkielet (HTML/CSS), gwarantujący natychmiastowe ładowanie (FCP/LCP) i optymalizację SEO. Interaktywność (nawigacja mobilna, modale projektów, formularz kontaktowy) jest dostarczana za pomocą wyizolowanych komponentów React ("wysp"), które są hydrowane po stronie klienta.

Kluczowym założeniem jest **Deep Linking** dla modali projektowych – mimo struktury One-Page, każdy projekt posiada unikalny adres URL, co pozwala na bezpośrednie linkowanie i obsługę historii przeglądarki.

## 2. Lista widoków

### 2.1. Strona Główna (Home View)
*   **Ścieżka:** `/`
*   **Główny cel:** Przedstawienie wizytówki freelancera, zbudowanie zaufania (Portfolio) i konwersja (Kontakt).
*   **Kluczowe informacje:**
    *   Value Proposition (Nagłówek Hero).
    *   Informacje o autorze (Bio).
    *   Przegląd prac (Siatka miniatur).
    *   Cennik/Pakiety usług.
*   **Kluczowe komponenty:**
    *   `HeroSection` (Statyczny, CTA scrolluje do kontaktu).
    *   `PortfolioGrid` (Statyczny Astro Component, triggery do modala).
    *   `PricingSection` (Responsywny: Grid na desktopie, Swiper na mobile).
    *   `ContactForm` (React Island: walidacja + EmailJS).
*   **UX/Dostępność/Bezpieczeństwo:**
    *   Lazy loading obrazów poniżej fold-u.
    *   Wskaźniki fokusa dla nawigacji klawiaturą.
    *   Walidacja formularza po stronie klienta (Zod) przed wysyłką.

### 2.2. Modal Projektu (Project Detail Overlay)
*   **Ścieżka:** `/` (wirtualnie `/?project=id` lub `/#projekt-id` obsługiwane przez JS)
*   **Główny cel:** Szczegółowa prezentacja pojedynczego projektu bez opuszczania kontekstu strony głównej.
*   **Kluczowe informacje:**
    *   Tytuł projektu i krótki opis.
    *   Galeria zdjęć (Slider).
    *   Stack technologiczny.
    *   Link do wersji live/repozytorium.
*   **Kluczowe komponenty:**
    *   `ProjectModal` (React: Dialog/Overlay).
    *   `ImageCarousel` (Embla Carousel wewnątrz modala).
*   **UX/Dostępność/Bezpieczeństwo:**
    *   **Focus Trap:** Użytkownik nie może "wyjść" tabulatorem poza modal.
    *   Obsługa klawisza `ESC` do zamknięcia.
    *   Blokada scrollowania tła (`body { overflow: hidden }`) po otwarciu.
    *   Aktualizacja URL (`history.pushState`), aby przycisk "Wstecz" zamykał modal zamiast cofać do poprzedniej strony.

### 2.3. Menu Mobilne (Navigation Overlay)
*   **Ścieżka:** Globalny komponent (widoczny na mobile po akcji).
*   **Główny cel:** Umożliwienie nawigacji do sekcji na małych ekranach.
*   **Kluczowe informacje:**
    *   Linki do sekcji kotwicznych (#about, #portfolio, #contact).
    *   Linki do mediów społecznościowych.
*   **Kluczowe komponenty:**
    *   `MobileMenu` (React: Pełnoekranowy overlay).
*   **UX/Dostępność:**
    *   Animacja wejścia (Slide-in lub Fade-in).
    *   Duże strefy dotykowe (min. 44x44px).
    *   Zamknięcie menu po kliknięciu w link.

### 2.4. Strona 404 (Error View)
*   **Ścieżka:** `/404` (i każda nieistniejąca)
*   **Główny cel:** Poinformowanie o błędnym adresie i powrót na ścieżkę konwersji.
*   **Kluczowe informacje:**
    *   Komunikat błędu.
    *   Przycisk powrotu na stronę główną.
*   **Kluczowe komponenty:**
    *   Layout dziedziczony ze strony głównej (nagłówek/stopka).
*   **UX:**
    *   Spójny styl wizualny, aby nie straszyć użytkownika systemowym błędem.

## 3. Mapa podróży użytkownika (User Journey)

### Scenariusz główny: Potencjalny Klient
1.  **Wejście (Landing):** Użytkownik wchodzi na stronę główną. Widzi Hero Section z jasnym USP.
2.  **Eksploracja (Scroll):** Użytkownik scrolluje w dół, czytając sekcję "O mnie".
3.  **Zainteresowanie (Portfolio):**
    *   Użytkownik widzi siatkę projektów.
    *   Klika w interesującą miniaturę.
    *   **Akcja:** Otwiera się `Modal Projektu`. URL zmienia się na `/?project=xyz`.
    *   Użytkownik przegląda galerię (swipe na mobile, strzałki na desktop).
    *   Użytkownik zamyka modal (klik w tło lub 'X'). URL wraca do `/`.
4.  **Decyzja (Oferta):** Użytkownik przegląda pakiety cenowe (na mobile przesuwa karty palcem).
5.  **Konwersja (Kontakt):**
    *   Użytkownik klika "Zamów stronę" w sekcji Pakietów lub scrolluje do Formularza.
    *   Wypełnia formularz. Wpisuje błędny email -> widzi natychmiastowy komunikat błędu (walidacja Zod).
    *   Poprawia dane i klika "Wyślij".
    *   Przycisk zmienia stan na "Wysyłanie...".
    *   Pojawia się Toast/Alert z komunikatem sukcesu.

### Scenariusz: Bezpośredni Link (Deep Link)
1.  Użytkownik otrzymuje link `domena.pl/?project=sklep-www`.
2.  Strona ładuje się, skrypt inicjalizacyjny wykrywa parametr URL.
3.  Automatycznie otwiera się `Modal Projektu` z danymi dla "sklep-www".
4.  Użytkownik zamyka modal i znajduje się na pełnej stronie głównej, mogąc kontynuować eksplorację.

## 4. Układ i struktura nawigacji

### 4.1. Desktop
*   **Sticky Header:** Pasek nawigacji przyklejony do góry ekranu.
*   **Linki kotwiczne:** "Start", "O mnie", "Portfolio", "Oferta", "Kontakt" – kliknięcie powoduje *smooth scroll* do sekcji ID.
*   **Logo:** Kliknięcie przewija na samą górę.

### 4.2. Mobile
*   **Header:** Zredukowany do Logo (lewa strona) i ikony Hamburgera (prawa strona).
*   **Overlay Menu:** Po kliknięciu Hamburgera, menu przykrywa cały ekran. Linki są wycentrowane i powiększone.
*   **Gesty:** Obsługa swipe w sliderach (Portfolio Modal, Oferta).

### 4.3. Mechanizm Deep Linking
*   Wykorzystanie `Nano Stores` lub `React Context` do zarządzania stanem widoczności modala.
*   Synchronizacja z URL za pomocą `window.history.pushState` (otwarcie) i `window.history.back()` (zamknięcie przyciskiem przeglądarki) lub `replaceState` (zamknięcie przyciskiem UI).

## 5. Kluczowe komponenty UI

1.  **PortfolioGrid (Astro):**
    *   Statycznie generowana siatka obrazów WebP.
    *   Brak JS w fazie ładowania (poza lazy loadingiem przeglądarki).
    *   Każdy kafel posiada `data-project-id`, który jest odczytywany przez skrypt obsługujący kliknięcia.

2.  **ProjectModal (React):**
    *   **Kontener:** `Dialog.Root` (z biblioteki Radix UI lub własna implementacja dostępna).
    *   **Galeria:** `Embla Carousel` – lekka biblioteka do sliderów z obsługą dotyku.
    *   **Treść:** Pobierana z globalnego obiektu JSON (wstrzykniętego w `<head>` lub importowanego), co eliminuje opóźnienie `fetch`.

3.  **PricingSwiper (React - Mobile Only):**
    *   Na desktopie: Grid 3-kolumnowy (CSS).
    *   Na mobile: Kontener z `overflow-x: auto` i `scroll-snap-type: x mandatory`. Karty centrują się podczas przewijania.

4.  **ContactForm (React):**
    *   Biblioteki: `React Hook Form` (zarządzanie stanem), `Zod` (schemat walidacji).
    *   UI: Inputy z pływającymi labelami lub klasyczny układ Stack.
    *   Feedback: Globalny system powiadomień (Toast) informujący o sukcesie/błędzie wysyłki EmailJS.

5.  **GlobalToast (React):**
    *   Komponent do wyświetlania komunikatów (Wysłano formularz, Błąd sieci, Informacja o Cookies).
    *   Pojawia się w prawym dolnym rogu (desktop) lub na dole ekranu (mobile).
