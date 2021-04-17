import { HashMap } from '../../helper/hashMap';
import { OpCode, Operation } from './index';

export const SHR_TABLE = new HashMap<OpCode, Operation>()
  .set({ opcode: 'D0', modRm: '5' }, { operation: 'shr', op1: 'm8', constant: '1' })
  .set({ opcode: 'D2', modRm: '5' }, { operation: 'shr', op1: 'm8', op2: 'cl', isRegisterIncluded: true })
  .set({ opcode: 'C0', modRm: '5' }, { operation: 'shr', op1: 'm8', op2: 'imm8' })
  .set({ opcode: 'D1', modRm: '5' }, { operation: 'shr', op1: 'm32', constant: '1', has16Bit: true })
  .set(
    { opcode: 'D3', modRm: '5' },
    {
      operation: 'shr',
      op1: 'm32',
      op2: 'cl',
      isRegisterIncluded: true,
      has16Bit: true,
    },
  )
  .set({ opcode: 'C1', modRm: '5' }, { operation: 'shr', op1: 'm32', op2: 'imm8', has16Bit: true });
