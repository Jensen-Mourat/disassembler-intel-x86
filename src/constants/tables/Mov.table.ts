import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const MOV_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: '88'}, {operation: 'mov', op1: 'm8', op2: 'r8'})
    .set({opcode: '89'}, {operation: 'mov', op1: 'm32', op2: 'r32', has16Bit: true})
    .set({opcode: '8A'}, {operation: 'mov', op1: 'r8', op2: 'm8'})
    .set({opcode: '8B'}, {operation: 'mov', op1: 'r32', op2: 'm32', has16Bit: true})
    .set({opcode: 'B0'}, {operation: 'mov', type: 'rb', length: 'b', op1: 'r8', op2: 'imm8'})
    .set({opcode: 'B8'}, {operation: 'mov', type: 'rd', length: 'd', op1: 'r32', op2: 'imm32', has16Bit: true})
    .set({opcode: 'C6', modRm: '0'}, {operation: 'mov', length: 'b', op1: 'm8', op2: 'imm8'})
    .set({opcode: 'C7', modRm: '0'}, {operation: 'mov', length: 'd', op1: 'm32', op2: 'imm32', has16Bit: true});
