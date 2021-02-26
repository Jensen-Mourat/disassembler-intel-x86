import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {Disassembler} from '../index';

_chai.should();

@suite
class xchgTest {

    before() {
    }

    @test 'randomTests'() {
        Disassembler.generateInstructions('6693').should.eql([{
            instruction: 'xchg',
            operand1: {register: 'ax'},
            operand2: {register: 'bx'},
            position: 0,
        }]);
        Disassembler.generateInstructions('93').should.eql([{
            instruction: 'xchg',
            operand1: {register: 'eax'},
            operand2: {register: 'ebx'},
            position: 0,
        }]);
        Disassembler.generateInstructions('87cb').should.eql([{
            instruction: 'xchg',
            operand2: {register: 'ebx'},
            operand1: {register: 'ecx'},
            position: 0,
        }]);
        Disassembler.generateInstructions('8703').should.eql([{
            instruction: 'xchg',
            operand2: {register: 'ebx', pointer: 'd'},
            operand1: {register: 'eax'},
            position: 0,
        }]);
        Disassembler.generateInstructions('8719').should.eql([{
            instruction: 'xchg',
            operand2: {register: 'ecx', pointer: 'd'},
            operand1: {register: 'ebx'},
            position: 0,
        }]);
        Disassembler.generateInstructions('879911110000').should.eql([{
            instruction: 'xchg',
            operand2: {register: 'ecx', pointer: 'd', displacement: '1111'},
            operand1: {register: 'ebx'},
            position: 0,
        }]);
        Disassembler.generateInstructions('67668718').should.eql([{
            instruction: 'xchg',
            operand2: {register: 'bx', register2: 'si', pointer: 'w'},
            operand1: {register: 'bx'},
            position: 0,
        }]);
    }
}
