import { HashMap } from '../../helper/hashMap';
import { OpCode, Operation } from './index';

export const XCHG_TABLE = new HashMap<OpCode, Operation>()
  .set(
    { opcode: '90' },
    {
      type: 'rd',
      operation: 'xchg',
      op1: 'eax',
      op2: 'r32',
      isRegisterIncluded: true,
      has16Bit: true,
    },
  )
  .set({ opcode: '86' }, { operation: 'xchg', op1: 'r8', op2: 'm8' })
  .set({ opcode: '87' }, { operation: 'xchg', op1: 'r32', op2: 'm32', has16Bit: true });
