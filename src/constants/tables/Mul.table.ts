import { HashMap } from '../../helper/hashMap';
import { OpCode, Operation } from './index';

export const MUL_TABLE = new HashMap<OpCode, Operation>()
  .set({ opcode: 'F6', modRm: '4' }, { operation: 'mul', op1: 'm8' })
  .set({ opcode: 'F7', modRm: '4' }, { operation: 'mul', op1: 'm32', has16Bit: true });
