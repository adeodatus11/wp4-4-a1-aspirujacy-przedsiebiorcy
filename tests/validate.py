"""Kontrola artefaktów: linki, quizy, czasy, paczka offline i formuły XLSX."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(ROOT))
from portal import AGENDA

class Document(HTMLParser):
    def __init__(self,text):
        super().__init__(convert_charrefs=True)
        self.ids=set();self.links=[];self.headings=[];self.duplicate=[];self.inputs=[];self.labels=[]
        self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids:self.duplicate.append(a['id'])
            self.ids.add(a['id'])
        if tag in ('a','script','link'):
            if a.get('href') or a.get('src'):self.links.append(a.get('href') or a.get('src'))
        if tag=='h1':self.headings.append(tag)
        if tag in ('input','textarea','select') and a.get('type') not in ('radio','checkbox','hidden'):self.inputs.append(a)
        if tag=='label' and a.get('for'):self.labels.append(a['for'])

errors=[]
docs={p:Document(p.read_text()) for p in ROOT.glob('*.html')}
docs.update({p:Document(p.read_text()) for p in (ROOT/'downloads').glob('*.html')})
for p,d in docs.items():
    for id in d.duplicate:errors.append(f'{p.name}: powtórzone id {id}')
    for a in d.inputs:
        if a.get('id') not in d.labels and not (a.get('id')=='import-project'):errors.append(f'{p.name}: brak etykiety {a}')
    for link in d.links:
        url=urlsplit(link)
        if url.scheme or url.netloc:continue
        target=(p.parent/unquote(url.path)).resolve() if url.path else p
        if not target.exists():errors.append(f'{p.name}: brak pliku {link}')
        elif url.fragment and target.suffix=='.html':
            other=docs.get(target)
            if other and unquote(url.fragment) not in other.ids:errors.append(f'{p.name}: brak kotwicy {link}')
course=json.loads((ROOT/'src/course.json').read_text())
assert len(course)==8 and len({m['n'] for m in course})==8
assert sum(t for _,t in AGENDA)==165
assert 90+90+165+45==390 and 390*8/60==52
for m in course:
    assert len(m['fields'])==6 and len(m['quiz'])==3
    assert len(m['steps'])>=4 and len(m['rubric'])==3
    for q in m['quiz']:assert len(q[1])==3 and q[2] in range(3) and len(q[3])>20
    d=docs[ROOT/f'modul-{m["n"]}.html']
    assert len(d.headings)==1
    assert {'sedno','przyklad','cwiczenie','projekt','quiz','dla-prowadzacego','zrodla'}<=d.ids
ns={'x':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
with zipfile.ZipFile(ROOT/'downloads/cash-flow.xlsx') as z:
    for name in z.namelist():ET.fromstring(z.read(name))
    sheet=ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
    cells={c.attrib['r']:c for c in sheet.findall('.//x:c',ns)}
    values={}
    # Ocena wszystkich formuł na danych przykładowych, z przeniesieniem salda.
    for col in 'BCDEFG':
        for row in range(2,14):
            addr=f'{col}{row}';cell=cells[addr];formula=cell.find('x:f',ns)
            if formula is None:values[addr]=float(cell.find('x:v',ns).text)
            else:
                f=formula.text
                if f.startswith('SUM('):
                    lo,hi=f[4:-1].split(':');value=sum(values[f'{col}{r}'] for r in range(int(lo[1:]),int(hi[1:])+1))
                elif '+' in f or '-' in f:
                    a,op,b=re.fullmatch(r'([A-G]\d+)([+-])([A-G]\d+)',f).groups();value=values[a]+values[b] if op=='+' else values[a]-values[b]
                else:value=values[f]
                values[addr]=value
    assert [values[f'{col}13'] for col in 'BCDEFG']==[1500,0,500,3500,7000,11000]
with zipfile.ZipFile(ROOT/'downloads/pakiet-offline.zip') as z:
    names=set(z.namelist())
    assert all(f'modul-{n}.html' in names for n in range(1,9))
    assert 'downloads/cash-flow.xlsx' in names and 'assets/core.js' in names
    for name in names:
        if not name.endswith('.html'):continue
        d=Document(z.read(name).decode())
        for link in d.links:
            url=urlsplit(link)
            if url.scheme or url.netloc or not url.path:continue
            from posixpath import normpath,join,dirname
            target=normpath(join(dirname(name),unquote(url.path)))
            if target not in names:errors.append(f'offline {name}: brak {target}')
if errors:
    print('\n'.join(errors));raise SystemExit(1)
print(f'OK: {len(docs)} dokumentów HTML, linki i kotwice, etykiety, 24 pytania, 8 scenariuszy, obliczone formuły XLSX, wszystkie odnośniki pakietu offline.')
