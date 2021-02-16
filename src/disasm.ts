import {Table} from '32bit-adressing-table-modrm';
import {ALL_TABLES, MOD_RM_SET, modRmTypes, operandTypes, Operation} from './constants/tables';
import {isNotANumber} from './helper/isNotANumber';
import {ALL_REGISTERS} from './constants/sets/register.set';
import '../utils/string.extensions';
import {rotate} from './helper/rotate';

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
    isAddress?: boolean
}


type length = 'b' | 'w' | 'd';

export class _Disassembler {
    private prefixMap = new Map<string, prefixModes>().set('66', 'registerMode').set('67', 'addressMode');
    private opCodeTable = ALL_TABLES;

    private* byteIterator(s: string): IterableIterator<{ byte: string, position: number }> {
        for (let i = 0; i < s.length; i += 2) {
            yield {byte: s[i] + s[i + 1], position: i == 0 ? 0 : i / 2};
        }
    }

    generateInstructions(code: string): Instruction[] {
        code = code.toUpperCase();
        const result: Instruction[] = [];
        const iterator = this.byteIterator(code);
        const next = () => iterator.next().value.byte;
        while (true) {
            let currentByte = iterator.next();
            if (currentByte.done) {
                return result;
            }
            const position = currentByte.value.position;
            const instruction = this.generateInstruction(currentByte.value.byte, next);
            result.push({...instruction, position: position});
        }
    }

    private generateInstruction(currentByte: string, next: () => string): Instruction {
        let is16Bit = false;
        let isAddress = false;
        const prefix1 = this.fetchPrefix(currentByte);
        let prefix2;
        if (prefix1) { // deal with prefixes
            currentByte = next();
            switch (prefix1) {
                case 'addressMode':
                    isAddress = true;
                case 'registerMode':
                    is16Bit = true;
            }
            prefix2 = this.fetchPrefix(currentByte);
            if (prefix2) {
                currentByte = next();
                switch (prefix2) {
                    case 'addressMode':
                        isAddress = true;
                    case 'registerMode':
                        is16Bit = true;
                }
            }
        }
        let operation: Operation | undefined;
        let tableResult: [string[], string[]] | undefined;
        if (MOD_RM_SET.has(currentByte)) {
            const nextByte = next();
            tableResult = Table.getReverseValueFromTable(nextByte);
            if (tableResult) {
                const modRm = tableResult[1].filter(s => !isNotANumber(s))[0] as modRmTypes;
                operation = this.opCodeTable.get({opcode: currentByte, modRm});
            }
        } else {
            operation = this.opCodeTable.get({opcode: currentByte});
            if (!operation?.isOneByte) {
                const nextByte = next();
                tableResult = Table.getReverseValueFromTable(nextByte);
            }
        }
        if (!operation) {
            throw Error('invalid code');
        }
        const [op1, op2, pointer] = this.processOperand(operation.op1!, operation.op2!, next, tableResult, {
            is16Bit,
            isAddress
        });
        return {instruction: operation.operation, operand1: op1, operand2: op2, pointer};
    }

    private fetchPrefix(b: string) {
        return this.prefixMap.get(b);
    }


    private checkRegister(op1: string, op2: string, options?: OptionsInterface): [string | undefined, string | undefined] {
        const isRegister = (op: string): string | undefined => {
            if (ALL_REGISTERS.has(op)) {
                if (options?.is16Bit) { // convert eax to ax
                    return op.replace('e', '');
                }
                return op;
            }
            return undefined;
        };
        return [isRegister(op1), isRegister(op2)];
    }

    private i

    private processOperand(op1: operandTypes, op2: operandTypes, next: Function, tableResult?: [string[], string[]], options?: OptionsInterface): [string | undefined, string | undefined, string | undefined] {
        let operand1, operand2;
        //check register
        [operand1, operand2] = this.checkRegister(op1, op2, options);
        if (operand1 || operand2) {

            return [operand1, operand2, undefined];
        }
        if (operand1) { // e.g 04
            if (op2 === 'imm8') {
                operand2 = next();
                return [operand1, operand2, undefined];
            }
            if (op2 === 'imm32') {
                operand2 = next() + next();
                if (!options?.is16Bit) { // if 32 bit
                    operand2 = operand2 + next() + next();
                }
                return [operand1, rotate(operand2), undefined];
            }
        }
        if (operand2) { // e.g 04
            if (op1 === 'imm8') {
                operand1 = next();
                return [operand1, operand2, undefined];
            }
            if (op1 === 'imm32') {
                operand1 = next() + next();
                if (!options?.is16Bit) { // if 32 bit
                    operand1 = operand1 + next() + next();
                }
                return [operand1, rotate(operand1), undefined];
            }
        }
        if (op1 === 'm8') {
            operand1 = tableResult[0][0];
            if (op2.includes('imm')) {
                switch (op2) {
                    case 'imm8':
                        return [operand1, next(), undefined];
                    case 'imm32':
                        return [operand1, rotate(next() + next() + (!options?.is16Bit ? next() + next() : '')), undefined];
                }
            }
            if (op2 === 'r8') {
                operand2 = tableResult[1][0];
                return [operand1, operand2, undefined];
                // check displacement
            }
        }
        //register and register
        if (op1.includes('r')) {
            switch (op1) {
                case 'r8':
            }
            if (op2.includes('r')) {

            }
            if (op2.includes('m')) {

            }

            if (op2.includes('imm')) {

            }
        }
        if (op1.includes('m')) {
            if (op2.includes('r')) {

            }
            if (op2.includes('imm')) {

            }
        }

        if (op1.includes('r')) {

            if (op2.includes('m')) {

            }
            if (op2.includes('r')) {

            }
            if (op2.includes('imm')) {

            }
        }
        if (op1.includes('imm')) {
            if (op2.includes('m')) {

            }
            if (op2.includes('r')) {

            }
        }
        return [undefined, undefined, undefined];
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

export interface Instruction {
    instruction: string;
    operand1?: string;
    operand2?: string;
    position?: number;
    pointer?: 'b' | 'd' | 'w'
}
