import { choice, number } from '../schema.js';

export default {
  id: 'm3',
  n: 3,
  topic: 'Walidacja pomysłu',
  title: 'Sprawdź pomysł u klientów',
  subtitle: 'Jak odróżnić uprzejmość od popytu, zadać pytania, które dają fakty, i zaplanować test, który powie „tak”, „zmień” albo „zatrzymaj”.',
  duration: 90,
  outcome: 'Karta eksperymentu i scenariusz pięciu rozmów z klientami.',
  realia: ['bdl'],
  objectives: [
    'Układam sygnały popytu od najsłabszego do najsilniejszego.',
    'Zapisuję problem, klienta i hipotezę tak, żeby dało się je obalić.',
    'Zadaję pytania o to, co klient zrobił, a nie o to, co by zrobił.',
    'Szacuję lokalny rynek od liczby mieszkańców do liczby możliwych klientów.',
    'Ustalam miernik i próg decyzji przed testem, a nie po nim.',
  ],
  forGroup:
    'Na spotkanie przynieś swoje pięć pytań i hipotezę. W grupie przetestujecie pytania na sobie nawzajem i wymienicie kontakty do osób z waszych segmentów — łatwiej porozmawiać z obcą osobą poleconą przez kogoś z grupy niż z własną ciocią.',
  solo:
    'Bez grupy: przeprowadź pięć rozmów z osobami spoza rodziny i przyjaciół — przez grupy osiedlowe, fora branżowe albo pytając klientów podobnych firm. Po każdej rozmowie zapisz trzy fakty, zanim zaczniesz je interpretować.',
  sections: [
    {
      id: 'uprzejmosc',
      label: 'Uprzejmość',
      title: '„Świetny pomysł!” to jeszcze nie popyt',
      duration: 8,
      intro: 'Ola chce dojeżdżać z naprawą rowerów do klientów na wrocławskich Krzykach. W ankiecie wśród znajomych 19 z 20 osób napisało, że to świetny pomysł. Czy już wie, że ktoś zapłaci?',
      reading: {
        paragraphs: [
          'Znajomi chcą być mili, a pytanie „czy skorzystałaby Pani z tego?” nic nie kosztuje — ani ich, ani Ciebie. Rob Fitzpatrick w książce „The Mom Test” pokazuje, że nawet mama powie, że pomysł jest dobry, jeśli zapytasz wprost. Pytaj więc o to, co ludzie już robią i ile za to płacą, a nie o opinię o pomyśle.',
          'Sygnały popytu różnią się siłą. Pochwała jest najtańsza. Mocniejszy jest zapis z danymi kontaktowymi, jeszcze mocniejsza rezerwacja konkretnego terminu. Najmocniejsza jest płatność — nawet niewielka zaliczka.',
        ],
      },
      activities: [
        {
          type: 'sequence',
          id: 'm3-sygnaly',
          question: 'Ułóż sygnały od najsłabszego do najsilniejszego.',
          items: [
            'Polubienie posta z opisem usługi',
            '„Na pewno skorzystam” w rozmowie',
            'Zapis na listę z numerem telefonu',
            'Rezerwacja konkretnego terminu naprawy',
            'Wpłata 30 zł zaliczki za termin',
          ],
          explanation: 'Im więcej klient oddaje — czasu, danych, pieniędzy — tym mocniejszy dowód. Polubienie nie kosztuje nic.',
        },
      ],
    },
    {
      id: 'problem',
      label: 'Problem',
      title: 'Problem, klient, rozwiązanie',
      duration: 10,
      intro: 'Zacznij od problemu konkretnej grupy, nie od swojego rozwiązania. Rozwiązanie łatwo się zakochać; problem trzeba poznać.',
      reading: {
        paragraphs: [
          'Dobry opis problemu mówi, kto go ma, w jakiej sytuacji i jak sobie dziś radzi. „Ludzie chcą wygody” nie spełnia żadnego z tych warunków. „Rodzice z dziećmi na Krzykach nie mają jak zawieźć trzech rowerów do serwisu, więc przed sezonem odkładają przegląd albo jadą dwa razy samochodem” — spełnia wszystkie.',
        ],
      },
      activities: [
        {
          type: 'spotErrors',
          id: 'm3-problemy',
          title: 'Opisy problemów z kart uczestników',
          context: 'Zaznacz opisy, które są za szerokie albo mówią o rozwiązaniu, a nie o problemie.',
          lines: [
            { text: 'Każdy potrzebuje zdrowego jedzenia.', error: 'Za szeroko: kto, w jakiej sytuacji, jak sobie dziś radzi?' },
            { text: 'Właściciele małych sklepów spożywczych w Opolu w poniedziałki rano nie wiedzą, ile chleba zamówić, i co tydzień wyrzucają kilka bochenków.' },
            { text: 'Brakuje aplikacji do zamawiania fryzjera.', error: 'To rozwiązanie, nie problem. Jaki kłopot mają klienci fryzjerów?' },
            { text: 'Osoby pracujące zdalnie w małych miejscowościach nie mają gdzie wydrukować i wysłać dokumentów bez jazdy do miasta.' },
            { text: 'Młodzi ludzie lubią modę.', error: 'Brak problemu — to obserwacja o upodobaniach.' },
            { text: 'Rodzice z dziećmi na Krzykach przed sezonem odkładają przegląd rowerów, bo nie mają jak zawieźć ich do serwisu.' },
          ],
          explanation: 'Trzy opisy do poprawy. Dobry opis wskazuje grupę, sytuację i to, co dziś robią zamiast Twojego rozwiązania.',
        },
        {
          type: 'projectField',
          id: 'm3-pole-segment',
          field: 'm3-0',
          label: 'Segment i problem klienta',
          example: 'Rodzice z dwójką lub trójką dzieci na Krzykach, mieszkający w blokach. Przed sezonem rowery dzieci wymagają przeglądu, a do serwisu trzeba jechać dwa razy samochodem albo przegląd jest odkładany.',
        },
      ],
    },
    {
      id: 'hipoteza',
      label: 'Hipoteza',
      title: 'Hipoteza, którą da się obalić',
      duration: 10,
      intro: 'Hipoteza to zdanie, które po teście może okazać się fałszywe. Jeśli żaden wynik jej nie obali, niczego nie sprawdzasz.',
      reading: {
        paragraphs: [
          'Zapisz: kto, w jakiej sytuacji, co zrobi i w jakim czasie. Na przykład: „Co najmniej 10% rodziców, z którymi porozmawiam na Krzykach w kwietniu, zarezerwuje przegląd z dojazdem za 120 zł za trzy rowery”. Po teście wiesz, czy tak było.',
        ],
      },
      activities: [
        choice(
          'm3-hipoteza',
          'Którą hipotezę da się sprawdzić w dwa tygodnie?',
          [
            'Klienci pokochają naprawę rowerów pod domem',
            'Co najmniej 5 z 40 zapytanych rodziców zarezerwuje przegląd z dojazdem za 120 zł w ciągu 14 dni',
            'Mobilny serwis to przyszłość branży rowerowej',
            'Ludzie chcą wygody i oszczędności czasu',
          ],
          1,
          'Jest grupa, zachowanie (rezerwacja), cena, liczba i czas. Po 14 dniach wiadomo, czy się sprawdziła.',
          ['„Pokochają” nie da się zmierzyć.', null, 'Ogólna prognoza, której nie obali żaden test w dwa tygodnie.', 'Prawdopodobnie prawda — i dlatego nic nie mówi o Twojej usłudze.'],
        ),
        {
          type: 'projectField',
          id: 'm3-pole-hipoteza',
          field: 'm3-1',
          label: 'Hipoteza: spodziewane zachowanie w konkretnej sytuacji',
          example: 'Co najmniej 5 z 40 rodziców, z którymi porozmawiam w kwietniu na Krzykach, zarezerwuje przegląd z dojazdem za 120 zł za trzy rowery.',
        },
      ],
    },
    {
      id: 'rynek',
      label: 'Rynek',
      title: 'Od mieszkańców do klientów',
      duration: 12,
      intro: 'Liczba mieszkańców to nie liczba klientów. Trzeba przejść kilka kroków w dół — i przy każdym zapisać, skąd jest liczba.',
      reading: {
        paragraphs: [
          'Bank Danych Lokalnych GUS (bdl.stat.gov.pl) podaje bezpłatnie dane o gminach i powiatach: liczbę mieszkańców według wieku, gospodarstw domowych, firm według rodzajów działalności. Zapisuj zawsze jednostkę, rok i definicję wskaźnika.',
          'Dane z BDL łączysz z założeniami: jaka część gospodarstw ma problem, jaka część zapłaci za Twoje rozwiązanie. Założenia oznacz jako założenia — sprawdzisz je w rozmowach i teście.',
        ],
        example: {
          question: 'Ilu klientów może mieć Ola na osiedlu?',
          steps: [
            'Na wybranym osiedlu jest ok. 5200 gospodarstw domowych (dane z BDL dla rejonu, przeliczone przez Olę).',
            'Założenie: w 40% gospodarstw są rowery, które wymagają przeglądu przed sezonem.',
            'Założenie do sprawdzenia: 3% z nich zapłaci za przegląd z dojazdem.',
          ],
          answer: 'Policz to w zadaniu poniżej — i zobacz, jak mocno wynik zależy od ostatniego założenia.',
        },
      },
      activities: [
        number('m3-klienci', 'Ilu możliwych klientów w sezonie daje ten rachunek (5200 gospodarstw × 40% × 3%)?', 62, '5200 × 0,4 = 2080 gospodarstw z rowerami; 2080 × 0,03 = 62,4, czyli ok. 62 klientów.', {
          unit: 'klientów',
          tolerance: 1,
          mistakes: [
            { value: 2080, text: 'To gospodarstwa z rowerami. Został jeszcze ostatni krok: ilu z nich zapłaci.' },
            { value: 156, text: 'To 3% wszystkich gospodarstw. Najpierw zawęź do tych z rowerami.' },
          ],
        }),
        choice(
          'm3-zalozenie',
          'Gdyby za przegląd z dojazdem zapłaciło 1% zamiast 3%, ilu byłoby klientów?',
          ['Ok. 21', 'Ok. 62', 'Ok. 52', 'Ok. 180'],
          0,
          '2080 × 0,01 ≈ 21. Jedno założenie zmienia wynik trzykrotnie — dlatego sprawdza się je w teście, zanim kupi się samochód.',
          [null, 'To wynik dla 3%.', 'To 1% wszystkich 5200 gospodarstw — a liczysz od gospodarstw z rowerami.', 'Tyle wyszłoby przy założeniu ok. 9%.'],
        ),
      ],
    },
    {
      id: 'pytania',
      label: 'Pytania',
      title: 'Pytaj o to, co się wydarzyło',
      duration: 14,
      intro: 'Pytanie o przyszłość („czy kupisz…?”) daje życzenia. Pytanie o przeszłość („kiedy ostatnio…?”) daje fakty.',
      reading: {
        paragraphs: [
          'Dobre pytania w rozmowie walidacyjnej: Kiedy ostatnio był ten problem? Jak go wtedy rozwiązano? Ile to kosztowało — pieniędzy i czasu? Czego już próbowano? Co w tym jest najbardziej uciążliwe? O swoim pomyśle mówisz dopiero na końcu albo wcale.',
          'Zapisuj osobno to, co rozmówca powiedział (fakty), i to, co z tego wnioskujesz. „Dwa razy w zeszłym roku woził rowery samochodem” to fakt. „Potrzebuje mojej usługi” to wniosek.',
        ],
      },
      activities: [
        {
          type: 'matching',
          id: 'm3-dobre',
          question: 'Czy to pytanie da fakty?',
          options: ['Da fakty', 'Da życzenia lub uprzejmość'],
          rows: [
            { label: 'Kiedy ostatnio rowery dzieci były w przeglądzie?', correct: 0 },
            { label: 'Czy skorzystałaby Pani z naprawy pod domem?', correct: 1 },
            { label: 'Jak rowery trafiły do serwisu ostatnim razem?', correct: 0 },
            { label: 'Ile byłaby Pani w stanie zapłacić za taką usługę?', correct: 1, explanation: 'Deklaracja o przyszłości. Lepiej: „Ile kosztował ostatni przegląd?”.' },
            { label: 'Co było najbardziej kłopotliwe przy ostatniej naprawie?', correct: 0 },
            { label: 'Podoba Ci się mój pomysł?', correct: 1 },
          ],
          explanation: 'Pytania o konkretną, niedawną sytuację dają odpowiedzi, które można porównać między rozmowami.',
        },
        {
          type: 'spotErrors',
          id: 'm3-scenariusz',
          title: 'Scenariusz rozmowy przygotowany przez Olę',
          context: 'Zaznacz pytania, które trzeba usunąć albo przepisać.',
          lines: [
            { text: '1. Ile macie rowerów w domu i kto z nich korzysta?' },
            { text: '2. Opowiem Pani o moim serwisie — to naprawa pod domem w 24 godziny. Co Pani o tym sądzi?', error: 'Prezentacja pomysłu na początku ustawia rozmowę pod pochwałę.' },
            { text: '3. Kiedy ostatnio rowery były w przeglądzie i jak tam trafiły?' },
            { text: '4. Czy nie uważa Pani, że wożenie rowerów samochodem jest strasznie uciążliwe?', error: 'Pytanie sugerujące — podsuwa odpowiedź.' },
            { text: '5. Ile kosztował ostatni przegląd?' },
            { text: '6. Czy w przyszłości korzystałaby Pani z takiej usługi co miesiąc?', error: 'Deklaracja o przyszłości, w dodatku z podsuniętą częstotliwością.' },
          ],
          explanation: 'Trzy pytania do poprawy. Zostają pytania o liczby, ostatnią sytuację i koszty.',
        },
        {
          type: 'projectField',
          id: 'm3-pole-pytania',
          field: 'm3-2',
          label: 'Pięć pytań o ostatnie doświadczenie klienta',
          example: '1) Kiedy ostatnio rowery dzieci były w przeglądzie? 2) Jak tam trafiły? 3) Ile to kosztowało i ile zajęło czasu? 4) Co było najbardziej kłopotliwe? 5) Co robicie, gdy rower psuje się w sezonie?',
        },
      ],
    },
    {
      id: 'rozmowa',
      label: 'Rozmowa',
      title: 'Gdy rozmówca chwali',
      duration: 10,
      intro: 'Najtrudniejszy moment rozmowy: rozmówca mówi, że pomysł jest super. Jak wrócić do faktów, nie psując atmosfery?',
      activities: [
        {
          type: 'dialog',
          id: 'm3-dialog',
          title: 'Rozmowa z panią Moniką z osiedla',
          context: 'Pani Monika ma troje dzieci i trzy rowery. Zgodziła się na 10 minut rozmowy.',
          start: 'n1',
          nodes: {
            n1: {
              speaker: 'Pani Monika',
              text: 'Naprawa pod domem? Super pomysł, na pewno bym skorzystała!',
              choices: [
                { text: 'Dziękuję! A kiedy ostatnio rowery dzieci były w przeglądzie?', next: 'n2', good: true, feedback: 'Przyjmujesz miłe słowa i wracasz do konkretnej sytuacji z przeszłości.' },
                { text: 'Super! To mogę Panią zapisać jako klientkę?', next: 'n2', good: false, feedback: 'Za wcześnie — nic jeszcze nie wiesz o jej problemie, a ona zgodzi się z grzeczności.' },
                { text: 'Ile by Pani zapłaciła za taką usługę?', next: 'n2', good: false, feedback: 'Pytanie o przyszłość — dostaniesz uprzejmą liczbę z głowy.' },
              ],
            },
            n2: {
              speaker: 'Pani Monika',
              text: 'Hmm… chyba dwa lata temu. W zeszłym roku mąż sam przykręcał hamulce, ale coś dalej piszczy.',
              choices: [
                { text: 'To znaczy, że naprawa pod domem bardzo by Pani pomogła, prawda?', next: 'n3', good: false, feedback: 'Pytanie sugerujące. Fakty mówią na razie o dwóch latach bez przeglądu, nie o chęci płacenia.' },
                { text: 'Co sprawiło, że przeglądu nie było od dwóch lat?', next: 'n3', good: true, feedback: 'Pytasz o przyczynę — to tam jest prawdziwy problem albo jego brak.' },
              ],
            },
            n3: {
              speaker: 'Pani Monika',
              text: 'Szczerze? Nie mamy samochodu z bagażnikiem na trzy rowery. A w serwisie na Powstańców czeka się tydzień.',
              choices: [
                { text: 'Dziękuję, to bardzo pomocne. Czy mogę zadzwonić, gdy ruszę z testowymi terminami w kwietniu?', next: 'end', good: true, feedback: 'Konkretna, uczciwa propozycja następnego kroku. Zgoda na telefon to mocniejszy sygnał niż pochwała.' },
                { text: 'No to mój serwis jest dla Pani idealny!', next: 'end', good: false, feedback: 'Wniosek za rozmówczynię. Lepiej poprosić o następny krok, który coś ją kosztuje: zgodę na kontakt, rezerwację.' },
              ],
            },
            end: { end: true, text: 'W notatce Ola zapisuje fakty: 3 rowery, brak przeglądu od 2 lat, brak samochodu, tydzień czekania w serwisie, zgoda na telefon w kwietniu.' },
          },
        },
      ],
    },
    {
      id: 'test',
      label: 'Test',
      title: 'Najmniejszy test, który coś rozstrzygnie',
      duration: 10,
      intro: 'Nie musisz od razu kupować samochodu i narzędzi. Większość pomysłów da się sprawdzić tańszym testem — uczciwie, bez udawania, że usługa już działa w pełnej skali.',
      reading: {
        table: {
          head: ['Test', 'Co sprawdza', 'Koszt'],
          rows: [
            ['5–10 rozmów o ostatniej sytuacji', 'Czy problem istnieje i jak klienci sobie radzą', 'Czas'],
            ['Strona lub ulotka z zapisami na termin', 'Czy ludzie zostawią dane i wybiorą termin', 'Niski'],
            ['Kilka prawdziwych usług „ręcznie”', 'Czy zapłacą i ile trwa realizacja', 'Niski–średni'],
            ['Przedsprzedaż z zaliczką', 'Czy zapłacą z góry', 'Niski, ale trzeba dotrzymać słowa'],
          ],
        },
        paragraphs: ['Uczciwy test: opisujesz prawdziwą usługę, cenę i termin, a jeśli zbierasz zapisy na coś, czego jeszcze nie ma, mówisz to wprost. Zaliczkę bierzesz tylko wtedy, gdy możesz usługę wykonać albo oddać pieniądze.'],
      },
      activities: [
        choice(
          'm3-test',
          'Ola chce sprawdzić, czy ludzie zapłacą za dojazd. Który test najlepiej na to odpowie?',
          [
            'Ankieta online: „Czy zapłaciłby Pan za dojazd mechanika?”',
            'Tydzień testowy na jednym osiedlu: 12 terminów z ceną 120 zł za trzy rowery, rezerwacja przez telefon',
            'Profil w mediach społecznościowych i licznik obserwujących po miesiącu',
          ],
          1,
          'Rezerwacja konkretnego terminu z ceną to zachowanie, nie deklaracja. 12 terminów Ola obsłuży sama, bez inwestycji.',
          ['Ankieta da deklaracje, a pytanie jest zamknięte i sugerujące.', null, 'Obserwujący to widoczność, nie gotowość do zapłaty.'],
        ),
        {
          type: 'projectField',
          id: 'm3-pole-test',
          field: 'm3-3',
          label: 'Test: metoda, czas, koszt, sposób pozyskania rozmówców',
          example: 'Tydzień 14–20 kwietnia, osiedle przy ul. Gajowickiej. 12 terminów, cena 120 zł za trzy rowery. Ulotki w 3 klatkach i post w grupie osiedlowej. Koszt: 80 zł druk, 2 dni pracy.',
        },
      ],
    },
    {
      id: 'prog',
      label: 'Próg',
      title: 'Próg decyzji — przed testem',
      duration: 8,
      intro: 'Jeśli próg ustalasz po teście, zawsze znajdziesz powód, żeby uznać wynik za sukces.',
      reading: {
        paragraphs: [
          'Przed testem zapisz: co liczysz (np. rezerwacje na 100 rozmów), jaki wynik oznacza „kontynuuję”, jaki „zmieniam” i jaki „zatrzymuję”. Próg to Twoja decyzja biznesowa — nie dowód naukowy, ale chroni przed oszukiwaniem samego siebie.',
        ],
      },
      activities: [
        number('m3-wynik', 'Ola rozdała ulotki i porozmawiała osobiście z 40 rodzinami. 6 zarezerwowało termin. Jaki procent rozmów skończył się rezerwacją?', 15, '6 ÷ 40 = 0,15, czyli 15%.', {
          unit: '%',
          tolerance: 0.1,
          mistakes: [{ value: 6.67, text: 'Dzielenie jest odwrotne. Rezerwacje dzielisz przez liczbę rozmów: 6 ÷ 40.' }],
        }),
        choice(
          'm3-decyzja',
          'Ola przed testem zapisała: poniżej 5% — zatrzymuję, 5–10% — zmieniam cenę lub osiedle, powyżej 10% — kontynuuję. Co teraz?',
          ['Kontynuuje — 15% jest powyżej progu', 'Zmienia cenę — wynik jest „tylko” 15%', 'Zatrzymuje — 6 rezerwacji to za mało, żeby się utrzymać', 'Powtarza ten sam test jeszcze trzy razy, zanim cokolwiek postanowi'],
          0,
          'Decyzja wynika z progu zapisanego wcześniej. Kolejny krok to test na drugim osiedlu albo dłuższy okres — już z wiedzą, ile trwa jedna wizyta.',
          [null, 'Wynik mieści się w przedziale „kontynuuję”, który Ola sama ustaliła.', 'Próg dotyczył odsetka rezerwacji, nie liczby klientów do utrzymania firmy — to policzy w module 4.', 'Bez nowego pytania kolejne powtórki odkładają decyzję.'],
        ),
        {
          type: 'projectField',
          id: 'm3-pole-prog',
          field: 'm3-4',
          label: 'Miernik i próg decyzji ustalone przed testem',
          example: 'Miernik: rezerwacje na 100 rozmów. Poniżej 5 — zatrzymuję. 5–10 — zmieniam cenę albo osiedle. Powyżej 10 — kontynuuję na drugim osiedlu.',
        },
      ],
    },
    {
      id: 'decyzja',
      label: 'Decyzja',
      title: 'Fakty, wnioski, decyzja',
      duration: 8,
      intro: 'Po teście zapisz najpierw same fakty, potem wnioski, na końcu decyzję. W tej kolejności łatwiej zauważyć, że jakiś wniosek nie ma pokrycia.',
      activities: [
        {
          type: 'matching',
          id: 'm3-fakt',
          question: 'Fakt czy wniosek?',
          options: ['Fakt', 'Wniosek'],
          rows: [
            { label: '6 z 40 rodzin zarezerwowało termin', correct: 0 },
            { label: 'Rodzice na Krzykach chętnie płacą za wygodę', correct: 1 },
            { label: 'Jedna wizyta z trzema rowerami trwała średnio 70 minut', correct: 0 },
            { label: 'Usługa sprawdzi się w całym Wrocławiu', correct: 1, explanation: 'Jedno osiedle to za mało, żeby to stwierdzić.' },
            { label: '2 rodziny pytały o stały przegląd co pół roku', correct: 0 },
          ],
          explanation: 'Wnioski mogą być trafne, ale muszą wynikać z faktów. Uogólnienie na całe miasto wymaga kolejnego testu.',
        },
        {
          type: 'projectField',
          id: 'm3-pole-wynik',
          field: 'm3-5',
          label: 'Wynik, dowody i decyzja: kontynuuję / zmieniam / zatrzymuję',
          prompt: 'Jeśli test jeszcze przed Tobą, zapisz, kiedy go zrobisz i kiedy tu wrócisz.',
          example: 'Fakty: 40 rozmów, 6 rezerwacji (15%), wizyta ok. 70 min, 2 pytania o stały przegląd. Decyzja: kontynuuję — w maju test na drugim osiedlu, cena bez zmian.',
        },
      ],
    },
  ],
};
