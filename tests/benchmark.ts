import * as b from 'benny';
import {mergeMap} from '../src/helper/mergeMap';

const m1 = new Map().set('1', 'a');
const m2 = new Map().set('2', 'b');
const m3 = new Map().set('2', 'b');
const m4 = new Map().set('2', 'b');
b.suite(
    'map merge',

    b.add('m2 ', () => {
        mergeMap(m1, m2, m3, m4);
    }),
    b.cycle(),
    b.complete(),
);
