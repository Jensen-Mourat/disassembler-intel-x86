import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const NEG_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: 'F6', modRm: '3'}, {operation: 'neg', op1: 'm8'})
    .set({opcode: 'F7', modRm: '3'}, {operation: 'neg', op1: 'm32', has16Bit: true});
