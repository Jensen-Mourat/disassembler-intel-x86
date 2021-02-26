import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {Disassembler} from '../index';

_chai.should();

@suite
class notTest {
    before() {
    }

    @test 'randomTests'() {
        Disassembler.generateInstructions('66F7D0').should.eql([{
            instruction: 'not',
            operand1: {register: 'ax'},
            position: 0,
        }]);
        Disassembler.generateInstructions('F7D0').should.eql([{
            instruction: 'not',
            operand1: {register: 'eax'},
            position: 0,
        }]);
        Disassembler.generateInstructions('6766F717').should.eql([{
            instruction: 'not',
            operand1: {register: 'bx', pointer: 'w'},
            position: 0,
        }]);
        Disassembler.generateInstructions('F79011110000').should.eql([{
            instruction: 'not',
            operand1: {register: 'eax', pointer: 'd', displacement: '1111'},
            position: 0,
        }]);
        Disassembler.generateInstructions('F71511110000 ').should.eql([{
            instruction: 'not',
            operand1: {displacement: '1111', pointer: 'd'},
            position: 0,
        }]);
    }
}
