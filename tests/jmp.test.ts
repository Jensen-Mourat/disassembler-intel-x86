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
        Disassembler.generateInstructions('E9F6FFFFFF').should.equal({
            instruction: 'jmp',
            operand1: {value: '0'},
            position: 0,
        });
    }
}
