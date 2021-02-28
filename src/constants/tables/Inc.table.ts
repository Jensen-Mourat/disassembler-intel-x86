import { HashMap } from '../../helper/hashMap';
import { OpCode, Operation } from './index';

export const INC_TABLE = new HashMap<OpCode, Operation>()
  .set({ opcode: 'FE', modRm: '0' }, { operation: 'inc', op1: 'm8' })
  .set({ opcode: 'FF', modRm: '0' }, { operation: 'inc', op1: 'm32', has16Bit: true })
  .set({ opcode: '40' }, { type: 'rd', operation: 'inc', op1: 'r32', has16Bit: true });
