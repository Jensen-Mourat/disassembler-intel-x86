import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const IDIV_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: 'F6', modRm: '7'}, {operation: 'idiv', op1: 'm8'})
    .set({opcode: 'F7', modRm: '7'}, {operation: 'idiv', op1: 'm32', has16Bit: true});
