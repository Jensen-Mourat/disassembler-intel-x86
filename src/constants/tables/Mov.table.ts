import {HashMap} from '../../helper/hashMap';
import {OpCode, Operation} from './index';

export const MOV_TABLE = new HashMap<OpCode, Operation>()
    .set({opcode: '88'}, {operation: 'mov', op1: 'm8', op2: 'r8', isRegisterIncluded: true})
    .set({opcode: '89'}, {operation: 'mov', op1: 'm32', op2: 'r32', has16Bit: true})
    .set({opcode: '8A'}, {operation: 'mov', length: 'd', op1: 'm8', op2: 'imm8'})
    .set({opcode: '81'}, {operation: 'mov', length: 'd', op1: 'm32', op2: 'imm32', has16Bit: true})
    .set({opcode: '83'}, {operation: 'mov', length: 'b', op1: 'm32', op2: 'imm8', isSignExtended: true})
    .set({opcode: '00'}, {operation: 'mov', op1: 'm8', op2: 'r8'})
    .set({opcode: '01'}, {operation: 'mov', op1: 'm32', op2: 'r32', has16Bit: true})
    .set({opcode: '02'}, {operation: 'mov', op1: 'r8', op2: 'm8'})
    .set({opcode: '03'}, {operation: 'mov', op1: 'r32', op2: 'm32', has16Bit: true});
Opcode Instruction Op/
En
64-Bit
Mode
Compat/
Leg Mode
Description
88 /r MOV r/m8,r8 MR Valid Valid Move r8 to r/m8.
    REX + 88 /r MOV r/m8***,r8*** MR Valid N.E. Move r8 to r/m8.
89 /r MOV r/m16,r16 MR Valid Valid Move r16 to r/m16.
89 /r MOV r/m32,r32 MR Valid Valid Move r32 to r/m32.
    REX.W + 89 /r MOV r/m64,r64 MR Valid N.E. Move r64 to r/m64.
8A /r MOV r8,r/m8 RM Valid Valid Move r/m8 to r8.
    REX + 8A /r MOV r8***,r/m8*** RM Valid N.E. Move r/m8 to r8.
8B /r MOV r16,r/m16 RM Valid Valid Move r/m16 to r16.
8B /r MOV r32,r/m32 RM Valid Valid Move r/m32 to r32.
    REX.W + 8B /r MOV r64,r/m64 RM Valid N.E. Move r/m64 to r64.
8C /r MOV r/m16,Sreg** MR Valid Valid Move segment register to r/m16.
    REX.W + 8C /r MOV r/m64,Sreg** MR Valid Valid Move zero extended 16-bit segment register
to r/m64.
8E /r MOV Sreg,r/m16** RM Valid Valid Move r/m16 to segment register.
    REX.W + 8E /r MOV Sreg,r/m64** RM Valid Valid Move lower 16 bits of r/m64 to segment
register.
    A0 MOV AL,moffs8* FD Valid Valid Move byte at (seg:offset) to AL.
    REX.W + A0 MOV AL,moffs8* FD Valid N.E. Move byte at (offset) to AL.
    A1 MOV AX,moffs16* FD Valid Valid Move word at (seg:offset) to AX.
    A1 MOV EAX,moffs32* FD Valid Valid Move doubleword at (seg:offset) to EAX.
    REX.W + A1 MOV RAX,moffs64* FD Valid N.E. Move quadword at (offset) to RAX.
    A2 MOV moffs8,AL TD Valid Valid Move AL to (seg:offset).
REX.W + A2 MOV moffs8***,AL TD Valid N.E. Move AL to (offset).
    A3 MOV moffs16*,AX TD Valid Valid Move AX to (seg:offset).
A3 MOV moffs32*,EAX TD Valid Valid Move EAX to (seg:offset).
REX.W + A3 MOV moffs64*,RAX TD Valid N.E. Move RAX to (offset).
    B0+ rb ib MOV r8, imm8 OI Valid Valid Move imm8 to r8.
    REX + B0+ rb ib MOV r8***, imm8 OI Valid N.E. Move imm8 to r8.
    B8+ rw iw MOV r16, imm16 OI Valid Valid Move imm16 to r16.
    B8+ rd id MOV r32, imm32 OI Valid Valid Move imm32 to r32.
    REX.W + B8+ rd io MOV r64, imm64 OI Valid N.E. Move imm64 to r64.
    C6 /0 ib MOV r/m8, imm8 MI Valid Valid Move imm8 to r/m8.
    REX + C6 /0 ib MOV r/m8***, imm8 MI Valid N.E. Move imm8 to r/m8.
    C7 /0 iw MOV r/m16, imm16 MI Valid Valid Move imm16 to r/m16.
    C7 /0 id MOV r/m32, imm32 MI Valid Valid Move imm32 to r/m32.
    REX.W + C7 /0 id MOV r/m64, imm32 MI Valid N.E. Move imm32 sign extended to 64-bits to
r/m64.
