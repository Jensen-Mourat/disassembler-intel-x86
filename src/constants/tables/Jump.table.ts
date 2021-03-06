import { HashMap } from '../../helper/hashMap';
import { OpCode, Operation } from './index';

// only rel jump supported
export const JMP_TABLE = new HashMap<OpCode, Operation>()
  .set({ opcode: 'EB' }, { operation: 'jmp', op1: 'imm8' })
  .set({ opcode: 'E9' }, { operation: 'jmp', op1: 'imm32', has16Bit: true })
  .set({ opcode: '77' }, { operation: 'ja', op1: 'imm8' })
  .set({ opcode: '73' }, { operation: 'jae', op1: 'imm8' })
  .set({ opcode: '72' }, { operation: 'jb', op1: 'imm8' })
  .set({ opcode: '76' }, { operation: 'jbe', op1: 'imm8' })
  .set({ opcode: '72' }, { operation: 'jc', op1: 'imm8' })
  .set({ opcode: 'E3' }, { operation: 'jcx', op1: 'imm8' })
  .set({ opcode: '74' }, { operation: 'je', op1: 'imm8' })
  .set({ opcode: '7F' }, { operation: 'jg', op1: 'imm8' })
  .set({ opcode: '7D' }, { operation: 'jge', op1: 'imm8' })
  .set({ opcode: '7C' }, { operation: 'jl', op1: 'imm8' })
  .set({ opcode: '7E' }, { operation: 'jle', op1: 'imm8' })
  .set({ opcode: '76' }, { operation: 'jna', op1: 'imm8' })
  .set({ opcode: '73' }, { operation: 'jnc', op1: 'imm8' })
  .set({ opcode: '75' }, { operation: 'jne', op1: 'imm8' })
  .set({ opcode: '7E' }, { operation: 'jng', op1: 'imm8' })
  .set({ opcode: '7D' }, { operation: 'jnl', op1: 'imm8' })
  .set({ opcode: '71' }, { operation: 'jno', op1: 'imm8' })
  .set({ opcode: '7B' }, { operation: 'jnp', op1: 'imm8' })
  .set({ opcode: '79' }, { operation: 'jns', op1: 'imm8' })
  .set({ opcode: '75' }, { operation: 'jnz', op1: 'imm8' })
  .set({ opcode: '70' }, { operation: 'jo', op1: 'imm8' })
  .set({ opcode: '7A' }, { operation: 'jp', op1: 'imm8' })
  .set({ opcode: '7A' }, { operation: 'jpe', op1: 'imm8' })
  .set({ opcode: '7B' }, { operation: 'jpo', op1: 'imm8' })
  .set({ opcode: '78' }, { operation: 'js', op1: 'imm8' })
  .set({ opcode: '74' }, { operation: 'jz', op1: 'imm8' })
  .set({ opcode: '0F87' }, { operation: 'ja', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F83' }, { operation: 'jae', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F82' }, { operation: 'jb', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F86' }, { operation: 'jbe', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F82' }, { operation: 'jc', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F84' }, { operation: 'je', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F84' }, { operation: 'jz', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F8F' }, { operation: 'jg', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F8D' }, { operation: 'jge', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F8C' }, { operation: 'jl', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F8E' }, { operation: 'jle', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F86' }, { operation: 'jna', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F83' }, { operation: 'jnb', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F83' }, { operation: 'jnc', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F85' }, { operation: 'jne', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F8E' }, { operation: 'jng', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F8D' }, { operation: 'jnl', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F81' }, { operation: 'jno', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F8B' }, { operation: 'jnp', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F89' }, { operation: 'jns', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F85' }, { operation: 'jnz', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F80' }, { operation: 'jo', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F8A' }, { operation: 'jp', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F8A' }, { operation: 'jpe', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F8B' }, { operation: 'jpo', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F88' }, { operation: 'js', op1: 'imm32', has16Bit: true })
  .set({ opcode: '0F84' }, { operation: 'jz', op1: 'imm32', has16Bit: true })
  .set({ opcode: 'E2' }, { operation: 'loop', op1: 'imm8', has16Bit: true });
