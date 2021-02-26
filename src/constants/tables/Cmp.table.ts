import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const CMP_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: '3C'}, {operation: 'cmp', length: 'b', op1: 'al', op2: 'imm8', isRegisterIncluded: true})
    .set({opcode: '3D'}, {operation: 'cmp', length: 'd', op1: 'eax', op2: 'imm32', isRegisterIncluded: true, has16Bit: true})
    .set({opcode: '80', modRm: '7'}, {operation: 'cmp', length: 'd', op1: 'm8', op2: 'imm8'})
    .set({opcode: '81', modRm: '7'}, {operation: 'cmp', length: 'd', op1: 'm32', op2: 'imm32', has16Bit: true})
    .set({opcode: '83', modRm: '7'}, {operation: 'cmp', length: 'b', op1: 'm32', op2: 'imm8'})
    .set({opcode: '38'}, {operation: 'cmp', op1: 'm8', op2: 'r8'})
    .set({opcode: '39'}, {operation: 'cmp', op1: 'm32', op2: 'r32', has16Bit: true})
    .set({opcode: '3A'}, {operation: 'cmp', op1: 'r8', op2: 'm8'})
    .set({opcode: '3B'}, {operation: 'cmp', op1: 'r32', op2: 'm32', has16Bit: true});
