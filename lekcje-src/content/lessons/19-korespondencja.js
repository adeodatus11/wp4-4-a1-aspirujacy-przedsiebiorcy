import { choice, methods, note, text } from '../schema.js';

export default {
  id: '19',
  order: 19,
  part: 'B',
  title: 'Korespondencja handlowa',
  subtitle: 'Dostawa zeszytów do szkoły się spóźni. Napisz maila, po którym klient wie, co się stało, co dalej i do kogo dzwonić.',
  duration: 45,
  sessions: [45],
  han: ['HAN.02.7'],
  tags: ['e-mail', 'pismo handlowe', 'UDW', 'formy grzecznościowe'],
  realia: [],
  audience: {
    adults:
      'Dorośli piszą maile codziennie, ale rzadko zwracają uwagę na temat, UDW czy podpis. Poproś, żeby na koniec poprawili jeden swój prawdziwy mail służbowy (bez danych osobowych) według listy z etapu 2.',
  },
  format: {
    name: 'Budowa listu i korekta tekstu',
    student:
      'Pracujesz w hurtowni papierniczej w Toruniu. Dostawa zeszytów do szkoły spóźni się o dwa dni. Ułożysz części maila, poprawisz szkic kolegi, wybierzesz adresatów i napiszesz własną wiadomość.',
    teacher:
      'Lekcja ćwiczy pisanie krótkich, rzeczowych wiadomości handlowych: temat mówiący o sprawie, jasny układ, ton bez wymówek, podpis z kontaktem. Ważny wątek RODO: wysyłając tę samą wiadomość do wielu klientów, używa się pola UDW.',
    grouping: 'Etapy 1 i 5 samodzielnie, etapy 2–4 w parach.',
    methods: [methods.jawne, methods.feedback],
  },
  objectives: [
    'Piszę temat, który mówi, czego dotyczy wiadomość.',
    'Układam mail handlowy w logicznej kolejności.',
    'Poprawiam ton: bez wymówek, krzyku i potocznych zwrotów.',
    'Wybieram pola Do, DW i UDW zgodnie z ochroną danych.',
  ],
  materials: ['Urządzenie z przeglądarką'],
  teacherGuide: {
    preparation: 'Możesz pokazać na projektorze puste okno nowej wiadomości w programie pocztowym z polami Do, DW, UDW, Temat, Załącznik.',
    summary:
      'Temat mówi o sprawie i ewentualnie o dacie. Mail ma zwrot grzecznościowy, cel w pierwszym zdaniu, fakty i rozwiązanie, następny krok, formułę pożegnalną i pełny podpis z kontaktem. Przeprasza się za skutek, bez obwiniania innych. Wiadomość do wielu klientów wysyła się w UDW, żeby nie ujawniać ich adresów.',
  },
  sections: [
    {
      id: 'start',
      label: 'Start',
      title: 'Temat wiadomości',
      grouping: 'solo',
      intro: 'Zamówienie 200 zeszytów A5 dla Szkoły Podstawowej nr 12 miało przyjechać w poniedziałek 13.10. Producent dostarczy je dopiero we wtorek, więc hurtownia zawiezie je do szkoły w środę 15.10 do 10:00.',
      ...note(
        5,
        'Każdy wybiera sam. Zapytaj, ile maili dziennie dostaje sekretariat szkoły i po czym wybiera, które przeczytać najpierw.',
        'Po co w temacie data?',
        'Odbiorca od razu widzi, czego dotyczy zmiana, i może znaleźć maila później.',
        'Tematy typu „Ważne!!!” albo pusty temat.',
        'Napisz temat maila z przypomnieniem o niezapłaconej fakturze.',
      ),
      activities: [
        choice(
          'q-temat',
          'Który temat jest najlepszy?',
          [
            'Zeszyty A5 dla SP 12 — nowy termin: 15.10',
            'WAŻNE!!! Prosimy o pilne przeczytanie tej wiadomości',
            'Zeszyty',
            'Informacja z hurtowni papierniczej w sprawie zamówienia',
          ],
          0,
          'Temat mówi, czego dotyczy wiadomość i co się zmieniło.',
          [
            null,
            'Wykrzykniki nie mówią, o co chodzi. Takie maile często trafiają do spamu.',
            'Za ogólnie: szkoła może zamawiać zeszyty kilka razy w roku.',
            'Długie i nic nie mówi o nowym terminie.',
          ],
        ),
      ],
    },
    {
      id: 'budowa',
      label: 'Budowa',
      title: 'Części maila',
      grouping: 'pair',
      intro: 'Dobry mail handlowy ma stałe części. Dzięki temu odbiorca szybko znajduje to, czego szuka.',
      reading: {
        title: 'Jak zbudować wiadomość',
        paragraphs: [
          'Zwrot grzecznościowy: „Szanowna Pani” do osoby, którą znasz z imienia i nazwiska, „Szanowni Państwo” do firmy, „Dzień dobry” w mniej formalnej, stałej współpracy. W pierwszym zdaniu cel. Potem fakty i rozwiązanie, następny krok, formuła pożegnalna („Z poważaniem” formalnie, „Pozdrawiam” mniej formalnie) i podpis: imię, nazwisko, stanowisko, firma, telefon.',
        ],
      },
      ...note(
        10,
        'Pary układają kolejność. Zapytaj, czego najczęściej brakuje w mailach, które dostają (podpisu z telefonem).',
        'Dlaczego podpis z numerem telefonu jest ważny?',
        'Odbiorca może od razu zadzwonić, zamiast szukać kontaktu albo odpisywać.',
        'Zaczynanie od przeprosin i długich wyjaśnień zamiast od celu.',
        'Ułóż kolejność części pisma papierowego (miejscowość i data, nadawca, adresat…).',
      ),
      activities: [
        {
          type: 'sequence',
          id: 'q-czesci',
          question: 'Ułóż części maila w kolejności.',
          items: [
            'Szanowna Pani,',
            'Piszę w sprawie zamówienia 200 zeszytów A5 dla SP 12.',
            'Producent dostarczy zeszyty z dwudniowym opóźnieniem, dlatego przywieziemy je w środę 15.10 do 10:00.',
            'Przepraszamy za zmianę terminu. Jeśli środa nie odpowiada szkole, proszę o informację do jutra.',
            'Z poważaniem',
            'Ola Wiśniewska, obsługa klienta, Hurtownia Papiernicza, tel. 56 610 22 33',
          ],
          explanation: 'Zwrot, cel, fakty i rozwiązanie, przeprosiny z następnym krokiem, formuła pożegnalna, podpis.',
        },
      ],
    },
    {
      id: 'ton',
      label: 'Ton',
      title: 'Szkic kolegi',
      grouping: 'pair',
      intro: 'Kolega napisał wersję roboczą tego samego maila. Sprawdź ton i treść.',
      ...note(
        12,
        'Pary zaznaczają błędy i przepisują dwa najgorsze zdania. Przeczytaj na głos kilka poprawionych wersji.',
        'Czym różni się wyjaśnienie przyczyny od zrzucania winy?',
        'Wyjaśnienie podaje fakt krótko („producent dostarczy towar później”). Zrzucanie winy odsuwa odpowiedzialność („to nie nasza wina”).',
        'Pisanie wielkimi literami, wykrzykniki, potoczny język.',
        'Przepisz cały szkic w wersji poprawnej.',
      ),
      activities: [
        {
          type: 'spotErrors',
          id: 'q-szkic',
          title: 'Wersja robocza maila',
          context: 'Zaznacz zdania do poprawienia.',
          lines: [
            { text: 'Siema,', error: 'Zbyt potocznie. „Szanowna Pani” albo „Dzień dobry”.' },
            { text: 'zeszyty dla SP 12 przyjadą w środę 15.10 do 10:00.' },
            { text: 'Producent coś nawalił, to nie nasza wina.', error: 'Zrzucanie winy i potoczny język. Wystarczy: „producent dostarczy zeszyty z opóźnieniem”.' },
            { text: 'PROSIMY O CIERPLIWOŚĆ!!!', error: 'Wielkie litery i wykrzykniki odbiera się jak krzyk.' },
            { text: 'W załączniku przesyłam fakturę.', error: 'Faktura dotyczy dostawy, która jeszcze się nie odbyła, i nie ma jej w załączniku. Takie zdanie wprowadza w błąd.' },
            { text: 'Przepraszamy za zmianę terminu.' },
            { text: 'Ola', error: 'Brakuje pełnego podpisu: nazwiska, stanowiska, firmy i telefonu.' },
          ],
          explanation: 'Pięć poprawek. Po nich mail jest krótki, uprzejmy i mówi wszystko, czego potrzebuje szkoła.',
        },
      ],
    },
    {
      id: 'adresaci',
      label: 'Adresaci',
      title: 'Do, DW, UDW',
      grouping: 'pair',
      intro: 'Opóźnienie dotyczy też 15 innych szkół, które zamówiły zeszyty. Hurtownia chce wysłać im tę samą informację.',
      reading: {
        title: 'Pola adresatów',
        paragraphs: [
          'Do — osoba, która ma coś zrobić albo której sprawa dotyczy. DW (do wiadomości) — osoba, która ma wiedzieć, ale nie musi działać; jej adres widzą wszyscy. UDW (ukryte do wiadomości) — adresy, których inni odbiorcy nie zobaczą. Wysyłając tę samą wiadomość do wielu klientów, używa się UDW, żeby nie ujawniać ich adresów.',
        ],
      },
      ...note(
        10,
        'Pary dopasowują. Opowiedz o typowym błędzie: mail do wielu klientów w polu Do, a potem „odpowiedz wszystkim”.',
        'Dlaczego wysłanie maila do 15 szkół w polu Do jest problemem?',
        'Każda szkoła widzi adresy pozostałych. To ujawnienie danych, a odpowiedź „do wszystkich” trafi do 15 osób.',
        'Używanie DW zamiast UDW przy wysyłce do wielu klientów.',
        'Zaproponuj, kogo dać w DW przy mailu do SP 12 (np. kierownika hurtowni).',
      ),
      activities: [
        {
          type: 'matching',
          id: 'q-pola',
          question: 'Gdzie wpiszesz adres?',
          options: ['Do', 'DW', 'UDW'],
          rows: [
            { label: 'Pani Iwona z sekretariatu SP 12, która czeka na zeszyty', correct: 0 },
            { label: 'Kierownik hurtowni, który ma wiedzieć o opóźnieniu', correct: 1 },
            { label: '15 innych szkół z tą samą informacją', correct: 2 },
            { label: 'Kierowca, który ma przywieźć zeszyty w środę', correct: 0, explanation: 'Kierowca ma coś zrobić, więc w polu Do — najlepiej w osobnej wiadomości wewnętrznej.' },
          ],
          explanation: 'Do: kto działa. DW: kto ma wiedzieć. UDW: wielu odbiorców, którzy nie powinni widzieć swoich adresów.',
        },
        choice(
          'q-udw',
          'Dlaczego informację do 15 szkół wysyłasz w UDW?',
          [
            'Żeby nie ujawniać adresów szkół innym szkołom',
            'Żeby mail szybciej dotarł do wszystkich szkół w Toruniu',
            'Bo w polu Do nie można wpisać więcej niż 10 adresów',
            'Żeby szkoły nie wiedziały, że opóźnienie dotyczy wielu z nich',
          ],
          0,
          'UDW chroni adresy odbiorców. To zasada ochrony danych i dobra praktyka.',
          [
            null,
            'Pole adresata nie wpływa na szybkość dostarczenia.',
            'Programy pocztowe nie mają takiego limitu w polu Do.',
            'Celem nie jest ukrywanie problemu, tylko ochrona adresów.',
          ],
        ),
      ],
    },
    {
      id: 'sprawdzenie',
      label: 'Sprawdzenie',
      title: 'Twój mail',
      grouping: 'solo',
      intro: 'Napisz maila do pani Iwony samodzielnie.',
      ...note(
        8,
        'Samodzielnie. Pary wymieniają się mailami i oceniają według kryteriów z platformy.',
        'Które kryterium było najtrudniejsze do spełnienia?',
        'Zwykle krótkość — zmieszczenie faktów, przeprosin i następnego kroku w kilku zdaniach.',
        'Długie tłumaczenia przyczyn opóźnienia.',
        'Napisz krótką odpowiedź na maila szkoły: „Środa nam nie pasuje, prosimy o czwartek”.',
      ),
      activities: [
        choice(
          'q-zwrot',
          'Piszesz do działu zakupów firmy, nie znasz nazwiska odbiorcy. Jaki zwrot wybierasz?',
          ['Szanowni Państwo,', 'Szanowna Pani,', 'Cześć,', 'Witam serdecznie wszystkich,'],
          0,
          'Do firmy lub działu, gdy nie znasz osoby, piszesz „Szanowni Państwo”.',
          [
            null,
            'Nie wiesz, kto odczyta wiadomość.',
            'Zbyt potocznie w korespondencji z nowym klientem.',
            '„Witam” w otwarciu bywa odbierane jako zbyt poufałe — bezpieczniej „Szanowni Państwo” albo „Dzień dobry”.',
          ],
        ),
        text(
          'q-mail',
          'Napisz maila do pani Iwony z informacją o nowym terminie dostawy.',
          'Temat: Zeszyty A5 dla SP 12 — nowy termin: 15.10. Szanowna Pani, piszę w sprawie zamówienia 200 zeszytów A5. Producent dostarczy je z dwudniowym opóźnieniem, dlatego przywieziemy zeszyty w środę 15.10 do 10:00. Przepraszamy za zmianę. Jeśli środa nie odpowiada szkole, proszę o informację do jutra. Z poważaniem, Ola Wiśniewska, obsługa klienta, Hurtownia Papiernicza, tel. 56 610 22 33.',
          { minLength: 80, rows: 7, criteria: ['Temat mówi o sprawie i dacie.', 'Jest nowy termin i przeprosiny bez wymówek.', 'Jest następny krok.', 'Pełny podpis z telefonem.'] },
        ),
        {
          type: 'resultCard',
          id: 'karta',
          badges: [
            { min: 0, name: 'Do powtórki', text: 'Wróć do części maila i szkicu kolegi.' },
            { min: 0.6, name: 'Piszesz rzeczowo', text: 'Powtórz pola Do, DW i UDW.' },
            { min: 0.85, name: 'Mail bez poprawek', text: 'Twoje maile są krótkie, uprzejme i kompletne.' },
          ],
        },
      ],
    },
  ],
  exitTicket: 'Temat: sprawa i data. Zwrot, cel, fakty i rozwiązanie, następny krok, pożegnanie, pełny podpis. Bez wymówek i wielkich liter. Wiele adresów — UDW.',
};
