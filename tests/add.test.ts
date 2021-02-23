import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {Disassembler} from '../index';
import {mergeSets} from '../src/helper/mergeSets';
import {Instruction} from '../src/disasm';
import {register} from 'ts-node';

_chai.should();

@suite
class addTest {

    before() {

    }

    @test 'r8 and r8'() {
        Disassembler.generateInstructions('00D8').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'bl'},
            position: 0,
        }]);
        Disassembler.generateInstructions('00C8').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'cl'},
            position: 0
        }]);
    }

    @test 'r8 and imm8'() {
        Disassembler.generateInstructions('0411').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {value: '11'},
            position: 0,
        }]);
        Disassembler.generateInstructions('04FF').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {value: 'FF'},
            position: 0
        }]);
        Disassembler.generateInstructions('80C311').should.eql([{
            instruction: 'add',
            operand1: {register: 'bl'},
            operand2: {value: '11'},
            position: 0
        }]);
    }

    @test 'r8 and disp'() {
        Disassembler.generateInstructions('020511000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {displacement: '11'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
        Disassembler.generateInstructions('0205FF000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {displacement: 'FF'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
        Disassembler.generateInstructions('021D11000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'bl'},
            operand2: {displacement: '11'},
            pointer: 'b',
            position: 0
        } as Instruction]);
    }

    @test 'r8 and r+disp'() {
        Disassembler.generateInstructions('028011110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', displacement: '1111'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
        Disassembler.generateInstructions('0280FF000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', displacement: 'FF'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
        Disassembler.generateInstructions('0299ff000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'bl'},
            operand2: {register: 'ecx', displacement: 'FF'},
            pointer: 'b',
            position: 0
        } as Instruction]);
    }

    @test 'r8 and r8*const'() {
        Disassembler.generateInstructions('02040500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '1', displacement: '0'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
        Disassembler.generateInstructions('02044500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '2', displacement: '0'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
        Disassembler.generateInstructions('02048500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '4', displacement: '0'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
        Disassembler.generateInstructions('0204c500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '8', displacement: '0'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
    }

    @test 'r8 and r8*const+displacement'() {
        Disassembler.generateInstructions('02040511000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '1', displacement: '11'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
        Disassembler.generateInstructions('020445ff000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '2', displacement: 'FF'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
        Disassembler.generateInstructions('02048511110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '4', displacement: '1111'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
        Disassembler.generateInstructions('0204c5ffff0000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '8', displacement: 'FFFF'},
            position: 0,
            pointer: 'b'
        } as Instruction]);
    }

    @test 'r16 and r16'() {
        Disassembler.generateInstructions('6601C0').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'ax'},
            position: 0,
        }]);
        Disassembler.generateInstructions('6601cb').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx'},
            operand2: {register: 'cx'},
            position: 0
        }]);
        Disassembler.generateInstructions('6601ee').should.eql([{
            instruction: 'add',
            operand1: {register: 'si'},
            operand2: {register: 'bp'},
            position: 0
        }]);
    }

    @test 'r32 and r32'() {
        Disassembler.generateInstructions('01C0').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax'},
            position: 0,
        }]);
        Disassembler.generateInstructions('01cb').should.eql([{
            instruction: 'add',
            operand1: {register: 'ebx'},
            operand2: {register: 'ecx'},
            position: 0
        }]);
        Disassembler.generateInstructions('01ee').should.eql([{
            instruction: 'add',
            operand1: {register: 'esi'},
            operand2: {register: 'ebp'},
            position: 0
        }]);
    }

    @test 'r16 and imm8'() {
        Disassembler.generateInstructions('6683c011').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {value: '11'},
            position: 0,
        }]);
        Disassembler.generateInstructions('6605ff00').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {value: 'FF'},
            position: 0
        }]);
        Disassembler.generateInstructions('6683c311').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx'},
            operand2: {value: '11'},
            position: 0
        }]);
    }

    @test 'r16 and imm16'() {
        Disassembler.generateInstructions('66051111').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {value: '1111'},
            position: 0,
        }]);
        Disassembler.generateInstructions('6683c0ff').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {value: 'FFFF'},
            position: 0
        }]);
        Disassembler.generateInstructions('6681c31111').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx'},
            operand2: {value: '1111'},
            position: 0
        }]);
    }

    @test 'r32 and imm8'() {
        Disassembler.generateInstructions('83c011').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {value: '11'},
            position: 0,
        }]);
        Disassembler.generateInstructions('05ff000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {value: 'FF'},
            position: 0
        }]);
    }

    @test 'r32 and imm16'() {
        Disassembler.generateInstructions('0511110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {value: '1111'},
            position: 0,
        }]);
        Disassembler.generateInstructions('05ffff0000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {value: 'FFFF'},
            position: 0
        }]);
    }

    @test 'r32 and imm32'() {
        Disassembler.generateInstructions('0511111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {value: '11111111'},
            position: 0,
        }]);
        Disassembler.generateInstructions('83c0ff').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {value: 'FFFFFFFF'},
            position: 0
        }]);
    }
}
