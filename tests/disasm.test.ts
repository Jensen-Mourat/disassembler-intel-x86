import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {mergeMap, mergeMaps, mergeMapsMany} from '../src/helper/mergeMap';
import {Disassembler} from '../index';
import {MOD_RM_SET, Tabel} from '../src/constants/tables';
import {isNotANumber} from '../src/helper/isNotANumber';
import {mergeSets} from '../src/helper/mergeSets';
import {removeTrailingZero} from '../src/helper/removeTrailingZero';

_chai.should();

@suite
class DisasmTest {

    before() {

    }

    @test 'Testing add'() {
        Disassembler.generateInstructions('8005');
    }

    @test 'isNan'() {
        const s1 = new Set([1]);
        const s2 = new Set([2]);
        const s3 = mergeSets(s1, s2);
        console.log(s3);
    }

    @test 'remove Zero'() {
        console.log(removeTrailingZero('0011'));
        console.log(removeTrailingZero('001100'));
        console.log(removeTrailingZero('00110012'));
        console.log(removeTrailingZero('0000000'));
    }

    @test 'practical example'() {
        const val = Disassembler.generateInstructions('B00066BE27006788046683C601040167880466B908006681E90200678A44FF6702046683C601678804E2F0');
        val.should.eql(JSON.parse("[{\"instruction\":\"mov\",\"operand1\":{\"register\":\"al\"},\"operand2\":{\"value\":\"00\"},\"position\":0},{\"instruction\":\"mov\",\"operand1\":{\"register\":\"si\"},\"operand2\":{\"value\":\"27\"},\"position\":2},{\"instruction\":\"mov\",\"operand1\":{\"register\":\"si\",\"pointer\":\"b\"},\"operand2\":{\"register\":\"al\"},\"position\":6},{\"instruction\":\"add\",\"operand1\":{\"register\":\"si\"},\"operand2\":{\"value\":\"01\"},\"position\":9},{\"instruction\":\"add\",\"operand1\":{\"register\":\"al\"},\"operand2\":{\"value\":\"01\"},\"position\":13},{\"instruction\":\"mov\",\"operand1\":{\"register\":\"si\",\"pointer\":\"b\"},\"operand2\":{\"register\":\"al\"},\"position\":15},{\"instruction\":\"mov\",\"operand1\":{\"register\":\"cx\"},\"operand2\":{\"value\":\"8\"},\"position\":18},{\"instruction\":\"sub\",\"operand1\":{\"register\":\"cx\"},\"operand2\":{\"value\":\"2\"},\"position\":22},{\"instruction\":\"mov\",\"operand1\":{\"register\":\"al\"},\"operand2\":{\"register\":\"si\",\"displacement\":\"FF\",\"pointer\":\"b\"},\"position\":27},{\"instruction\":\"add\",\"operand1\":{\"register\":\"al\"},\"operand2\":{\"register\":\"si\",\"pointer\":\"b\"},\"position\":31},{\"instruction\":\"add\",\"operand1\":{\"register\":\"si\"},\"operand2\":{\"value\":\"01\"},\"position\":34},{\"instruction\":\"mov\",\"operand1\":{\"register\":\"si\",\"pointer\":\"b\"},\"operand2\":{\"register\":\"al\"},\"position\":38},{\"instruction\":\"loop\",\"operand1\":{\"value\":\"1b\"},\"position\":41}]"));
    }
}
