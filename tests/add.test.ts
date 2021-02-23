import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {Disassembler} from '../index';
import {mergeSets} from '../src/helper/mergeSets';
import {Instruction} from '../src/disasm';

_chai.should();

@suite
class addTest {

    before() {

    }

    @test 'r8 and r8'() {
        Disassembler.generateInstructions('00D8').should.eql([{
            instruction: 'add',
            operand1: 'al',
            operand2: 'bl',
            position: 0,
        }]);
        Disassembler.generateInstructions('00C8').should.eql([{
            instruction: 'add',
            operand1: 'al',
            operand2: 'cl',
            position: 0
        }]);
    }

    @test 'r8 and imm8'() {
        Disassembler.generateInstructions('0411').should.eql([{
            instruction: 'add',
            operand1: 'al',
            operand2: '11',
            position: 0,
        }]);
        Disassembler.generateInstructions('04FF').should.eql([{
            instruction: 'add',
            operand1: 'al',
            operand2: 'FF',
            position: 0
        }]);
        Disassembler.generateInstructions('80C311').should.eql([{
            instruction: 'add',
            operand1: 'bl',
            operand2: '11',
            position: 0
        }]);
    }

    @test 'r8 and disp'() {
        Disassembler.generateInstructions('020511000000').should.eql([{
            instruction: 'add',
            operand1: 'al',
            operand2: '11',
            position: 0,
            pointer: 'b'
        } as Instruction]);
        Disassembler.generateInstructions('0205FF000000').should.eql([{
            instruction: 'add',
            operand1: 'al',
            operand2: 'FF',
            position: 0,
            pointer: 'b'
        }as Instruction]);
        Disassembler.generateInstructions('021D11000000 ').should.eql([{
            instruction: 'add',
            operand1: 'bl',
            operand2: '11',
            pointer: 'b',
            position: 0
        }as Instruction]);
    }
}
