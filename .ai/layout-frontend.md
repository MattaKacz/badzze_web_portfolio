# STRONA.pdf — Rozmieszczenie elementów (layout blueprint, desktop)

> Cel: wiernie odwzorować układ i założenia z dokumentu STRONA.pdf, w formie czytelnej dla LLM.

---

## 0) Nawigacja (Top bar)
- **Pozycja:** górny pasek, lewa strona.
- **Elementy:** linki/kotwice:
  - `O MNIE`
  - `KONTAKT` :contentReference[oaicite:0]{index=0}
- **Zachowanie:** klik przewija do odpowiedniej sekcji (anchor scroll). (Zależne od implementacji)

---

## 1) Sekcja HERO / O MNIE + panel kontaktowy (układ 2-kolumnowy)
**Układ bazowy: 2 kolumny**

### 1A) Lewa kolumna (About / hero-copy)
- Duży blok tekstu „Hej! Jestem multidyscyplinarnym…” + specjalizacje (plakat, okładki, skład, branding, social media). :contentReference[oaicite:1]{index=1}
- Akcent typograficzny/label typu „SOCIAL MEDIA design”. :contentReference[oaicite:2]{index=2}

### 1B) Prawa kolumna (Kontakt / onboarding klienta)
- Blok „Jak się ze mną skontaktować” + info o socialach i formularzu. :contentReference[oaicite:3]{index=3}
- Blok „Co będzie mi potrzebne” (3 punkty):
  - opis projektu
  - inspiracje
  - termin :contentReference[oaicite:4]{index=4}
- Blok „Terminy i płatności”:
  - min. tygodniowe wyprzedzenie
  - 30% zaliczki
  - 70% po wykonaniu :contentReference[oaicite:5]{index=5}
- Disclaimer:
  - brak druku
  - oferta orientacyjna :contentReference[oaicite:6]{index=6}

### 1C) Warstwa graficzna (collage overlay) + interakcje
- **Custom cursor**. :contentReference[oaicite:7]{index=7}
- Elementy graficzne, które użytkownik może **chwycić i przesunąć (drag & drop)**. :contentReference[oaicite:8]{index=8}
- **Zdjęcie rozmywa się podczas scrollowania w dół** (blur-on-scroll). :contentReference[oaicite:9]{index=9}
- Jest element **„przyklejony do prawej od tej sekcji”** (sticky). :contentReference[oaicite:10]{index=10}

---

## 2) Sekcja „Współpraca / intro” + CTA konsultacji
- Nagłówek:
  - „WIĘC CHCESZ ZE MNĄ PRACOWAĆ? Super – OTO, CO WARTO WIEDZIEĆ.” :contentReference[oaicite:11]{index=11}
- CTA:
  - `> Umów się na konsultację` (w projekcie pojawia się jako ważny trigger). :contentReference[oaicite:12]{index=12}

---

## 3) Overlay/panel po kliknięciu CTA „Umów się na konsultację”
- Po kliknięciu CTA pojawia się **kafelek/panel (overlay)**. :contentReference[oaicite:13]{index=13}
- Panel ma animację przesuwania:
  - **w prawo / w lewo**. :contentReference[oaicite:14]{index=14}
- Zawartość panelu: **formularz kontaktowy**:
  - IMIĘ
  - E-MAIL
  - TYTUŁ
  - TREŚĆ
  - checkbox: polityka prywatności :contentReference[oaicite:15]{index=15}

---

## 4) Sekcja scroll-driven: „telefony nachodzą na siebie” (pinned scene)
- Podczas scrollowania:
  - **strona nie zjeżdża w dół**
  - tylko **telefony nachodzą na siebie po kolei** (stacking)
  - dopiero po zakończeniu sceny scroll wraca do normalnego :contentReference[oaicite:16]{index=16}
- Dopisek „tutaj tak samo” sugeruje minimum **dwie takie sceny**. :contentReference[oaicite:17]{index=17}
- Interpretacja układu:
  - viewport „pinned”
  - w środku sekcji (często center/right) kilka mockupów telefonów z rosnącym `z-index`.

---

## 5) Motyw przewodni: animowany „kwiatek” (element między sekcjami)
- Od tej sekcji:
  - pojawia się **kwiatek**
  - kręci się i „zjeżdża” ze scrollem :contentReference[oaicite:18]{index=18}
- W kolejnej sekcji:
  - **przeskakuje na drugą stronę** ekranu (zmiana strony: lewa ↔ prawa). :contentReference[oaicite:19]{index=19}
- Interpretacja:
  - dekoracyjny element na najwyższej warstwie (fixed/absolute), sterowany scroll progress.

---

## 6) Sekcja galerii: „zdjęcia przewijają się w górę”
- Obszar, gdzie **zdjęcia przewijają się w górę** (ciągły ruch / marquee). :contentReference[oaicite:20]{index=20}
- Interpretacja:
  - 1–3 pionowe kolumny obrazów poruszające się w górę niezależnie od scrolla.

---

## 7) Sekcja portfolio: logo → brandboard tile → modal szczegółów
- **Klik logo** → pojawia się **kafelek** z:
  - kilkoma slajdami brandboardu
  - osobnymi grafikami :contentReference[oaicite:21]{index=21}
- **Klik kafelek** → otwiera się **modal/okno** z informacjami o plakacie/projekcie. :contentReference[oaicite:22]{index=22}
- Interpretacja:
  - flow interakcji: `grid/loga` → `overlay tile` → `modal fullscreen`.

---

## 8) Sekcja „Oferta” — lista usług z cenami „od”
- Pozycje usług:
  - WIZYTÓWKA (od)
  - PLAKAT (od)
  - OKŁADKA (od)
  - SKŁAD KSIĄŻKI (od)
- Dopisek: cena zależy od złożoności. :contentReference[oaicite:23]{index=23}
- Interpretacja układu:
  - lista pionowa lub 2×2 kafelki (zależne od finalnego layoutu, ale kolejność i treść zgodna z PDF).

---

## 9) Sekcje PAKIETÓW 1–4 (kolejno, każdy jako osobna „plansza”)
- 4 bloki: `PAKIET 1`, `PAKIET 2`, `PAKIET 3`, `PAKIET 4`. :contentReference[oaicite:24]{index=24}

### Pakiet 1 — „Na start”
- Logo + uproszczona identyfikacja + uproszczona księga marki itd. :contentReference[oaicite:25]{index=25}

### Pakiet 2 — „Instagram”
- Elementy IG (okładka, kafelki, stories, karuzela itd.) + ceny składowe. :contentReference[oaicite:26]{index=26}

### Pakiet 3 — „Media społecznościowe”
- Rozszerzenie na FB/LinkedIn itd. :contentReference[oaicite:27]{index=27}

### Pakiet 4 — „Wsparcie graficzne”
- Rozliczenie godzinowe, progi 10/20/40h, min. 6 miesięcy, stawka 130 zł/h, Clockify. :contentReference[oaicite:28]{index=28}

**Sugerowany układ każdego pakietu:**
- Lewa część: nazwa + krótki opis.
- Prawa część: lista elementów + ceny / tabela.

---

## 10) Sekcja KONTAKT (końcowa lub równoległa do wcześniejszej)
- Formularz (jak w overlay z konsultacją) + social linki. :contentReference[oaicite:29]{index=29}

---

# Prompt-ready (krótka wersja dla LLM)
- One-page, top-left nav: O MNIE / KONTAKT.
- Hero: 2 kolumny (About left, Contact guidance right).
- Overlay collage: draggable elements + custom cursor.
- Scroll effects: blur photo on scroll + sticky element on right.
- CTA „Umów się na konsultację” → sliding overlay tile (left/right).
- Scroll-driven pinned scenes: phones stacking (co najmniej 2 sceny).
- Floating motif: spinning flower moves down, then jumps side.
- Vertical moving gallery: images continuously scroll upward.
- Portfolio interactions: click logo → brandboard tile slider → modal details.
- Services list: Wizytówka/Plakat/Okładka/Skład książki (od).
- Packages 1–4 as separate sections.
