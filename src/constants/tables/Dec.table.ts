import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const DEC_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: 'FE', modRm: '1'}, {operation: 'dec', op1: 'm8'})
    .set({opcode: 'FF', modRm: '2'}, {operation: 'dec', op1: 'm32', has16Bit: true})
    .set({opcode: '48'}, {type: 'rd', operation: 'dec', op1: 'r32', has16Bit: true});
