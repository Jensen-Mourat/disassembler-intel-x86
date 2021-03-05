import { Table } from '32bit-adressing-table-modrm';
import { ALL_TABLES, MOD_RM_SET, modRmTypes, operandTypes, Operation } from './constants/tables';
import { isNotANumber } from './helper/isNotANumber';
import { ALL_REGISTERS } from './constants/sets/register.set';
import '../utils/string.extensions';
import { rotate } from './helper/rotate';
import { removeTrailingZero } from './helper/removeTrailingZero';
import { removeFalsy } from '../utils/object.extensions';
import { typeTable } from './constants/tables/Types.table';
import { register } from 'ts-node';

interface OpCode {
  instruction: string;
  codes: Code[];
}

interface Code {
  value: string;
  length?: length;
}

interface OptionsInterface {
  is16Bit?: boolean;
  isAddress?: boolean;
  isSignExtended?: boolean;
}

interface IOperand {
  operand1?: operand;
  operand2?: operand;
  pointer?: pointerType;
}

type length = 'b' | 'w' | 'd';

export class _Disassembler {
  private prefixMap = new Map<string, prefixModes>().set('66', 'registerMode').set('67', 'addressMode');
  private opCodeTable = ALL_TABLES;

  private *byteIterator(s: string): IterableIterator<{ byte: string; position: number }> {
    for (let i = 0; i < s.length; i += 2) {
      yield { byte: s[i] + s[i + 1], position: i === 0 ? 0 : i / 2 };
    }
  }

  generateInstructions(code: string): Instruction[] {
    code = code.toUpperCase().trim();
    const result: Instruction[] = [];
    const iterator = this.byteIterator(code);
    const next = () => iterator.next().value.byte;
    while (true) {
      const currentByte = iterator.next();
      if (currentByte.done) {
        return result;
      }
      const position = currentByte.value.position;
      let instruction = this.getInstruction(currentByte.value.byte, next);
      instruction = removeFalsy({
        ...instruction,
        operand1: removeFalsy(instruction.operand1),
        operand2: removeFalsy(instruction.operand2),
      });
      result.push({ ...instruction, position });
    }
  }

  private getInstruction(currentByte: string, next: () => string): Instruction {
    let is16Bit = false;
    let isAddress = false;
    const prefix1 = this.fetchPrefix(currentByte);
    let prefix2;
    if (prefix1) {
      // deal with prefixes
      currentByte = next();
      switch (prefix1) {
        case 'addressMode':
          isAddress = true;
          break;
        case 'registerMode':
          is16Bit = true;
      }
      prefix2 = this.fetchPrefix(currentByte);
      if (prefix2) {
        currentByte = next();
        switch (prefix2) {
          case 'addressMode':
            isAddress = true;
            break;
          case 'registerMode':
            is16Bit = true;
        }
      }
    }
    let operation: Operation | undefined;
    let tableResult: [string[], string[]] | undefined;
    if (MOD_RM_SET.has(currentByte)) {
      const nextByte = next();
      tableResult = Table.getReverseValueFromTable(nextByte, isAddress ? '16rm' : '32rm');
      if (tableResult) {
        const modRm = tableResult[1].filter((s) => !isNotANumber(s))[0] as modRmTypes;
        operation = this.opCodeTable.get({ opcode: currentByte, modRm });
      }
    } else {
      operation = this.opCodeTable.get({ opcode: currentByte });
      if (!operation?.op1) {
        // if instruction does not have any operand
        if (operation?.const) {
          //eg int 03
          return { instruction: operation.operation, operand1: { value: operation.const } };
        }
        return { instruction: operation!.operation };
      }
      let registerCode = 0;
      if (!operation) {
        // op might contain a register code
        for (let i = 1; i <= 7; i++) {
          const substracted = (parseInt(currentByte, 16) - i).toString(16).toUpperCase();
          operation = this.opCodeTable.get({ opcode: substracted });
          if (operation) {
            registerCode = i;
            break;
          }
        }
      }
      if (!operation) {
        operation = this.opCodeTable.get({ opcode: currentByte + next() });
      }
      if (operation?.type) {
        const type = is16Bit ? 'rw' : operation.type;
        const reg = typeTable.get(type)?.get(registerCode)!;
        switch (type) {
          case 'rb':
            tableResult = [[], [reg]];
            break;
          case 'rw':
            tableResult = [[], ['', reg]];
            break;
          case 'rd':
            tableResult = [[], ['', '', reg]];
            break;
        }
      } else {
        if (!operation?.isRegisterIncluded && operation?.op2) {
          const nextByte = next();
          tableResult = Table.getReverseValueFromTable(nextByte, isAddress ? '16rm' : '32rm');
        }
      }
    }
    if (!operation) {
      throw Error('invalid code');
    }
    const operands = this.processOperand(operation.op1!, operation.op2!, next, tableResult, {
      is16Bit,
      isAddress,
      isSignExtended: operation.isSignExtended,
    });
    return { instruction: operation.operation, ...operands };
  }

  private fetchPrefix(b: string) {
    return this.prefixMap.get(b);
  }

  private checkRegister(
    op1: string,
    op2: string,
    options?: OptionsInterface,
  ): [string | undefined, string | undefined] {
    const isRegister = (op: string): string | undefined => {
      if (ALL_REGISTERS.has(op)) {
        if (options?.is16Bit) {
          // convert eax to ax
          return op.replace('e', '');
        }
        return op;
      }
      return undefined;
    };
    return [isRegister(op1), isRegister(op2)];
  }

  private processOperand(
    op1: operandTypes,
    op2: operandTypes,
    next: Function,
    tableResult?: [string[], string[]],
    options?: OptionsInterface,
  ): IOperand {
    let operand1;
    let operand2;
    //check register
    [operand1, operand2] = this.checkRegister(op1, op2, options);
    if (operand1 || operand2) {
      if (operand1) {
        // e.g 04
        if (!op2) {
          return { operand1: { register: operand1 } };
        }
        if (op2 === 'imm8') {
          operand2 = next();
          return { operand1: { register: operand1 }, operand2: { value: operand2 } };
        }
        if (op2 === 'imm32') {
          operand2 = next() + next();
          if (!options?.is16Bit) {
            // if 32 bit
            operand2 = operand2 + next() + next();
          }
          operand2 = removeTrailingZero(rotate(operand2));
          return { operand1: { register: operand1 }, operand2: { value: operand2 } };
        }
        if (op2.includes('r')) {
          operand2 = tableResult![1][options?.is16Bit ? 1 : 2];
          return { operand1: { register: operand1 }, operand2: { register: operand2 } };
        }
      }
      if (operand2) {
        // e.g 04
        if (op1 === 'imm8') {
          operand1 = next();
          return { operand1: { register: operand1 }, operand2: { value: operand2 } };
        }
        if (op1 === 'imm32') {
          operand1 = next() + next();
          if (!options?.is16Bit) {
            // if 32 bit
            operand1 = operand1 + next() + next();
          }
          return { operand1: { register: operand1 }, operand2: { value: rotate(operand1) } };
        }
      }
      return { operand1: { register: operand1 }, operand2: { register: operand2 } };
    }
    if (op1 === 'm8') {
      operand1 = tableResult![0][0];
      let operandObj: operand;
      const isMemory = operand1.includes('[');
      let secondRegister;
      if (operand1.includes('disp')) {
        const disp = this.processDisp(operand1, next, options);
        operandObj = { ...disp?.operand, pointer: 'b' };
      } else {
        if (operand1.includes('[sib]')) {
          operandObj = this.processSIB(next, options)!;
          operandObj.pointer = 'b';
        } else {
          if (isMemory) {
            if (operand1.includes('+')) {
              [operand1, secondRegister] = operand1.removeBrackets().split('+');
              operandObj = { register: operand1, register2: secondRegister, pointer: 'b' };
            } else {
              operand1 = operand1.removeBrackets();
              operandObj = { register: operand1, pointer: 'b' };
            }
          }
        }
      }
      if (!op2) {
        return { operand1: operandObj! };
      }
      if (op2.includes('imm')) {
        const operand2 = this.processImm(op2, next, options)!;
        return {
          operand1: operandObj! ?? {
            register: operand1.removeBrackets(),
            pointer: isMemory ? 'b' : undefined,
          },
          operand2: { ...operand2 },
        };
      }
      if (op2 === 'r8') {
        operand2 = tableResult![1][0];
        return {
          operand1: operandObj! ?? {
            register: operand1.removeBrackets(),
            pointer: isMemory ? 'b' : undefined,
          },
          operand2: { register: operand2 },
        };
      }
    }
    if (op1 === 'm32') {
      let opObj: IOperand;
      const tableResultForOp1 = tableResult![0][0];
      if (tableResultForOp1.includes('disp')) {
        const disp = this.processDisp(tableResultForOp1, next, options);
        opObj = { operand1: { ...disp?.operand, pointer: options?.is16Bit ? 'w' : 'd' } };
      } else {
        if (tableResultForOp1.includes('[sib]')) {
          //check sib
          const sib = this.processSIB(next, options)!;
          opObj = { operand1: { ...sib, pointer: options?.is16Bit ? 'w' : 'd' } };
        } else {
          if (tableResultForOp1.includes('[')) {
            // if op1 is memory address
            if (tableResultForOp1.includes('+')) {
              const temp = tableResultForOp1.removeBrackets().split('+');
              opObj = {
                operand1: {
                  register: temp[0],
                  register2: temp[1],
                  pointer: options?.is16Bit ? 'w' : 'd',
                },
              };
            } else {
              operand1 = tableResult![0][0].removeBrackets();
              opObj = { operand1: { register: operand1, pointer: options?.is16Bit ? 'w' : 'd' } };
            }
          } else {
            operand1 = tableResult![0][options?.is16Bit ? 1 : 2];
            opObj = { operand1: { register: operand1 } };
          }
        }
      }
      if (!op2) {
        return opObj;
      }
      if (op2 === 'r32') {
        operand2 = tableResult![1][options?.is16Bit ? 1 : 2];
        return {
          operand1: opObj.operand1,
          operand2: { register: operand2 },
        };
      }
      if (op2.includes('imm')) {
        operand2 = this.processImm(op2, next, options)!;
        return {
          operand1: opObj.operand1,
          operand2,
        };
      }
    }
    if (op1.includes('r')) {
      //register and displacement
      if (op1 === 'r8') {
        operand1 = tableResult![1][0];
        if (!op2) {
          return { operand1: { register: operand1 } };
        }
        if (op2 === 'm8') {
          const result = tableResult![0][0];
          if (options?.isAddress) {
            return this.processAddressMode(operand1, result, next, 'b');
          }
          if (result.includes('disp')) {
            const operand2 = this.processDisp(result, next, options);
            return {
              operand1: { register: operand1 },
              operand2: { ...operand2?.operand, pointer: 'b' },
            };
          }
          if (result === '[sib]') {
            const sib = this.processSIB(next, options)!;
            return {
              operand1: { register: operand1 },
              operand2: {
                register: sib.register,
                constant: sib.constant ? sib.constant : '1',
                register2: sib.register2,
                displacement: sib.displacement,
                pointer: 'b',
              },
            };
          }
        }
      }
      if (op1 === 'r32') {
        operand1 = tableResult![1][options?.is16Bit ? 1 : 2];
        if (op2.includes('imm')) {
          operand2 = this.processImm(op2, next, options)!;
          return {
            operand1: { register: operand1 },
            operand2,
          };
        }
        if (op2.includes('m')) {
          const result = tableResult![0].length > 1 ? tableResult![0][options?.is16Bit ? 1 : 2] : tableResult![0][0];
          if (options?.isAddress) {
            return this.processAddressMode(operand1, result, next, options.is16Bit ? 'w' : 'd');
          }
          if (result.includes('disp')) {
            const operand2 = this.processDisp(result, next, options);
            return {
              operand1: { register: operand1 },
              operand2: {
                ...operand2?.operand,
                pointer: op2 === 'm32' ? (options?.is16Bit ? 'w' : 'd') : 'b',
              },
            };
          }
          if (result === '[sib]') {
            const sib = this.processSIB(next, options)!;
            return {
              operand1: { register: operand1 },
              operand2: {
                register: sib.register,
                constant: sib.constant ? sib.constant : '1',
                register2: sib.register2,
                displacement: sib.displacement,
                pointer: options?.is16Bit ? 'w' : 'd',
              },
            };
          }
          operand2 = this.processM(result, op2, next, options);
          return {
            operand1: { register: operand1 },
            operand2,
          };
        }
      }
    }
    if (op1.includes('imm')) {
      if (op1 === 'imm32') {
        return { operand1: { value: this.nextByteXtimes(next, 4) } };
      }
      if (options?.is16Bit) {
        return { operand1: { value: this.nextByteXtimes(next, 2) } };
      }
      return { operand1: { value: this.nextByteXtimes(next) } };
    }
    return { operand1: { register: operand1 } };
  }

  private nextByteXtimes(next: Function, x?: number) {
    let result = '';
    const _x = x ?? 1;
    for (let i = 0; i < _x; i++) {
      result += next();
    }
    return rotate(result);
  }

  private processM(op: string, opType: string, next: Function, options?: OptionsInterface): operand {
    if (op.includes('[')) {
      return { register: op.removeBrackets(), pointer: opType === 'm32' ? (options?.is16Bit ? 'w' : 'd') : 'b' };
    }
    return { register: op };
  }

  private getPointer(s: string) {
    switch (s.length) {
      case 2:
        return 'b';
      case 4:
        return 'w';
      case 8:
        return 'd';
      default:
        throw new Error('byte pointer error');
    }
  }

  private processAddressMode(op1: string, op2: string, next: Function, type: pointerType) {
    const tableResult = op2.removeBrackets().split('+');
    if (tableResult[2]?.includes('disp')) {
      // e.g bx+si+disp
      const disp = tableResult[2];
      let displacement = next();
      if (disp.includes('16')) {
        displacement = displacement + next();
      }
      return {
        operand1: { register: op1 },
        operand2: { register: tableResult[0], register2: tableResult[1], displacement, pointer: type },
      };
    }
    if (tableResult[1]?.includes('disp')) {
      // e.g bx+disp
      const disp = tableResult[1];
      let displacement = next();
      if (disp.includes('16')) {
        displacement = displacement + next();
      }
      return {
        operand1: { register: op1 },
        operand2: { register: tableResult[0], displacement, pointer: type },
      };
    }
    return {
      operand1: { register: op1 },
      operand2: {
        register: tableResult[0],
        register2: tableResult[1] ? tableResult[1] : undefined,
        pointer: type,
      },
    };
  }

  private processSIB(
    next: Function,
    options?: OptionsInterface,
  ): { displacement?: string; register?: string; register2?: string; constant?: string } | undefined {
    const n = next();
    const sib = Table.getReverseValueFromTable(n, '32sib');
    const [register, constant] = sib[0][0].removeBrackets('[').split('*');
    let displacement;
    let register2;
    if (sib[1][0] !== '[*]') {
      register2 = sib[1][0];
    } else {
      displacement = removeTrailingZero(rotate(next() + next() + next() + next()));
    }
    const result = {
      displacement,
      register: register2 ?? register,
      register2: register2 ? register : undefined,
      constant,
    };
    return result;
  }

  private processDisp(
    op: string,
    next: Function,
    options?: OptionsInterface,
  ): { operand: { displacement?: string; register?: string; register2?: string; constant?: string } } | undefined {
    let displacement;
    let result;

    if (op === 'disp32') {
      displacement = removeTrailingZero(rotate(next() + next() + next() + next()));
      return { operand: { displacement } };
    }
    if (op.includes('disp')) {
      if (op.includes('sib')) {
        result = this.processSIB(next, options);
      }
      if (op.includes('disp32')) {
        displacement = removeTrailingZero(rotate(next() + next() + next() + next()));
      } else if (op.includes('disp16')) {
        // disp16
        displacement = removeTrailingZero(rotate(next() + next()));
      } else {
        // disp8
        displacement = removeTrailingZero(rotate(next()));
      }
      if (result) {
        return { operand: { ...result, displacement } };
      }
    }
    const split = op.removeBrackets().split('+');
    if (split.length > 2) {
      //[bx+si]+disp
      const [register, register2] = split;
      return { operand: { register, register2, displacement } };
    } else {
      // eg [eax + disp32]
      const [register] = split;
      return { operand: { register, displacement } };
    }
  }

  private processImm(op2: string, next: Function, options?: OptionsInterface): operand | undefined {
    switch (op2) {
      case 'imm8':
        let nextByte = next();
        if (options?.isSignExtended && this.isNegative(nextByte)) {
          nextByte = 'FF' + nextByte;
          if (!options.is16Bit) {
            nextByte = 'FFFF' + nextByte;
          }
        }
        return { value: nextByte };
      case 'imm32':
        const operand2 = removeTrailingZero(rotate(next() + next() + (!options?.is16Bit ? next() + next() : '')));
        return { value: operand2 };
    }
  }

  private isNegative(s: string) {
    return parseInt(s, 16) > 127;
  }
}

// export class _Disassembler {
//   private _prefixMap = new Map<string, prefixModes>().set('66', 'registerMode').set('67', 'addressMode');
//   private modRmSet = new Set(['80', '81', '83']);
//   private _opCodeMap = new Map<string, { instruction: string; length?: length }>();
//
//   constructor() {
//     this.generateOpCodeMap([this.createOpCode('add', ['80/0', 'b', '81/0', 'd', '83/0', 'b'])]);
//   }
//
//   private *byteIterator(s: string): IterableIterator<string> {
//     for (let i = 0; i < s.length; i += 2) {
//       yield s[i] + s[i + 1];
//     }
//   }
//
//   disassemble(opCodes: string) {
//     const iterator = this.byteIterator(opCodes);
//     let currentByte = iterator.next().value;
//     const prefix = this.fetchPrefix(currentByte);
//     if (prefix) {
//       currentByte = iterator.next().value;
//     }
//     let modRmByte;
//     let possibleRegisters: string[] = [];
//     if (this.modRmSet.has(currentByte)) {
//       const nextByte = iterator.next().value;
//       const searchResult = Table.getReverseValueFromTable(nextByte);
//       modRmByte = searchResult[1].pop();
//       possibleRegisters = searchResult[0];
//     }
//     const op = this._opCodeMap.get(modRmByte ? currentByte + `/` + modRmByte : currentByte);
//     const instruction = op?.instruction;
//     const operand1 = possibleRegisters.length > 0 ? possibleRegisters[1] : undefined;
//     const operand2 = this.getValueFromLength(iterator, prefix ? 'w' : op?.length);
//     return instruction + ' ' + operand1 + ' ' + operand2;
//   }
//
//   private getValueFromLength(it: IterableIterator<string>, length?: string) {
//     if (length) {
//       switch (length) {
//         case 'b':
//           return it.next().value;
//         case 'd':
//           return it.next().value + it.next().value + it.next().value + it.next().value;
//         case 'w':
//           return it.next().value + it.next().value;
//       }
//     }
//     return '';
//   }
//
//   fetchPrefix(pref: string): prefixModes | undefined {
//     return this._prefixMap.get(pref);
//   }
//
//   private generateOpCodeMap(codes: OpCode[]) {
//     codes.forEach((c) => {
//       c.codes.forEach((c1) => {
//         this._opCodeMap.set(c1.value, { instruction: c.instruction, length: c1.length });
//       });
//     });
//   }
//
//   private createOpCode(ins: string, codeAndLength: string[]): OpCode {
//     const codes = [];
//     for (let i = 0; i < codeAndLength.length; i += 2) {
//       const code = codeAndLength[i];
//       const length = codeAndLength[i + 1];
//       codes.push({ value: code, length: length !== '' ? length : undefined });
//     }
//     return { instruction: ins, codes: (codes as unknown) as Code[] };
//   }
// }

type prefixModes = 'registerMode' | 'addressMode';
export type pointerType = 'b' | 'd' | 'w';

interface operand {
  value?: string;
  register?: string;
  register2?: string;
  displacement?: string;
  constant?: string;
  pointer?: pointerType;
}

export interface Instruction {
  instruction: string;
  operand1?: operand;
  operand2?: operand;
  position?: number;
}
