import { HashMap } from '../../helper/hashMap';
import { OpCode, Operation } from './index';

export const LOOP_TABLE = new HashMap<OpCode, Operation>()
  .set({ opcode: 'E2' }, { operation: 'loop', op1: 'imm8' })
  .set({ opcode: 'E1' }, { operation: 'loope', op1: 'imm8' })
  .set({ opcode: 'E0' }, { operation: 'loopne', op1: 'imm8' });
