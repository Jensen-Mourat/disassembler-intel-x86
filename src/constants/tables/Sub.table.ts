import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const SUB_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: '2C'}, {operation: 'sub', length: 'b', op1: 'al', op2: 'imm8', isRegisterIncluded: true})
    .set({opcode: '2D'}, {
        operation: 'sub',
        length: 'd',
        op1: 'eax',
        op2: 'imm32',
        isRegisterIncluded: true,
        has16Bit: true
    })
    .set({opcode: '80', modRm: '5'}, {operation: 'sub', length: 'b', op1: 'm8', op2: 'imm8'})
    .set({opcode: '81', modRm: '5'}, {operation: 'sub', length: 'd', op1: 'm32', op2: 'imm32', has16Bit: true})
    .set({opcode: '83', modRm: '5'}, {operation: 'sub', length: 'b', op1: 'm32', op2: 'imm8', isSignExtended: true})
    .set({opcode: '28'}, {operation: 'sub', op1: 'm8', op2: 'r8'})
    .set({opcode: '29'}, {operation: 'sub', op1: 'm32', op2: 'r32', has16Bit: true})
    .set({opcode: '2A'}, {operation: 'sub', op1: 'r8', op2: 'm8'})
    .set({opcode: '2B'}, {operation: 'sub', op1: 'r32', op2: 'm32', has16Bit: true});
