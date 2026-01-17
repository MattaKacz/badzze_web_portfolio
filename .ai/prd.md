# Dokument wymagań produktu (PRD) - Interaktywne Portfolio MVP

## 1. Przegląd produktu
Celem projektu jest stworzenie wysokowydajnej, interaktywnej strony internetowej typu One-Page (Portfolio), która pełni funkcję wizytówki oraz oferty handlowej. Produkt ma za zadanie konwertować odwiedzających potencjalnych klientów poprzez jasną prezentację usług, prac i cennika. Strona zostanie zbudowana w oparciu o framework Astro (SSG) i hostowana na Netlify, kładąc nacisk na szybkość ładowania, dostępność (Accessibility) oraz estetykę ("efekt wow" poprzez mikro-animacje), przy jednoczesnym zachowaniu prostoty zarządzania treścią (pliki JSON/MDX).

## 2. Problem użytkownika
Obecnie potencjalni klienci napotykają bariery w procesie decyzyjnym, które wynikają z:
- Braku jasnej informacji o zakresie usług i specjalizacji twórcy.
- Trudności w ocenie, czy styl prac odpowiada ich potrzebom (brak łatwo dostępnego portfolio).
- Niepewności co do kosztów i zasad współpracy (brak transparentnego cennika i pakietów).
- Skomplikowanego lub nieintuicyjnego procesu kontaktu.
- Braku wyróżnika rynkowego (strona musi budować zaufanie profesjonalnym wyglądem i interaktywnością).

## 3. Wymagania funkcjonalne

### 3.1. Struktura i Nawigacja
- Strona typu One-Page z sekcjami: Hero, O mnie, Portfolio, Oferta, Pakiety, Kontakt.
- Nawigacja (Sticky Header) umożliwiająca płynne przewijanie do sekcji (smooth scroll).
- Responsywność (Mobile First) zapewniająca czytelność na wszystkich urządzeniach.

### 3.2. Prezentacja Treści
- Sekcja Hero: Krótkie bio i unikalna propozycja wartości (USP).
- Sekcja Portfolio: Siatka (Grid) miniatur projektów z optymalizacją obrazów (lazy loading).
- Modale szczegółów: Po kliknięciu w projekt otwiera się modal z opisem i galerią.
- Deep Linking: Otwarcie modala zmienia adres URL (np. /#projekt-1), umożliwiając bezpośrednie linkowanie do konkretnej pracy.
- Sekcja Oferta/Pakiety: Karty z cenami "od" oraz zakresem usług.
- Sekcja Współpraca: Informacje o procesie, zaliczkach i terminach.

### 3.3. Interakcje i Kontakt
- Formularz kontaktowy: Pola (imię, email, temat, wiadomość, zgoda RODO).
- Obsługa formularza: Integracja z EmailJS (Client-side) bez przeładowania strony.
- Walidacja: Sprawdzanie poprawności danych (format email, wymagane pola) oraz zabezpieczenie antyspamowe (Cloudflare Turnstile lub hCaptcha).
- Mikro-animacje: Subtelne przejścia, hover effects, animacje wejścia elementów (przy zachowaniu wydajności).

### 3.4. Technologia i SEO
- Framework: Astro.
- Dane: Przechowywane w plikach lokalnych (JSON/MDX).
- SEO: Meta tagi, Open Graph, Sitemap, dane strukturalne Schema.org (Person/ProfessionalService).
- Analityka: Plausible lub PostHog (privacy-friendly).

## 4. Granice produktu
Poniższe elementy są wyłączone z zakresu MVP (Non-goals):
- Pełny system CMS z panelem administracyjnym (edycja odbywa się przez kod/pliki).
- Rozbudowany moduł rezerwacji terminów i płatności online.
- Wersje wielojęzyczne (strona tylko w języku polskim).
- Sekcja Blog/Artykuły (architektura plików przygotowana, ale sekcja niewidoczna).
- Skomplikowane animacje typu "scroll-jacking" negatywnie wpływające na UX/Performance.
- Newsletter i automatyzacja marketingu.

## 5. Historyjki użytkowników

### US-001: Przeglądanie oferty na urządzeniu mobilnym
- Tytuł: Responsywne przeglądanie oferty
- Opis: Jako potencjalny klient, chcę wygodnie przeglądać ofertę i cennik na telefonie, aby szybko ocenić, czy usługi mieszczą się w moim budżecie.
- Kryteria akceptacji:
  1. Sekcja pakietów wyświetla się w układzie jednokolumnowym na mobile.
  2. Teksty są czytelne bez konieczności przybliżania (min. 16px).
  3. Elementy klikalne (przyciski, karty) mają odpowiednią strefę dotyku (min. 44x44px).
  4. Nie występuje poziome przewijanie strony.

### US-002: Szczegóły projektu w modalu z bezpośrednim linkiem
- Tytuł: Przeglądanie szczegółów projektu i Deep Linking
- Opis: Jako użytkownik, chcę kliknąć w miniaturę projektu, aby zobaczyć więcej zdjęć i opis w modalu, oraz móc wysłać link do tego widoku innej osobie.
- Kryteria akceptacji:
  1. Kliknięcie w kafel projektu otwiera modal bez przeładowania strony.
  2. Adres URL w pasku przeglądarki zmienia się na unikalny dla danego projektu (np. /?project=id).
  3. Wejście na stronę z unikalnym linkiem automatycznie otwiera odpowiedni modal.
  4. Modal można zamknąć klawiszem ESC, kliknięciem w tło lub przyciskiem "X".
  5. Po zamknięciu modalu URL wraca do podstawowego adresu strony.

### US-003: Szybki kontakt przez formularz
- Tytuł: Wysłanie zapytania ofertowego
- Opis: Jako zainteresowany klient, chcę wysłać wiadomość bezpośrednio ze strony, aby umówić się na konsultację.
- Kryteria akceptacji:
  1. Formularz zawiera pola: Imię, Email, Temat, Wiadomość, Checkbox zgody prywatności.
  2. Kliknięcie "Wyślij" uruchamia walidację pól (np. poprawność emaila).
  3. Po pomyślnej walidacji dane są wysyłane przez EmailJS.
  4. Użytkownik widzi stan ładowania podczas wysyłania.
  5. Po wysłaniu wyświetla się wyraźny komunikat sukcesu ("Dziękujemy za wiadomość...").
  6. Wiadomość trafia na skrzynkę mailową właściciela strony.

### US-004: Zabezpieczenie przed spamem
- Tytuł: Ochrona formularza (Anti-spam)
- Opis: Jako właściciel strony, chcę, aby formularz był zabezpieczony przed botami, aby otrzymywać tylko wartościowe zapytania.
- Kryteria akceptacji:
  1. Formularz jest zintegrowany z niewidocznym lub mało inwazyjnym systemem Captcha (np. Cloudflare Turnstile).
  2. Próba wysłania formularza bez przejścia weryfikacji Captcha jest blokowana.
  3. Zastosowany jest rate limiting (limit zapytań z jednego IP w określonym czasie) po stronie EmailJS lub logiki klienta, aby zapobiec floodowaniu.

### US-005: Dostępność klawiaturowa
- Tytuł: Nawigacja klawiaturą
- Opis: Jako użytkownik korzystający z klawiatury, chcę mieć możliwość nawigacji po wszystkich elementach interaktywnych, w tym modalach.
- Kryteria akceptacji:
  1. Wszystkie linki i przyciski mają widoczny stan :focus.
  2. Można otworzyć modal projektu używając klawisza Enter/Space.
  3. Po otwarciu modalu focus jest uwięziony wewnątrz niego (focus trap).
  4. Można zamknąć modal klawiszem ESC.

### US-006: Wydajność i pierwsze wrażenie
- Tytuł: Szybkie ładowanie strony
- Opis: Jako użytkownik, chcę, aby strona załadowała się natychmiastowo, abym nie stracił zainteresowania.
- Kryteria akceptacji:
  1. Wynik Google Lighthouse dla Performance na mobile wynosi minimum 85 punktów.
  2. Obrazy w sekcji portfolio są ładowane z opóźnieniem (lazy loading).
  3. Layout Shift (CLS) jest minimalny (poniżej 0.1), brak skoków treści podczas ładowania.

### US-007: Weryfikacja wiarygodności w Google
- Tytuł: Wyświetlanie Rich Snippets
- Opis: Jako użytkownik szukający usług w Google, chcę widzieć profesjonalną wizytówkę w wynikach wyszukiwania.
- Kryteria akceptacji:
  1. Strona zawiera poprawne dane strukturalne JSON-LD (Schema.org) dla typu Person lub ProfessionalService.
  2. Meta Title i Description są unikalne i zachęcające do kliknięcia.
  3. Obrazek Open Graph wyświetla się poprawnie przy udostępnianiu linku w social media.

## 6. Metryki sukcesu

### Metryki Biznesowe
- Ilość wysłanych formularzy kontaktowych miesięcznie (cel zostanie ustalony po pierwszym miesiącu).
- Współczynnik klikalności (CTR) w główne przyciski CTA ("Umów się na konsultację").

### Metryki UX (User Experience)
- Czas potrzebny na zrozumienie oferty: Użytkownik w testach korytarzowych potrafi w mniej niż 30 sekund określić, czym zajmuje się właściciel strony.
- Poprawność ścieżki nawigacji: 100% użytkowników testowych potrafi otworzyć projekt, zamknąć go i przejść do formularza bez błędów.

### Metryki Techniczne
- Google Lighthouse Mobile Performance: >= 85.
- Google Lighthouse Accessibility: >= 90.
- Google Lighthouse SEO: >= 90.
- Stabilność formularza: 0 zgubionych wiadomości przy poprawnym wypełnieniu (monitorowane przez logi EmailJS/błędy JS).
