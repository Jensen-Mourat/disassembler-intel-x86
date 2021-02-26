import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const IMUL_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: 'F6', modRm: '5'}, {operation: 'imul', op1: 'm8'})
    .set({opcode: 'F7', modRm: '5'}, {operation: 'imul', op1: 'm32', has16Bit: true})
    .set({opcode: 'OFAF'}, {operation: 'imul', op1: 'r32', op2:'m32', has16Bit: true})
    // 3 operand not supported yet
;
