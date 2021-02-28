import { HashMap } from '../../helper/hashMap';
import { OpCode, Operation } from './index';

export const SAR_TABLE = new HashMap<OpCode, Operation>()
  .set({ opcode: 'D0', modRm: '7' }, { operation: 'sar', op1: 'm8', const: '1' })
  .set({ opcode: 'D2', modRm: '7' }, { operation: 'sar', op1: 'm8', op2: 'cl', isRegisterIncluded: true })
  .set({ opcode: 'C0', modRm: '7' }, { operation: 'sar', op1: 'm8', op2: 'imm8' })
  .set({ opcode: 'D1', modRm: '7' }, { operation: 'sar', op1: 'm32', const: '1', has16Bit: true })
  .set(
    { opcode: 'D3', modRm: '7' },
    {
      operation: 'sar',
      op1: 'm32',
      op2: 'cl',
      isRegisterIncluded: true,
      has16Bit: true,
    },
  )
  .set({ opcode: 'C1', modRm: '7' }, { operation: 'sar', op1: 'm32', op2: 'imm8', has16Bit: true });
