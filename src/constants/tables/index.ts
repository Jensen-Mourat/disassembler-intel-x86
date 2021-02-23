import {ADD_TABLE} from './Add.table';
import {HashMap} from '../../helper/hashMap';

export interface Operation {
    operation: operation;
    length?: lengthTypes;
    op1?: operandTypes;
    op2?: operandTypes;
    has16Bit?: boolean;
    isOneByte?: boolean;
    isSignExtended?: boolean;
}

type operation = 'add';
export type modRmTypes = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | 'r';
type lengthTypes = 'b' | 'w' | 'd';

const getAllTables = (): HashMap<OpCode, Operation> => {
    const tables = [ADD_TABLE];
    return new HashMap<OpCode, Operation>().concat(...tables);
};

export const ALL_TABLES = getAllTables();

const getModRMset = (): Set<string> => {
    const s = new Set<string>();
    ALL_TABLES.forEach((k) => {
        if (k.modRm) {
            s.add(k.opcode);
        }
    });
    return s;
};

export const MOD_RM_SET = getModRMset();


export interface OpCode {
    opcode: string;
    modRm?: modRmTypes;
}

export type operandTypes = 'r32'
    | 'm32'
    | 'r16'
    | 'm16'
    | 'r8'
    | 'm8'
    | 'mr32'
    | 'mr16'
    | 'mr8'
    | 'imm8'
    | 'imm16'
    | 'imm32'
    | 'eax'
    | 'ebx'
    | 'ecx'
    | 'edx'
    | 'esp'
    | 'ebp'
    | 'esi'
    | 'edi'
    | 'ax'
    | 'bx'
    | 'cx'
    | 'dx'
    | 'sp'
    | 'bp'
    | 'si'
    | 'di'
    | 'al'
    | 'bl'
    | 'cl'
    | 'dl'
    | 'ah'
    | 'bh'
    | 'ch'
    | 'dh'
