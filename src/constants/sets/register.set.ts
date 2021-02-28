import { mergeSets } from '../../helper/mergeSets';

export const EightBitRegisters = new Set(['al', 'bl', 'cl', 'dl', 'ah', 'bh', 'ch', 'dh']);
export const SixteenBitRegisters = new Set(['ax', 'bx', 'cx', 'dx', 'sp', 'bp', 'si', 'di']);
export const ThirtyTwoBitRegisters = new Set(['eax', 'ebx', 'ecx', 'edx', 'esp', 'ebp', 'esi', 'edi']);

const allRegisters = () => {
  return mergeSets(EightBitRegisters, SixteenBitRegisters, ThirtyTwoBitRegisters);
};

export const ALL_REGISTERS = allRegisters();
