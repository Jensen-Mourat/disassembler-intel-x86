import {Table} from '32bit-adressing-table-modrm';

interface OpCode {
    instruction: string;
    codes: Code[]
}

interface Code {
    value: string;
    length?: length;
}

type length = 'b' | 'w' | 'd';

export class _Disassembler {
    private _prefixMap = new Map<string, prefixModes>().set('66', 'registerMode').set('67', 'addressMode');
    private modRmSet = new Set(['80', '81', '83']);
    private _opCodeMap = new Map<string, { instruction: string, length?: length }>();

    constructor() {
        this.generateOpCodeMap([
            this.createOpCode(
                'add', ['80/0', 'b', '81/0', 'd', '83/0', 'b']
            )
        ]);
    }

    private* byteIterator(s: string): IterableIterator<string> {
        for (let i = 0; i < s.length; i += 2) {
            yield s[i] + s[i + 1];
        }
    }

    disassemble(opCodes: string) {
        const iterator = this.byteIterator(opCodes);
        let currentByte = iterator.next().value;
        const prefix = this.fetchPrefix(currentByte);
        if (prefix) {
            currentByte = iterator.next().value;
        }
        let modRmByte;
        let possibleRegisters: string[] = [];
        if (this.modRmSet.has(currentByte)) {
            const nextByte = iterator.next().value;
            const searchResult = Table.getReverseValueFromTable(nextByte);
            modRmByte = searchResult[1].pop();
            possibleRegisters = searchResult[0];
        }
        const op = this._opCodeMap.get(modRmByte ? currentByte + `/` + modRmByte : currentByte);
        const instruction = op?.instruction;
        const operand1 = possibleRegisters.length > 0 ? possibleRegisters[1] : undefined;
        const operand2 = this.getValueFromLength(iterator, prefix ? 'w' : op?.length);
        return instruction + ' ' + operand1 + ' ' + operand2;
    }

    private getValueFromLength(it: IterableIterator<string>, length?: string) {
        if (length) {
            switch (length) {
                case 'b':
                    return it.next().value;
                case 'd':
                    return it.next().value + it.next().value + it.next().value + it.next().value;
                case 'w':
                    return it.next().value + it.next().value;
            }
        }
        return '';
    }

    fetchPrefix(pref: string): prefixModes | undefined {
        return this._prefixMap.get(pref);
    }

    private generateOpCodeMap(codes: OpCode[]) {
        codes.forEach(c => {
            c.codes.forEach(c1 => {
                this._opCodeMap.set(c1.value, {instruction: c.instruction, length: c1.length});
            });
        });
    }

    private createOpCode(ins: string, codeAndLength: string[]): OpCode {
        const codes = [];
        for (let i = 0; i < codeAndLength.length; i += 2) {
            const code = codeAndLength[i];
            const length = codeAndLength[i + 1];
            codes.push({value: code, length: length !== '' ? length : undefined});
        }
        return {instruction: ins, codes: codes as unknown as Code[]};
    }
}

type prefixModes = 'registerMode' | 'addressMode';
