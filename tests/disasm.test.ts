import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {mergeMap, mergeMaps, mergeMapsMany} from '../src/helper/mergeMap';
import {Disassembler} from '../index';
import {MOD_RM_SET, Tabel} from '../src/constants/tables';
import {isNotANumber} from '../src/helper/isNotANumber';
import {mergeSets} from '../src/helper/mergeSets';

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
}