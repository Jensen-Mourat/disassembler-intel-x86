export const mergeMap = <K, V>(...iterables: Map<K, V>[]): Map<K, V> => {
  const map = new Map<K, V>();
  iterables.forEach((iterable) => {
    iterable.forEach((v, k) => {
      map.set(k, v);
    });
  });
  return map;
};
