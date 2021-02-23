import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const ADD_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: '04'}, {operation: 'add', length: 'b', op1: 'al', op2: 'imm8', isOneByte: true})
    .set({opcode: '05'}, {operation: 'add', length: 'd', op1: 'eax', op2: 'imm32', isOneByte: true, has16Bit: true})
    .set({opcode: '80', modRm: '0'}, {operation: 'add', length: 'd', op1: 'm8', op2: 'imm8'})
    .set({opcode: '81', modRm: '0'}, {operation: 'add', length: 'd', op1: 'm32', op2: 'imm32', has16Bit: true})
    .set({opcode: '83', modRm: '0'}, {operation: 'add', length: 'b', op1: 'm32', op2: 'imm8', isSignExtended: true})
    .set({opcode: '00'}, {operation: 'add', op1: 'm8', op2: 'r8'})
    .set({opcode: '01'}, {operation: 'add', op1: 'm32', op2: 'r32', has16Bit: true})
    .set({opcode: '02'}, {operation: 'add', op1: 'r8', op2: 'm8'})
    .set({opcode: '03'}, {operation: 'add', op1: 'r32', op2: 'm32', has16Bit: true});
