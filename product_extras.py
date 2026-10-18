"""Informacje o materiałach i przenośne narzędzia finansowe."""
import zipfile
from xml.sax.saxutils import escape
from portal import ROOT, e, heading, shell, write, button

def about():
    body=heading('ŹRÓDŁA I ZASADY','Wiesz, z czym pracujesz.','Zakres materiałów, autorstwo i zapis Twoich danych.')+'''<article class="prose panel"><h2>Co zawiera serwis</h2><p>Osiem opracowań modułowych WP4.4.A1, polskie uzupełnienia dydaktyczne, osiem fikcyjnych przykładów, 48 pól projektu, 24 pytania quizowe, karty pracy, Lean Canvas i cash flow. Wersja: 18.10.2026.</p><h2>Baza i uzupełnienia</h2><p>Baza: <em>Consulting and coaching programme for aspiring entrepreneurs</em>, WIN4SMEs CoVE, materiały modułowe i Coach Corner. Projekt polskiego wdrożenia: Wiesław Filipiak, Maciej Najwer, Zespół Szkół Zawodowych nr 5 we Wrocławiu, listopad 2025. Nowe polskie przypadki, quizy, scenariusze 165 min i karty są autorskimi propozycjami metodycznymi uzupełniającymi opracowania.</p><p>Moduł 4 zawiera fragmenty programu Digital Coach: Ch. Prinz, B. Kuhlenkötter, Ruhr University Bochum, 2020, CC BY 4.0. Lean Canvas: koncepcja Ash Maurya, własny układ karty ćwiczeniowej. Cytowane publikacje i materiały zewnętrzne zachowują prawa autorów. Serwis nie przenosi praw do cudzych kursów i dokumentów.</p><h2>Oryginały i nagrania</h2><p>W repozytorium nie ma oryginalnych MP4, DOCX, PPTX ani PDF wymienionych w dokumentacji. Serwis nie udostępnia ich kopii. Program można przejść z dostępnymi treściami, ćwiczeniami i materiałami własnymi. Kursy zewnętrzne są opcjonalne; część wymaga zapisu.</p><h2>Aktualność</h2><p>Biblioteka podaje wydawcę, datę i sposób sprawdzenia odnośników. Biznes.gov.pl potwierdzono w indeksie oficjalnego portalu; bezpośredni odczyt był zablokowany. Warunki rejestracji, podatki, finansowanie i obowiązki ESG sprawdzaj w bieżącym źródle. Materiał szkoleniowy nie rozstrzyga sytuacji prawnej konkretnej firmy. Starsze kwoty oraz zagraniczne przykłady w rozwinięciach są kontekstem historycznym.</p><h2>Twoje dane</h2><p>Nie ma kont, formularzy wysyłkowych ani zewnętrznych skryptów analitycznych. Projekt, wyniki i ustawienie widoku zapisują się w localStorage przeglądarki, pod kluczem pracownia-project-v1. Serwis nie wysyła notatek prowadzącemu. Hosting może przetwarzać standardowe dane połączenia według zasad swojego dostawcy.</p><p>Osoba używająca tego samego profilu przeglądarki może zobaczyć notatki. Tryb prywatny, wyczyszczenie danych witryny lub zmiana urządzenia mogą spowodować utratę zapisu. Eksportuj JSON i zachowuj kopię samodzielnie. Nie wpisuj danych klientów i poufnych informacji. Dane kursu usuniesz w „Moim projekcie”. Linki zewnętrzne otwierasz na własne żądanie; obowiązują tam zasady wydawców.</p><h2>Dostępność i offline</h2><p>Serwis korzysta z semantycznych nagłówków, etykiet i obsługi klawiaturą. Karty drukują się bez nawigacji. Pakiet offline zawiera lokalne moduły, skrypty i materiały do druku; źródła zewnętrzne wymagają internetu. Dla pewnego zapisu korzystaj z HTTP(S); zachowanie localStorage przy otwieraniu plików z dysku zależy od przeglądarki.</p><h2>Samoocena</h2><p>Ukończenie jest deklaracją uczestnika, a quiz służy nauce. Serwis nie wystawia kwalifikacji ani nie potwierdza wyników pilotażu.</p></article>'''
    write('o-materialach.html',shell('O materiałach i prywatności',body,'o-materialach.html'))

def cash_flow():
    labels=[('opening','Saldo początkowe'),('sales','Wpływy od klientów'),('funding','Finansowanie / inne wpływy'),('materials','Materiały i towary'),('fixed','Koszty stałe — wydatki'),('tax','Podatki i składki — płatności'),('investment','Inwestycje'),('other','Pozostałe wydatki')]
    rows=[]
    for key,label in labels:
        cells=''.join(f'<td><label class="sr-only" for="cash-{key}-{i}">{label}, miesiąc {i+1}</label><input id="cash-{key}-{i}" data-cash="{key}" data-month="{i}" type="number" step="0.01" '+('readonly' if key=='opening' and i>0 else '')+' value="0"></td>' for i in range(6))
        rows.append(f'<tr><th scope="row">{label}</th>{cells}</tr>')
    for key,label in [('net','Przepływ netto'),('closing','Saldo końcowe')]:
        rows.append(f'<tr class="total"><th scope="row">{label}</th>'+''.join(f'<td><output data-cash-output="{key}" data-month="{i}">0,00 zł</output></td>' for i in range(6))+'</tr>')
    body=heading('NARZĘDZIE · MODUŁ 4','Zobacz, kiedy potrzebujesz gotówki.','Sześć miesięcy wpływów i wydatków. Wpisuj kwoty w PLN w miesiącu rzeczywistego przepływu.')+f'''<p class="notice">Narzędzie planowania, nie księgowość. Salda kolejnych miesięcy liczą się automatycznie. Dane zapisują się razem z projektem na tym urządzeniu.</p><div class="actions"><button class="button secondary" id="cash-example">Wczytaj przykład piekarni</button><button class="button secondary" id="cash-export">Pobierz tabelę CSV</button>{button('downloads/cash-flow.xlsx','Pobierz arkusz XLSX',True,'download')}<button class="text-button" id="cash-clear">Wyczyść kalkulator</button></div><div class="tablewrap section"><table class="cash-table"><caption>Przepływy pieniężne · PLN · miesiące 1–6</caption><thead><tr><th>Pozycja</th>{''.join(f'<th scope="col">Miesiąc {i+1}</th>' for i in range(6))}</tr></thead><tbody>{''.join(rows)}</tbody></table></div><p id="cash-summary" class="notice" role="status"></p><section class="prose panel"><h2>Jak interpretować wynik?</h2><p>Przepływ netto = wpływy od klientów + finansowanie − wszystkie wydatki. Saldo końcowe = saldo początkowe + przepływ netto. Finansowanie nie jest przychodem ze sprzedaży. Wpisuj płatności zgodnie z terminem przepływu, a nie datą faktury.</p><p>Ujemne saldo pokazuje lukę w planie. Sprawdź terminy płatności, skalę wydatków i finansowanie. Porównaj wariant podstawowy z ostrożnym: opóźnij wpływy o miesiąc lub obniż je o 20%.</p><p>Przykład jest fikcyjny: piekarnia kupuje opakowania i sprzęt przed uzyskaniem wpływów. Nie jest prognozą dla rzeczywistej firmy.</p></section>'''
    write('cash-flow.html',shell('Kalkulator cash flow',body,'cash-flow.html'))
    make_xlsx()

def make_xlsx():
    rows=[]
    labels=['Pozycja / PLN','Saldo początkowe','Wpływy od klientów','Finansowanie / inne wpływy','Materiały i towary','Koszty stałe — wydatki','Podatki i składki — płatności','Inwestycje','Pozostałe wydatki','Suma wpływów','Suma wydatków','Przepływ netto','Saldo końcowe']
    for row,label in enumerate(labels,1):
        cells=[f'<c r="A{row}" t="inlineStr"><is><t>{escape(label)}</t></is></c>']
        for i,col in enumerate('BCDEFG'):
            cell=f'{col}{row}';formula=None;val=0
            if row==1:
                cells.append(f'<c r="{cell}" t="inlineStr"><is><t>Miesiąc {i+1}</t></is></c>');continue
            if row==2:
                if i: formula=f'{chr(ord(col)-1)}13'
                else: val=10000
            elif row==10: formula=f'SUM({col}3:{col}4)'
            elif row==11: formula=f'SUM({col}5:{col}9)'
            elif row==12: formula=f'{col}10-{col}11'
            elif row==13: formula=f'{col}2+{col}12'
            elif row==3: val=[6000,9000,12000,15000,16000,17000][i]
            elif row==5: val=[4000,5000,6000,6500,7000,7500][i]
            elif row==6: val=4000
            elif row==7: val=1500
            elif row==8: val=5000 if i==0 else 0
            cells.append(f'<c r="{cell}"><f>{formula}</f></c>' if formula else f'<c r="{cell}"><v>{val}</v></c>')
        rows.append(f'<row r="{row}">{"".join(cells)}</row>')
    instructions=['DANE FIKCYJNE — ZASTĄP WŁASNYMI','Edytuj B2 oraz B3:G9. Pozostałe pola obliczają się formułami.','Wszystkie kwoty w PLN, zgodnie z miesiącem przepływu.','Saldo początkowe kolejnego miesiąca to poprzednie saldo końcowe.','Finansowanie nie jest sprzedażą. Arkusz nie jest księgowością.','Porównaj wariant z wpływami niższymi o 20% lub opóźnionymi o miesiąc.','Ujemne saldo oznacza lukę gotówkową. Uwzględnij bufor.']
    for i,text in enumerate(instructions,15):rows.append(f'<row r="{i}"><c r="A{i}" t="inlineStr"><is><t>{escape(text)}</t></is></c></row>')
    files={
      '[Content_Types].xml':'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
      '_rels/.rels':'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
      'xl/workbook.xml':'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Cash flow" sheetId="1" r:id="rId1"/></sheets><calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>',
      'xl/_rels/workbook.xml.rels':'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',
      'xl/worksheets/sheet1.xml':'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><cols><col min="1" max="1" width="36" customWidth="1"/><col min="2" max="7" width="17" customWidth="1"/></cols><sheetData>'+''.join(rows)+'</sheetData></worksheet>'}
    with zipfile.ZipFile(ROOT/'downloads/cash-flow.xlsx','w',zipfile.ZIP_DEFLATED) as z:
        for name,data in files.items():
            info=zipfile.ZipInfo(name,(2026,10,18,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
            z.writestr(info,'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+data)
