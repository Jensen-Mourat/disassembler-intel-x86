import { mergeMap } from './mergeMap';

interface IHashMap<T, U> {
  set(key: T, val: U): IHashMap<T, U>;

  get(key: T): U | undefined;

  internalMap(): Map<string, U>;

  concat(...maps: HashMap<T, U>[]): HashMap<T, U>;

  forEach(fn: (key: T, value: U) => void): void;
}

// A map which allows object keys
export class HashMap<T, U> implements IHashMap<T, U> {
  private map = new Map<string, U>();

  constructor() {
    return this;
  }

  set(key: T, val: U): this {
    const _key = JSON.stringify(key);
    this.map.set(_key, val);
    return this;
  }

  get(key: T): U | undefined {
    const _key = JSON.stringify(key);
    return this.map.get(_key);
  }

  internalMap(): Map<string, U> {
    return this.map;
  }

  concat(...maps: HashMap<T, U>[]) {
    const mapArr = maps.map((m) => m.internalMap());
    this.map = mergeMap(...mapArr, this.map);
    return this;
  }

  forEach(fn: (key: T, value: U) => void) {
    this.map.forEach((v, k) => {
      const key = JSON.parse(k) as T;
      fn(key, v);
    });
  }
}
