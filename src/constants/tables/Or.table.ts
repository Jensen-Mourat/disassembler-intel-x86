import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const OR_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: '0C'}, {operation: 'or', length: 'b', op1: 'al', op2: 'imm8', isRegisterIncluded: true})
    .set({opcode: '0D'}, {operation: 'or', length: 'd', op1: 'eax', op2: 'imm32', isRegisterIncluded: true, has16Bit: true})
    .set({opcode: '80', modRm: '1'}, {operation: 'or', length: 'd', op1: 'm8', op2: 'imm8'})
    .set({opcode: '81', modRm: '1'}, {operation: 'or', length: 'd', op1: 'm32', op2: 'imm32', has16Bit: true})
    .set({opcode: '83', modRm: '1'}, {operation: 'or', length: 'b', op1: 'm32', op2: 'imm8', isSignExtended: true})
    .set({opcode: '08'}, {operation: 'or', op1: 'm8', op2: 'r8'})
    .set({opcode: '09'}, {operation: 'or', op1: 'm32', op2: 'r32', has16Bit: true})
    .set({opcode: '0A'}, {operation: 'or', op1: 'r8', op2: 'm8'})
    .set({opcode: '0B'}, {operation: 'or', op1: 'r32', op2: 'm32', has16Bit: true});
