import { HashMap } from '../../helper/hashMap';
import { OpCode, Operation } from './index';

export const INT_TABLE = new HashMap<OpCode, Operation>()
  .set({ opcode: 'CC' }, { operation: 'int', const: '3' })
  .set({ opcode: 'CD' }, { operation: 'int', op1: 'imm8' })
  .set({ opcode: 'CE' }, { operation: 'into' });
