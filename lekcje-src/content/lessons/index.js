const modules = import.meta.glob('./[0-9]*.js', { eager: true, import: 'default' });

export const lessons = Object.values(modules).sort((a, b) => a.order - b.order);

export const parts = {
  A: { title: 'Sprzedaż', subtitle: 'Sklep, towar, klient i kasa', qualification: 'HAN.01 Prowadzenie sprzedaży' },
  B: { title: 'Działania handlowe', subtitle: 'Marketing, dokumenty, magazyn, liczby', qualification: 'HAN.02 Prowadzenie działań handlowych' },
};
