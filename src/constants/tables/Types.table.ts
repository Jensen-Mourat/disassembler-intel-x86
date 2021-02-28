export const typeTable = new Map<string, Map<number, string>>()
  .set(
    'rb',
    new Map().set(0, 'al').set(1, 'cl').set(2, 'dl').set(3, 'bl').set(4, 'ah').set(5, 'ch').set(6, 'dh').set(7, 'bh'),
  )
  .set(
    'rw',
    new Map().set(0, 'ax').set(1, 'cx').set(2, 'dx').set(3, 'bx').set(4, 'sp').set(5, 'bp').set(6, 'si').set(7, 'di'),
  )
  .set(
    'rd',
    new Map()
      .set(0, 'eax')
      .set(1, 'ecx')
      .set(2, 'edx')
      .set(3, 'ebx')
      .set(4, 'esp')
      .set(5, 'ebp')
      .set(6, 'esi')
      .set(7, 'edi'),
  );
