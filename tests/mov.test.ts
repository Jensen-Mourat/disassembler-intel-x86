import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {Disassembler} from '../index';

_chai.should();

@suite
class movTest {

    before() {
    }

    @test 'random test'() {
        Disassembler.generateInstructions('B811000000').should.eql([{
            instruction: 'mov',
            operand1: {register: 'eax'},
            operand2: {value: '11'},
            position: 0,
        }]);
        Disassembler.generateInstructions('B911111111').should.eql([{
            instruction: 'mov',
            operand1: {register: 'ecx'},
            operand2: {value: '11111111'},
            position: 0,
        }]);
        Disassembler.generateInstructions('BB11110000').should.eql([{
            instruction: 'mov',
            operand1: {register: 'ebx'},
            operand2: {value: '1111'},
            position: 0,
        }]);
        Disassembler.generateInstructions('89D8').should.eql([{
            instruction: 'mov',
            operand1: {register: 'eax'},
            operand2: {register: 'ebx'},
            position: 0,
        }]);
        Disassembler.generateInstructions('8918').should.eql([{
            instruction: 'mov',
            operand1: {pointer: 'd', register: 'eax'},
            operand2: {register: 'ebx'},

            position: 0,
        }]);
        Disassembler.generateInstructions('8b03').should.eql([{
            instruction: 'mov',
            operand1: {register: 'eax'},
            operand2: {pointer: 'd', register: 'ebx'},
            position: 0,
        }]);
        Disassembler.generateInstructions('66C7001111').should.eql([{
            instruction: 'mov',
            operand1: {register: 'eax', pointer: 'w'},
            operand2: {value: '1111'},
            position: 0,
        }]);
        Disassembler.generateInstructions('C7801111000011111111 ').should.eql([{
            instruction: 'mov',
            operand1: {register: 'eax', pointer: 'd', displacement: '1111'},
            operand2: {value: '11111111'},
            position: 0,
        }]);
    }
}
