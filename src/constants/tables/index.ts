import {ADD_TABLE} from './Add.table';
import {HashMap} from '../../helper/hashMap';
import {MOV_TABLE} from './Mov.table';
import {XCHG_TABLE} from './Xchg.table';
import {NOT_TABLE} from './Not.table';
import {ADC_TABLE} from './Adc.table';
import {DEC_TABLE} from './Dec.table';
import {DIV_TABLE} from './Div.table';
import {IDIV_TABLE} from './Idiv.table';
import {IMUL_TABLE} from './Imul.table';
import {INC_TABLE} from './Inc.table';
import {INT_TABLE} from './Int.table';
import {IRET_TABLE} from './Iret.table';
import {JMP_TABLE} from './Jump.table';
import {LOOP_TABLE} from './loop.table';
import {MUL_TABLE} from './Mul.table';
import {NEG_TABLE} from './Neg.table';
import {OR_TABLE} from './Or.table';
import {RCL_TABLE} from './Rcl';
import {RCR_TABLE} from './Rcr';
import {RET_TABLE} from './Ret.table';
import {ROL_TABLE} from './Rol.table';
import {ROR_TABLE} from './Ror.table';
import {SAL_TABLE} from './Sal.table';
import {SAR_TABLE} from './Sar.table';
import {SBB_TABLE} from './Sbb.table';
import {SHR_TABLE} from './Shr.table';
import {SUB_TABLE} from './Sub.table';
import {TEST_TABLE} from './Test.table';
import {XOR_TABLE} from './Xor.table';
import {AND_TABLE} from './And.table';
import {CMP_TABLE} from './Cmp.table';

export interface Operation {
    operation: operation;
    length?: lengthTypes;
    op1?: operandTypes;
    op2?: operandTypes;
    const?: string;
    type?: 'rb' | 'rd';
    has16Bit?: boolean;
    isRegisterIncluded?: boolean;
    isSignExtended?: boolean;
    isInterchangeable?: boolean;
}

type operation =
    'test'
    | 'xor'
    | 'iret'
    | 'rol'
    | 'ror'
    | 'sal'
    | 'sar'
    | 'sbb'
    | 'shr'
    | 'sub'
    | 'jmp'
    | 'loop'
    | 'imul'
    | 'neg'
    | 'or'
    | 'rcl'
    | 'rcr'
    | 'ret'
    | 'iretd'
    | 'dec'
    | 'idiv'
    | 'div'
    | 'mul'
    | 'inc'
    | 'int'
    | 'cmp'
    | 'add'
    | 'mov'
    | 'xchg'
    | 'not'
    | 'adc'
    | 'and'
    | 'into'
    | 'ja'
    | 'jae'
    | 'jb'
    | 'jbe'
    | 'jc'
    | 'jcx'
    | 'jnb'
    | 'loope'
    | 'loopne'
    | 'je'
    | 'jg'
    | 'jge'
    | 'jl'
    | 'jle'
    | 'jna'
    | 'jnc'
    | 'jne'
    | 'jng'
    | 'jnl'
    | 'jno'
    | 'jnp'
    | 'jns'
    | 'jnz'
    | 'jo'
    | 'jp'
    | 'jpe'
    | 'jpo'
    | 'js'
    | 'jz';
export type modRmTypes = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | 'r';
type lengthTypes = 'b' | 'w' | 'd';

const getAllTables = (): HashMap<OpCode, Operation> => {
    const tables = [AND_TABLE, CMP_TABLE, TEST_TABLE, XOR_TABLE, RET_TABLE, ROL_TABLE, ROR_TABLE, SAL_TABLE, SAR_TABLE, SBB_TABLE, SHR_TABLE, SUB_TABLE, JMP_TABLE, LOOP_TABLE, MUL_TABLE, NEG_TABLE, OR_TABLE, RCL_TABLE, RCR_TABLE, IRET_TABLE, DEC_TABLE, DIV_TABLE, IDIV_TABLE, IMUL_TABLE, INC_TABLE, INT_TABLE, ADD_TABLE, MOV_TABLE, XCHG_TABLE, NOT_TABLE, ADC_TABLE];
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
