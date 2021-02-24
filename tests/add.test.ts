import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {Disassembler} from '../index';
import {Instruction} from '../src/disasm';

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
            operand2: {displacement: '11', pointer: 'b'},
            position: 0,

        } as Instruction]);
        Disassembler.generateInstructions('0205FF000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {displacement: 'FF', pointer: 'b'},
            position: 0,

        } as Instruction]);
        Disassembler.generateInstructions('021D11000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'bl'},
            operand2: {displacement: '11', pointer: 'b'},
            position: 0
        } as Instruction]);
    }

    @test 'r8 and r+disp'() {
        Disassembler.generateInstructions('028011110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', displacement: '1111', pointer: 'b'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('0280FF000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', displacement: 'FF', pointer: 'b'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('0299ff000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'bl'},
            operand2: {register: 'ecx', displacement: 'FF', pointer: 'b'},
            position: 0
        } as Instruction]);
        Disassembler.generateInstructions('6702871111').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'bx', displacement: '1111', pointer: 'b'},
            position: 0
        } as Instruction]);
    }

    @test 'r8 and r32*const'() {
        Disassembler.generateInstructions('02040500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '1', displacement: '0', pointer: 'b'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('02044500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '2', displacement: '0', pointer: 'b'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('02048500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '4', displacement: '0', pointer: 'b'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('0204c500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '8', displacement: '0', pointer: 'b'},
            position: 0,
        } as Instruction]);
    }

    @test 'r8 and r8*const+displacement'() {
        Disassembler.generateInstructions('02040511000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '1', displacement: '11', pointer: 'b'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('020445ff000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '2', displacement: 'FF', pointer: 'b'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('02048511110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '4', displacement: '1111', pointer: 'b'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('0204c5ffff0000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '8', displacement: 'FFFF', pointer: 'b'},
            position: 0,
        } as Instruction]);
    }

    @test 'r8 , r32+r32'() {
        Disassembler.generateInstructions('020400').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', register2: 'eax', constant: '1', pointer: 'b'},
            position: 0,
        } as Instruction]);
    }

    @test 'r8, r16+r16'() {
        Disassembler.generateInstructions('670200').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'bx', register2: 'si', pointer: 'b'},
            position: 0,
        } as Instruction]);
    }

    @test 'r8, r32+r32+disp'() {
        Disassembler.generateInstructions('02840011110000 ').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', register2: 'eax', displacement: '1111', pointer: 'b'},
            position: 0,
        } as Instruction]);
    }

    @test 'r8, r16+r16+disp'() {
        Disassembler.generateInstructions('6702801111').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {
                register: 'bx', register2: 'si', displacement: '1111', pointer: 'b'
            },
            position: 0,
        } as Instruction]);
    }

    @test
    'r8, r32+r32*const+disp'() {
        Disassembler.generateInstructions('02844011110000 ').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', constant: '2', register2: 'eax', displacement: '1111', pointer: 'b'},
            position: 0,

        } as Instruction]);
        Disassembler.generateInstructions('02848011111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {
                register: 'eax', constant: '4', register2: 'eax', displacement: '11111111', pointer: 'b'
            },
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('0284C011111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {
                register: 'eax', constant: '8', register2: 'eax', displacement: '11111111', pointer: 'b'
            },
            position: 0,
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

    @test 'r16 and disp'() {
        Disassembler.generateInstructions('66030511000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {displacement: '11', pointer: 'w'},
            position: 0,

        } as Instruction]);
        Disassembler.generateInstructions('660305ff000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {displacement: 'FF', pointer: 'w'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('66031d11000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx'},
            operand2: {displacement: '11', pointer: 'w'},
            position: 0
        } as Instruction]);
        Disassembler.generateInstructions('66030511110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {displacement: '1111', pointer: 'w'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('660305ffff0000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {displacement: 'FFFF', pointer: 'w'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('66031d11110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx'},
            operand2: {displacement: '1111', pointer: 'w'},
            position: 0
        } as Instruction]);
    }

    @test 'r32 and disp'() {
        Disassembler.generateInstructions('030511111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {displacement: '11111111', pointer: 'd'},
            position: 0,

        } as Instruction]);
        Disassembler.generateInstructions('0305ffffffff').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {displacement: 'FFFFFFFF', pointer: 'd'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('031d11111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'ebx'},
            operand2: {displacement: '11111111', pointer: 'd'},
            position: 0
        } as Instruction]);
    }

    @test 'r16 and r+disp'() {
        Disassembler.generateInstructions('024011').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', displacement: '11', pointer: 'b'},
            position: 0,

        } as Instruction]);
        Disassembler.generateInstructions('0280ff000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'al'},
            operand2: {register: 'eax', displacement: 'FF', pointer: 'b'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('66038011110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'eax', displacement: '1111', pointer: 'w'},

            position: 0
        } as Instruction]);
        Disassembler.generateInstructions('660380ffff0000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'eax', displacement: 'FFFF', pointer: 'w'},

            position: 0
        } as Instruction]);
        Disassembler.generateInstructions('676603871111').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'bx', displacement: '1111', pointer: 'w'},

            position: 0
        } as Instruction]);
    }

    @test 'r32 and r+disp'() {
        Disassembler.generateInstructions('038011111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', displacement: '11111111', pointer: 'd'},
            position: 0
        }]);
        Disassembler.generateInstructions('6703871111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'bx', displacement: '1111', pointer: 'd'},
            position: 0
        } as Instruction]);
    }

    @test 'r16 and r32*const'() {
        Disassembler.generateInstructions('6603040500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'eax', constant: '1', displacement: '0', pointer: 'w'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('6603044500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'eax', constant: '2', displacement: '0', pointer: 'w'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('6603048500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'eax', constant: '4', displacement: '0', pointer: 'w'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('660304c500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'eax', constant: '8', displacement: '0', pointer: 'w'},
            position: 0,
        } as Instruction]);
    }

    @test 'r32 and r32*const'() {
        Disassembler.generateInstructions('03040500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '1', displacement: '0', pointer: 'd'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('03044500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '2', displacement: '0', pointer: 'd'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('03048500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '4', displacement: '0', pointer: 'd'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('0304C500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '8', displacement: '0', pointer: 'd'},
            position: 0,
        } as Instruction]);
    }

    @test 'r32 and r32*const+displacement'() {
        Disassembler.generateInstructions('03040511000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '1', displacement: '11', pointer: 'd'},
            position: 0,

        } as Instruction]);
        Disassembler.generateInstructions('030445ff000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '2', displacement: 'FF', pointer: 'd'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('03048511110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '4', displacement: '1111', pointer: 'd'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('0304c5ffff0000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '8', displacement: 'FFFF', pointer: 'd'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('03040511111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '1', displacement: '11111111', pointer: 'd'},
            position: 0,
        } as Instruction]);
    }

    @test 'r16 , r32+r32'() {
        Disassembler.generateInstructions('66030400').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'eax', register2: 'eax', constant: '1', pointer: 'w'},
            position: 0,
        } as Instruction]);
    }

    @test 'r16 , r16+r16'() {
        Disassembler.generateInstructions('67660300').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'bx', register2: 'si', pointer: 'w'},
            position: 0,

        } as Instruction]);
    }

    @test 'r32 , r16+r16'() {
        Disassembler.generateInstructions('670300').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'bx', register2: 'si', pointer: 'd'},
            position: 0,

        } as Instruction]);
    }

    @test 'r32 , r32+r32'() {
        Disassembler.generateInstructions('030400').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', register2: 'eax', constant: '1', pointer: 'd'},
            position: 0,

        } as Instruction]);
    }

    @test 'r16, r32+r32+disp'() {
        Disassembler.generateInstructions('6603840011110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'eax', register2: 'eax', displacement: '1111', pointer: 'w'},
            position: 0,

        } as Instruction]);
    }

    @test 'r16, r16+r16+disp'() {
        Disassembler.generateInstructions('676603801111').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'bx', register2: 'si', displacement: '1111', pointer: 'w'},
            position: 0,

        } as Instruction]);
    }

    @test 'r16, r32+r32*const+disp'() {
        Disassembler.generateInstructions('6603844011110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'eax', constant: '2', register2: 'eax', displacement: '1111', pointer: 'w'},
            position: 0,

        } as Instruction]);
        Disassembler.generateInstructions('6603848011110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'eax', constant: '4', register2: 'eax', displacement: '1111', pointer: 'w'},
            position: 0,

        } as Instruction]);
        Disassembler.generateInstructions('660384C011110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ax'},
            operand2: {register: 'eax', constant: '8', register2: 'eax', displacement: '1111', pointer: 'w'},
            position: 0,
        } as Instruction]);
    }

    @test 'r32, r32+r32*const+disp'() {
        Disassembler.generateInstructions('03844011110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '2', register2: 'eax', displacement: '1111', pointer: 'd'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('03848011110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '4', register2: 'eax', displacement: '1111', pointer: 'd'},
            position: 0,

        } as Instruction]);
        Disassembler.generateInstructions('0384C011110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax'},
            operand2: {register: 'eax', constant: '8', register2: 'eax', displacement: '1111', pointer: 'd'},
            position: 0,
        } as Instruction]);
    }

    @test 'm16, r'() {
        Disassembler.generateInstructions('670007').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('67660107').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('670107').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
    }

    @test 'm16, imm'() {
        Disassembler.generateInstructions('67800711').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', pointer: 'b'},
            operand2: {value: '11'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('676681071111').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', pointer: 'w'},
            operand2: {value: '1111'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('67810711111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', pointer: 'd'},
            operand2: {value: '11111111'},
            position: 0,
        } as Instruction]);
    }

    @test 'r16+disp, imm'() {
        Disassembler.generateInstructions('6780471111').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', displacement: '11', pointer: 'b'},
            operand2: {value: '11'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('6766818711111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', displacement: '1111', pointer: 'w'},
            operand2: {value: '1111'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('678187111111111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', displacement: '1111', pointer: 'd'},
            operand2: {value: '11111111'},
            position: 0,
        } as Instruction]);
    }

    @test 'r16+r16+disp, imm'() {
        Disassembler.generateInstructions('6780401111').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', displacement: '11', pointer: 'b'},
            operand2: {value: '11'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('6766818011111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', displacement: '1111', pointer: 'w'},
            operand2: {value: '1111'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('678180111111111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', displacement: '1111', pointer: 'd'},
            operand2: {value: '11111111'},
            position: 0,
        } as Instruction]);
    }

    @test 'r16+r16, imm'() {
        Disassembler.generateInstructions('67800011').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', pointer: 'b'},
            operand2: {value: '11'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions(' 676681001111').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', pointer: 'w'},
            operand2: {value: '1111'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('67810011111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', pointer: 'd'},
            operand2: {value: '11111111'},
            position: 0,
        } as Instruction]);
    }

    @test 'm16+m16, r'() {
        Disassembler.generateInstructions('670000').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('67660100').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('670100').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
    }

    @test 'm32, r'() {
        Disassembler.generateInstructions('0003').should.eql([{
            instruction: 'add',
            operand1: {register: 'ebx', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('660103').should.eql([{
            instruction: 'add',
            operand1: {register: 'ebx', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('0103').should.eql([{
            instruction: 'add',
            operand1: {register: 'ebx', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
    }

    @test 'm32+m32, r'() {
        Disassembler.generateInstructions('000400').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', register2: 'eax', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('66010400').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', register2: 'eax', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('010400').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', register2: 'eax', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
    }

    @test 'disp, r'() {
        Disassembler.generateInstructions('000511000000').should.eql([{
            instruction: 'add',
            operand1: {displacement: '11', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('66010511110000').should.eql([{
            instruction: 'add',
            operand1: {displacement: '1111', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('010511111111').should.eql([{
            instruction: 'add',
            operand1: {displacement: '11111111', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
    }

    @test 'r+disp, r'() {
        Disassembler.generateInstructions('67004711').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', displacement: '11', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('6766014711').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', displacement: '11', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('67014711').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', displacement: '11', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('004311').should.eql([{
            instruction: 'add',
            operand1: {register: 'ebx', displacement: '11', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('66018311110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ebx', displacement: '1111', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('018311111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'ebx', displacement: '11111111', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
    }

    @test 'r+r+disp, r'() {
        Disassembler.generateInstructions('67004011').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', displacement: '11', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('6766014011').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', displacement: '11', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('67014011').should.eql([{
            instruction: 'add',
            operand1: {register: 'bx', register2: 'si', displacement: '11', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('00440311').should.eql([{
            instruction: 'add',
            operand1: {register: 'ebx', register2: 'eax', displacement: '11', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('6601840311110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'ebx', register2: 'eax', displacement: '1111', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('01840311111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'ebx', register2: 'eax', displacement: '11111111', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
    }

    @test 'r*constant, r'() {
        Disassembler.generateInstructions('00040500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', displacement: '0', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('6601044500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', displacement: '0', constant: '2', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('01048500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', displacement: '0', constant: '4', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('0104C500000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', displacement: '0', constant: '8', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
    }

    @test 'r*constant+disp, r'() {
        Disassembler.generateInstructions('00040511000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', displacement: '11', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('6601044511000000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', displacement: '11', constant: '2', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('01048511110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', displacement: '1111', constant: '4', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('0104C511111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', displacement: '11111111', constant: '8', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
    }

    @test 'r+r*constant+disp, r'() {
        Disassembler.generateInstructions('00441811').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', register2: 'ebx', displacement: '11', pointer: 'b'},
            operand2: {register: 'al'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('6601445811').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', register2: 'ebx', displacement: '11', constant: '2', pointer: 'w'},
            operand2: {register: 'ax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('01849811110000').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', register2: 'ebx', displacement: '1111', constant: '4', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('0184D811111111 ').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', register2: 'ebx', displacement: '11111111', constant: '8', pointer: 'd'},
            operand2: {register: 'eax'},
            position: 0,
        } as Instruction]);
    }

    @test 'm32, imm'(){
        Disassembler.generateInstructions('800011').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', pointer: 'b'},
            operand2: {value: '11'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('6681001111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', pointer: 'w'},
            operand2: {value: '1111'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('810011111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', pointer: 'd'},
            operand2: {value: '11111111'},
            position: 0,
        } as Instruction]);
    }

    @test 'm32+disp, imm'(){
        Disassembler.generateInstructions('80401111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax',displacement: '11', pointer: 'b'},
            operand2: {value: '11'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('668180111100001111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax',displacement: '1111', pointer: 'w'},
            operand2: {value: '1111'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('81801111111111111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax',displacement: '11111111', pointer: 'd'},
            operand2: {value: '11111111'},
            position: 0,
        } as Instruction]);
    }

    @test 'm32+m32+disp, imm'(){
        Disassembler.generateInstructions('8044181111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', register2: 'ebx',displacement: '11', pointer: 'b'},
            operand2: {value: '11'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('66818418111100001111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', register2: 'ebx',displacement: '1111', pointer: 'w'},
            operand2: {value: '1111'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('8184181111111111111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', register2: 'ebx',displacement: '11111111', pointer: 'd'},
            operand2: {value: '11111111'},
            position: 0,
        } as Instruction]);
    }

    @test 'm32+m32*const+disp, imm'(){
        Disassembler.generateInstructions('8044181111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', register2: 'ebx',displacement: '11', pointer: 'b'},
            operand2: {value: '11'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('66818458111100001111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', constant: '2', register2: 'ebx',displacement: '1111', pointer: 'w'},
            operand2: {value: '1111'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('8184981111111111111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', constant: '4', register2: 'ebx',displacement: '11111111', pointer: 'd'},
            operand2: {value: '11111111'},
            position: 0,
        } as Instruction]);
        Disassembler.generateInstructions('8184D81111111111111111').should.eql([{
            instruction: 'add',
            operand1: {register: 'eax', constant: '8', register2: 'ebx',displacement: '11111111', pointer: 'd'},
            operand2: {value: '11111111'},
            position: 0,
        } as Instruction]);
    }
}
