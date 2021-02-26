import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const RET_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: 'C3'}, {operation: 'ret'})
    .set({opcode: 'CB'}, {operation: 'ret'})
    .set({opcode: 'C2'}, {operation: 'ret', op1: 'imm16'})
    .set({opcode: 'CA'}, {operation: 'ret', op1: 'imm16'});
