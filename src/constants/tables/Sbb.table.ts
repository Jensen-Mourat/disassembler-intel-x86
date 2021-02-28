import { HashMap } from '../../helper/hashMap';
import { OpCode, Operation } from './index';

export const SBB_TABLE = new HashMap<OpCode, Operation>()
  .set({ opcode: '1C' }, { operation: 'sbb', length: 'b', op1: 'al', op2: 'imm8', isRegisterIncluded: true })
  .set(
    { opcode: '1D' },
    { operation: 'sbb', length: 'd', op1: 'eax', op2: 'imm32', isRegisterIncluded: true, has16Bit: true },
  )
  .set({ opcode: '80', modRm: '3' }, { operation: 'sbb', length: 'b', op1: 'm8', op2: 'imm8' })
  .set({ opcode: '81', modRm: '3' }, { operation: 'sbb', length: 'd', op1: 'm32', op2: 'imm32', has16Bit: true })
  .set({ opcode: '83', modRm: '3' }, { operation: 'sbb', length: 'b', op1: 'm32', op2: 'imm8', isSignExtended: true })
  .set({ opcode: '18' }, { operation: 'sbb', op1: 'm8', op2: 'r8' })
  .set({ opcode: '19' }, { operation: 'sbb', op1: 'm32', op2: 'r32', has16Bit: true })
  .set({ opcode: '1A' }, { operation: 'sbb', op1: 'r8', op2: 'm8' })
  .set({ opcode: '1B' }, { operation: 'sbb', op1: 'r32', op2: 'm32', has16Bit: true });
