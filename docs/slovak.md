# SPST Knižnica Dokumentácia

- Databázové modely:

## Model Knihy

- **Polia:**

  - `id`: Primárny kľúč knihy.
  - `name`: Názov knihy.
  - `description`: Krátky popis knihy.
  - `image`: URL obrázku knihy.
  - `year`: Rok vydania knihy.
  - `pages`: Počet strán v knihe.
  - `isAvailable`: Indikuje, či je kniha momentálne dostupná.
  - `itemsInStock`: Počet kusov na sklade.
  - `categoryId`: Cudzí kľúč odkazujúci na model `Category`.
  - `publisherId`: Cudzí kľúč odkazujúci na model `Publisher`.
  - `authorId`: Cudzí kľúč odkazujúci na model `Author`.
  - `createdAt` a `updatedAt`: Časové pečiatky vytvorenia a poslednej aktualizácie.

- **Vzťahy:**
  - Kniha patrí do kategórie, vydavateľstva a má autora.

## Model Kategórie

- **Polia:**

  - `id`: Primárny kľúč kategórie.
  - `name`: Názov kategórie.
  - `description`: Krátky popis kategórie.
  - `createdAt` a `updatedAt`: Časové pečiatky vytvorenia a poslednej aktualizácie.

- **Vzťahy:**
  - Kategória má mnoho kníh.

## Model Vydavateľstva

- **Polia:**

  - `id`: Primárny kľúč vydavateľstva.
  - `name`: Názov vydavateľstva.
  - `image`: URL obrázku vydavateľstva.
  - `description`: Krátky popis vydavateľstva.
  - `createdDated`: Dátum založenia vydavateľstva.
  - `endDate`: Voliteľné pole pre dátum, kedy vydavateľstvo prestalo byť aktívne.
  - `isActive`: Indikuje, či je vydavateľstvo momentálne aktívne.
  - `bossName`: Meno vedúceho vydavateľstva.
  - `createdAt` a `updatedAt`: Časové pečiatky vytvorenia a poslednej aktualizácie.

- **Vzťahy:**
  - Vydavateľstvo má mnoho kníh.

## Model Autora

- **Polia:**

  - `id`: Primárny kľúč autora.
  - `name`: Meno autora.
  - `birthYear`: Rok narodenia autora.
  - `deathYear`: Rok úmrtia autora (ak je relevantné).
  - `description`: Krátky popis autora.
  - `litPeriod`: Literárne obdobie, do ktorého autor patrí.
  - `totalBooks`: Celkový počet kníh napísaných autorom.
  - `authorImage`: URL obrázku autora.
  - `createdAt` a `updatedAt`: Časové pečiatky vytvorenia a poslednej aktualizácie.

- **Vzťahy:**
  - Autor má mnoho kníh.

## Model Rezervácie

- **Polia:**

  - `id`: Primárny kľúč rezervácie.
  - `bookName`: Názov rezervovanej knihy.
  - `from`: Začiatok rezervácie.
  - `to`: Koniec rezervácie.
  - `isBorrowed`: Indikuje, či je kniha momentálne požičaná.
  - `isReturned`: Indikuje, či bola kniha vrátená.
  - `isExtended`: Indikuje, či bola doba rezervácie predĺžená.
  - `userEmail`: Email používateľa, ktorý si rezervoval knihu.

- **Vzťahy:**
  - Rezervácia je spojená s knihou cez pole `bookName`, hoci to nie je priamy cudzí kľúč v aktuálnom schéme.

V súhrne sú vzťahy nasledovné:

- Každá kniha patrí do jednej kategórie, jedného vydavateľstva a má jedného autora.
- Každá kategória môže mať viacero kníh.
- Každé vydavateľstvo môže mať viacero kníh.
- Každý autor môže mať viacero kníh.
- Každá rezervácia je spojená s knihou cez pole `bookName`, ktoré odkazuje na pole `name` v modeli `Book`.

Krátky Popis: 
Máme tri roly: ŠTUDENT, UČITEĽ a ADMIN.
Študent môže požičiavať knihy, prezerať knihy s pagináciou a filtrovať knihy (rovnako aj kategórie, vydavateľstvá a autorov).
Učiteľ má rovnaké schopnosti ako študent, ale môže tiež vykonávať CRUD operácie pre knihy, kategórie, vydavateľstvá a autorov.
Admin má rovnaké schopnosti ako učiteľ plus schopnosť spravovať žiakov (TODO: Neskôr pridať viac funkcií pre admina).

Autentifikačný Server
- Vytvoril som vlastný autentifikačný server pre túto aplikáciu v NestJS: [Autentifikačný Server](https://github.com/peterdinis/spst-library-auth)