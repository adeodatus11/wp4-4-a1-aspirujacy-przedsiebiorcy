import { choice, methods, note, number, text } from '../schema.js';

export default {
  id: '01',
  order: 1,
  part: 'A',
  title: 'Bezpieczna praca w sklepie',
  subtitle: 'Zaplecze o 7:40, dostawa wody i nóż do kartonów. Co tu może skończyć się wypadkiem i co zrobić, zanim się stanie.',
  duration: 45,
  sessions: [45],
  han: ['HAN.01.1'],
  tags: ['BHP', 'dźwiganie', 'pierwsza pomoc', 'pożar'],
  realia: ['dzwiganie'],
  audience: {
    adults:
      'Z osobami, które otwierają sklep, dodaj obowiązki pracodawcy: szkolenie BHP przed dopuszczeniem do pracy, ocena ryzyka zawodowego, apteczka i gaśnice. Poproś, żeby na koniec spisali trzy zagrożenia w lokalu, który planują albo już wynajmują.',
  },
  format: {
    name: 'Obchód zaplecza i decyzje w sytuacjach',
    student:
      'Pierwszy dzień praktyki w markecie spożywczym. Zrobisz obchód zaplecza, policzysz, ile możesz bezpiecznie podnieść, i zdecydujesz, co robić przy skaleczeniu i przy pożarze.',
    teacher:
      'Lekcja jest zbudowana na konkretnych sytuacjach z zaplecza sklepu, a nie na liście przepisów. Uczniowie najpierw szukają zagrożeń w opisie obchodu, potem liczą masę zgrzewek wobec norm, a na końcu podejmują decyzje w nagłych sytuacjach. Przy każdej błędnej odpowiedzi platforma tłumaczy, co by się stało.',
    grouping:
      'Etap 1 i 5 samodzielnie. Etapy 2–4 w parach: jedna osoba czyta sytuację na głos, druga decyduje, potem zamiana. Osoba bez pary czyta i decyduje sama.',
    methods: [methods.przypadek, methods.retrieval, methods.ksztaltujace],
  },
  objectives: [
    'Znajduję zagrożenia na zapleczu i w sali sprzedaży.',
    'Sprawdzam, czy ciężar mieści się w normie ręcznego przenoszenia.',
    'Wiem, co robić po kolei przy skaleczeniu i przy pożarze.',
    'Wiem, kiedy mam prawo odmówić wykonania pracy.',
  ],
  materials: ['Urządzenie z przeglądarką (jedno na parę)', 'Jeśli to możliwe: apteczka i gaśnica szkolna do pokazania'],
  teacherGuide: {
    preparation:
      'Sprawdź, gdzie w szkole wisi najbliższa gaśnica i plan ewakuacji — w etapie 4 zapytasz o to uczniów. Jeśli masz apteczkę, przynieś ją. Przypomnij, że limity dźwigania dla młodocianych są niższe niż dla dorosłych; szczegóły ustala szkoła i pracodawca praktyk.',
    summary:
      'Najczęstsze zagrożenia w sklepie to śliska podłoga, przeszkody w przejściach, ostre narzędzia, dźwiganie i zastawione drogi ewakuacyjne. Dorosły pracownik przy pracy stałej może ręcznie przenosić do 12 kg (kobieta) i 30 kg (mężczyzna). Przy bezpośrednim zagrożeniu pracownik ma prawo powstrzymać się od pracy i zawiadomić przełożonego.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Co może skończyć się wypadkiem?',
      grouping: 'solo',
      intro: 'Rano przyjechała dostawa: zgrzewki wody, kartony z mrożonkami, paleta napojów. Ty i jeszcze jedna osoba macie wyłożyć towar przed otwarciem o 8:00.',
      ...note(
        5,
        'Każdy zaznacza samodzielnie. Nie omawiaj odpowiedzi, dopóki wszyscy nie sprawdzą. Zapytaj, kto zaznaczył folię stretch — wiele osób jej nie docenia.',
        'Które z tych zagrożeń widzieliście w prawdziwym sklepie?',
        'Mokra podłoga przy chłodni, kartony w przejściu, folia na podłodze, ktoś stojący na skrzynce zamiast na drabinie.',
        'Uznawanie za groźne tylko „dużych” rzeczy (wózek, regał), a pomijanie folii i noża.',
        'Poproś o przykład zagrożenia, które pojawia się tylko zimą (błoto i śnieg przy wejściu).',
      ),
      activities: [
        {
          type: 'multi',
          id: 'q-zagrozenia',
          question: 'Zaznacz wszystko, co w tej sytuacji może doprowadzić do wypadku.',
          options: [
            'Folia stretch zdjęta z palety leży na podłodze',
            'Woda z rozmrożonego kartonu kapie przy chłodni',
            'Zgrzewki wody stoją na najniższej półce regału',
            'Nóż do kartonów z wysuniętym ostrzem leży na kartonie',
            'Kierownik zostawił klucze do biura na biurku',
            'Puste kartony ułożone w przejściu do drzwi',
          ],
          correct: [0, 1, 3, 5],
          explanation:
            'Folia i woda to poślizgnięcie, nóż z wysuniętym ostrzem to skaleczenie, kartony w przejściu to potknięcie i zablokowana droga ucieczki. Ciężkie zgrzewki na dole regału to dobre rozwiązanie, a klucze na biurku to sprawa bezpieczeństwa mienia, nie BHP.',
          hint: 'Szukaj tego, o co można się poślizgnąć, potknąć albo skaleczyć.',
        },
      ],
    },
    {
      id: 'obchod',
      label: 'Obchód',
      title: 'Obchód zaplecza o 7:40',
      grouping: 'pair',
      intro: 'Kierowniczka zmiany prosi, żebyś przeszedł lub przeszła z nią zaplecze i powiedział(a), co trzeba poprawić przed otwarciem.',
      reading: {
        title: 'Cztery najczęstsze zagrożenia w sklepie',
        paragraphs: [
          'Poślizgnięcie: mokra podłoga, folia, rozbity słoik. Miejsce oznacz tablicą i od razu wytrzyj. Potknięcie: kartony, palety i kable w przejściach. Skaleczenie: noże do kartonów, rozbite szkło, krawędzie puszek — nóż chowa się po każdym cięciu, a tnie się od siebie.',
          'Drogi ewakuacyjne i dostęp do gaśnic muszą być wolne przez cały czas, także w czasie dostawy. Do górnych półek używa się drabiny w dobrym stanie, nigdy krzesła, skrzynki ani regału.',
        ],
      },
      ...note(
        10,
        'Pary czytają wiersze na głos i decydują razem. Po sprawdzeniu poproś o jeden wiersz, przy którym para się pomyliła, i o wyjaśnienie, dlaczego.',
        'Który z tych błędów najtrudniej zauważyć, bo „zawsze tak było”?',
        'Zastawione drzwi ewakuacyjne i stanie na krześle — ludzie robią to codziennie, dopóki nic się nie stanie.',
        'Zaznaczanie gaśnicy jako błędu, choć opis mówi, że jest na miejscu i ma plombę.',
        'Dopisz dwa zagrożenia, które pojawiają się tylko w dziale mięsnym (noże, krajalnica, chłód).',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-obchod',
          title: 'Notatki z obchodu',
          context: 'Zaznacz wiersze, które trzeba poprawić przed otwarciem sklepu.',
          lines: [
            { text: 'Gaśnica wisi przy wyjściu na rampę, plomba jest nienaruszona.' },
            { text: 'Kartony z wodą stoją przed drzwiami ewakuacyjnymi „na chwilę”.', error: 'Droga ewakuacyjna musi być wolna zawsze, także w czasie dostawy.' },
            { text: 'Przy chłodni jest kałuża po rozmrożonym kartonie, bez oznaczenia.', error: 'Śliska podłoga: oznacz tablicą i od razu wytrzyj.' },
            { text: 'Zgrzewki wody leżą na dolnej półce regału.', ok: 'Ciężkie towary na dole to dobra praktyka.' },
            { text: 'Pracownik stoi na krześle biurowym, żeby sięgnąć do górnej półki.', error: 'Krzesło na kółkach to prosta droga do upadku. Do górnych półek — drabina.' },
            { text: 'W apteczce są rękawiczki, opatrunki i lista zawartości.' },
            { text: 'Nóż do kartonów z wysuniętym ostrzem leży na palecie.', error: 'Ostrze chowa się po każdym cięciu. Na palecie ktoś może się o nie oprzeć.' },
            { text: 'W chłodni wisi kurtka ocieplana dla pracowników.' },
          ],
          explanation: 'Cztery poprawki: wolne drzwi ewakuacyjne, wytarta i oznaczona podłoga, drabina zamiast krzesła, schowany nóż. Pozostałe wiersze opisują dobre praktyki.',
        },
      ],
    },
    {
      id: 'dzwiganie',
      label: 'Dźwiganie',
      title: 'Ile możesz podnieść?',
      grouping: 'pair',
      intro: 'Zgrzewka sześciu butelek wody po 1,5 l waży około 9 kg. Na sali trzeba wyłożyć 40 zgrzewek.',
      reading: {
        title: 'Normy ręcznego przenoszenia (dorośli)',
        paragraphs: [
          'Przy pracy stałej kobieta może ręcznie przenosić do 12 kg, a mężczyzna do 30 kg. Przy pracy dorywczej (nie częściej niż 4 razy na godzinę) — do 20 kg i 50 kg. Uczniów na praktykach i kobiety w ciąży obowiązują niższe limity.',
          'Podnoś z ugiętych nóg, z prostymi plecami, trzymaj ciężar blisko ciała i nie skręcaj tułowia z ciężarem. Gdy coś jest za ciężkie albo nieporęczne — wózek albo druga osoba.',
        ],
        table: {
          head: ['Praca', 'Kobiety', 'Mężczyźni'],
          rows: [
            ['Stała', '12 kg', '30 kg'],
            ['Dorywcza (do 4 razy na godzinę)', '20 kg', '50 kg'],
          ],
        },
      },
      ...note(
        10,
        'Najpierw obliczenia, potem pytanie o sposób podnoszenia. Jeśli masz miejsce, poproś jedną osobę, żeby pokazała podnoszenie pustego kartonu: grupa ocenia ugięcie nóg i odległość od ciała.',
        'Dlaczego 40 zgrzewek to praca stała, a nie dorywcza?',
        'Bo przenosisz je wiele razy w ciągu godziny, częściej niż 4 razy.',
        'Liczenie normy dorywczej przy wykładaniu całej dostawy. Myślenie, że limit dotyczy tylko jednego podniesienia, a nie całej pracy.',
        'Policz, ile kursów z wózkiem zamiast noszenia w rękach (wózek na 10 zgrzewek: 4 kursy).',
      ),
      activities: [
        number('q-kobieta', 'Ile zgrzewek po 9 kg naraz może przenieść kobieta przy pracy stałej?', 1, '2 zgrzewki to 18 kg, a limit przy pracy stałej to 12 kg. Zostaje jedna zgrzewka na raz albo wózek.', {
          unit: 'szt.',
          mistakes: [{ value: 2, text: '2 zgrzewki to 18 kg. To powyżej limitu 12 kg przy pracy stałej (mieści się tylko w normie dorywczej).' }],
        }),
        number('q-mezczyzna', 'A ile zgrzewek naraz może przenieść dorosły mężczyzna przy pracy stałej?', 3, '3 × 9 kg = 27 kg, mniej niż 30 kg. Cztery zgrzewki to 36 kg — za dużo.', {
          unit: 'szt.',
          mistakes: [
            { value: 4, text: '4 zgrzewki to 36 kg, czyli ponad 30 kg.' },
            { value: 5, text: '5 zgrzewek to 45 kg — to blisko normy dorywczej (50 kg), a wykładanie 40 zgrzewek jest pracą stałą.' },
          ],
        }),
        choice(
          'q-podnoszenie',
          'Jak podnieść karton z mrożonkami z podłogi?',
          [
            'Z ugiętych kolan, karton blisko ciała, bez skrętu tułowia',
            'Pochyl się z prostymi nogami, bo tak jest szybciej i mniej męczy kolana',
            'Podnieś jednym szarpnięciem, żeby jak najkrócej trzymać ciężar w rękach',
            'Chwyć karton z boku, obróć się z nim i połóż od razu na półce obok',
          ],
          0,
          'Siłę dają nogi, a kręgosłup zostaje prosty. Ciężar blisko ciała mniej obciąża plecy.',
          [
            null,
            'Przy prostych nogach cały ciężar przenosi się na odcinek lędźwiowy kręgosłupa. To najczęstsza przyczyna bólu pleców w handlu.',
            'Szarpnięcie gwałtownie obciąża mięśnie i kręgosłup. Podnoś płynnie.',
            'Skręt tułowia z ciężarem to jeden z najgroźniejszych ruchów dla kręgosłupa. Obróć się całym ciałem, krokami.',
          ],
        ),
      ],
    },
    {
      id: 'nagle',
      label: 'Nagłe sytuacje',
      title: 'Skaleczenie i ogień',
      grouping: 'pair',
      intro: 'Dwie sytuacje, które zdarzają się w sklepach. Na decyzję masz kilka sekund, dlatego kolejność warto znać wcześniej.',
      ...note(
        12,
        'Po sekwencji zapytaj, gdzie w szkole jest najbliższa gaśnica i apteczka — czy ktoś wie bez sprawdzania? Przy dopasowaniu omów ostatni wiersz: prawo do powstrzymania się od pracy (art. 210 Kodeksu pracy).',
        'Gdzie w tym budynku jest najbliższa gaśnica i którędy wyjdziesz w razie pożaru?',
        'Konkretne miejsce i droga. Jeśli nikt nie wie — to dobra lekcja na resztę roku.',
        'Najpierw sprzątanie miejsca zdarzenia, potem pomoc. Wynoszenie płonącego kosza na zewnątrz przez salę sprzedaży.',
        'Sprawdźcie razem oznaczenia gaśnicy (typ, data przeglądu).',
      ),
      activities: [
        {
          type: 'sequence',
          id: 'q-skaleczenie',
          question: 'Kolega przeciął dłoń nożem do kartonów, krew leci mocno. Ułóż działania w kolejności.',
          items: [
            'Załóż rękawiczki jednorazowe z apteczki',
            'Uciśnij ranę jałowym opatrunkiem',
            'Jeśli krwawienie nie ustaje, dzwoń pod 112',
            'Powiadom kierownika zmiany',
            'Zostaw miejsce zdarzenia bez zmian do decyzji kierownika',
          ],
          explanation:
            'Najpierw ochrona siebie i zatrzymanie krwawienia, potem wezwanie pomocy i zgłoszenie. Miejsca wypadku nie sprząta się od razu — pracodawca musi ustalić przyczyny.',
          hint: 'Co jest najpilniejsze dla rannego? Co możesz zrobić dopiero, gdy krwawienie jest opanowane?',
        },
        {
          type: 'matching',
          id: 'q-reakcje',
          question: 'Jak reagujesz?',
          options: ['Usuń lub oznacz', 'Sprzęt albo druga osoba', 'Alarm i wyjście', 'Masz prawo odmówić'],
          rows: [
            { label: 'Rozlany olej na podłodze przy regale', correct: 0, explanation: 'Tablica ostrzegawcza i sprzątanie od razu.' },
            { label: 'Paleta z napojami do przewiezienia na salę', correct: 1, explanation: 'Wózek paletowy, nie noszenie w rękach.' },
            { label: 'Dym z zaplecza i zapach spalenizny', correct: 2, explanation: 'Alarmujesz innych, wyprowadzasz klientów, dzwonisz pod 112.' },
            { label: 'Kierownik każe wejść na regał bez drabiny', correct: 3, explanation: 'Przy bezpośrednim zagrożeniu możesz powstrzymać się od pracy i zawiadomić przełożonego (art. 210 Kodeksu pracy).' },
            { label: 'Karton waży 25 kg, a jesteś na praktyce', correct: 1, explanation: 'Uczniowie mają niższe limity. Wózek albo dorosły pracownik.' },
          ],
          explanation: 'Każda sytuacja ma inną reakcję. Najważniejsze: przy dymie nie gasisz po cichu, tylko alarmujesz innych.',
        },
        choice(
          'q-ogien',
          'W koszu na śmieci na zapleczu pojawił się mały ogień. Co robisz najpierw?',
          [
            'Alarmuję innych i gaszę gaśnicą, mając wolne wyjście za sobą',
            'Wynoszę płonący kosz przez salę sprzedaży na zewnątrz budynku',
            'Otwieram okno na zapleczu, żeby dym szybko wyleciał na zewnątrz',
            'Kończę przyjmowanie dostawy, a potem zgłaszam sprawę kierownikowi',
          ],
          0,
          'Mały ogień gasisz, jeśli masz drogę ucieczki i wiesz, jak użyć gaśnicy. Inni muszą wiedzieć od razu. Gdy ogień rośnie — wychodzisz i dzwonisz pod 112.',
          [
            null,
            'Niosąc ogień przez salę, narażasz klientów i siebie, a płomień od ruchu powietrza się rozpala.',
            'Otwarte okno to więcej tlenu dla ognia. Dym trzeba ograniczyć, nie wietrzyć.',
            'Każda minuta zwłoki to większy pożar. Najpierw alarm.',
          ],
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Twoja decyzja',
      grouping: 'solo',
      intro: 'Ostatnia sytuacja i krótkie zadanie o miejscu, które znasz.',
      ...note(
        8,
        'Każdy pracuje sam. Przeczytaj 2–3 odpowiedzi z pytania otwartego i zapytaj grupę, czy proponowane rozwiązanie jest wykonalne od jutra.',
        'Co zrobisz, jeśli kierownik powie: „Zawsze tak robimy i nic się nie stało”?',
        'Grzecznie wskażę zagrożenie i zaproponuję rozwiązanie (drabina, wózek). Jeśli to bezpośrednie zagrożenie — mogę odmówić i zgłosić wyżej.',
        'Przekonanie, że uczeń na praktyce nie może niczego zgłosić.',
        'Napisz, kto w twojej szkole lub firmie odpowiada za BHP i jak się z nim skontaktować.',
      ),
      activities: [
        choice(
          'q-transfer',
          'Jest 18:50, sklep zamykają o 19:00. Kierownik prosi, żeby szybko przenieść 4 zgrzewki wody (36 kg) naraz, „bo nie ma czasu na wózek”. Jesteś dorosłym mężczyzną. Co robisz?',
          [
            'Robię dwa kursy po 2 zgrzewki albo biorę wózek',
            'Przenoszę wszystkie 4 naraz, bo to tylko kilka metrów do regału',
            'Przenoszę 4 naraz, bo to praca dorywcza i limit wynosi 50 kg',
            'Odmawiam wyłożenia wody i wychodzę z pracy przed 19:00',
          ],
          0,
          '36 kg to ponad limit 30 kg przy pracy stałej. Dwa kursy albo wózek rozwiązują problem w kilka minut.',
          [
            null,
            'Długość drogi nie zmienia ciężaru. Urazy kręgosłupa zdarzają się przy krótkich odcinkach.',
            'Wykładanie dostawy to praca stała, a nie dorywcza.',
            'Masz prawo odmówić niebezpiecznej pracy, ale tu jest bezpieczny sposób wykonania zadania.',
          ],
        ),
        text(
          'q-moje',
          'Opisz jedno zagrożenie, które widzisz w sklepie, w którym robisz zakupy albo pracujesz, i jak je usunąć.',
          'Przykład: przy wejściu do sklepu zimą leży mokre błoto i nie ma maty ani tablicy ostrzegawczej. Rozwiązanie: mata przy drzwiach, tablica „uwaga, śliska podłoga” i wycieranie co godzinę.',
          { criteria: ['Zagrożenie jest konkretne (gdzie, co).', 'Rozwiązanie da się wprowadzić od razu.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do obchodu zaplecza i do norm dźwigania.' },
            { min: 0.6, name: 'Widzisz zagrożenia', text: 'Rozpoznajesz większość zagrożeń. Powtórz kolejność działań przy skaleczeniu.' },
            { min: 0.85, name: 'Bezpieczna zmiana', text: 'Wiesz, co poprawić, ile podnieść i co robić w nagłej sytuacji.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Śliska podłoga, przeszkody, noże, dźwiganie, zastawione wyjścia. Praca stała: 12 kg kobieta, 30 kg mężczyzna. Ogień: najpierw alarm. Bezpośrednie zagrożenie: masz prawo odmówić.',
};
