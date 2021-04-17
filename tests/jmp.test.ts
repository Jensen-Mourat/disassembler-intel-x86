import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {Disassembler} from '../index';
import {Instruction} from '../src/disasm';

_chai.should();

@suite
class jmpTest {

    before() {

    }

    @test 'jmp test'() {
        Disassembler.generateInstructions('83C00683C00683C0060F85F4FFFFFF').should.equal({
            instruction: 'jmp',
            operand1: {value: '0'},
            position: 0,
        });
    }
}
