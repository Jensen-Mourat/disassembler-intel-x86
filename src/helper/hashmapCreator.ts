import {Operation} from '../constants/tables';

export const hashMapCreator = (name: string, code: Code[]) => {
    code.forEach(c => {
        const {opcode, operation} = c;
        console.log('.set({opcode:${opcode},{op1: ${operation.op1}, op2:${operation.op2}, length: ${operation.length}, isRegisterIncluded: ${operation.isRegisterIncluded}, has16Bit: ${operation.has16Bit}, isSignExtended: ${operation.isSignExtended})`)
    })
}

export interface Code {
    opcode: string;
    operation: Operation;
}
