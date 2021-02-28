import { HashMap } from '../../helper/hashMap';
import { OpCode, Operation } from './index';

export const IRET_TABLE = new HashMap<OpCode, Operation>()
  .set({ opcode: 'CF' }, { operation: 'iret' })
  .set({ opcode: 'CF' }, { operation: 'iretd' });
