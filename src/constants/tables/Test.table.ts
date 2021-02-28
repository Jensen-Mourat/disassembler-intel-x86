import { HashMap } from '../../helper/hashMap';
import { OpCode, Operation } from './index';

export const TEST_TABLE = new HashMap<OpCode, Operation>()
  .set({ opcode: 'A8' }, { operation: 'test', length: 'b', op1: 'al', op2: 'imm8', isRegisterIncluded: true })
  .set(
    { opcode: 'A9' },
    { operation: 'test', length: 'd', op1: 'eax', op2: 'imm32', isRegisterIncluded: true, has16Bit: true },
  )
  .set({ opcode: 'F6', modRm: '0' }, { operation: 'test', length: 'd', op1: 'm8', op2: 'imm8' })
  .set({ opcode: 'F7', modRm: '0' }, { operation: 'test', length: 'd', op1: 'm32', op2: 'imm32', has16Bit: true })
  .set({ opcode: '84' }, { operation: 'test', op1: 'm8', op2: 'r8' })
  .set({ opcode: '85' }, { operation: 'test', op1: 'm32', op2: 'r32', has16Bit: true });
