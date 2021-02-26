import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const ADC_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: '14'}, {operation: 'adc', length: 'b', op1: 'al', op2: 'imm8', isRegisterIncluded: true})
    .set({opcode: '15'}, {
        operation: 'adc',
        length: 'd',
        op1: 'eax',
        op2: 'imm32',
        isRegisterIncluded: true,
        has16Bit: true
    })
    .set({opcode: '80', modRm: '2'}, {operation: 'adc', length: 'd', op1: 'm8', op2: 'imm8'})
    .set({opcode: '81', modRm: '2'}, {operation: 'adc', length: 'd', op1: 'm32', op2: 'imm32', has16Bit: true})
    .set({opcode: '83', modRm: '2'}, {operation: 'adc', length: 'b', op1: 'm32', op2: 'imm8', isSignExtended: true})
    .set({opcode: '10'}, {operation: 'adc', op1: 'm8', op2: 'r8'})
    .set({opcode: '11'}, {operation: 'adc', op1: 'm32', op2: 'r32', has16Bit: true})
    .set({opcode: '12'}, {operation: 'adc', op1: 'r8', op2: 'm8'})
    .set({opcode: '13'}, {operation: 'adc', op1: 'r32', op2: 'm32', has16Bit: true});
