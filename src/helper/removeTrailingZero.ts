export const removeTrailingZero = (s: string) => {
  let result = s;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '0') {
      const nextCharacter = i + 1;
      result = nextCharacter < s.length ? s.substr(i + 1) : '';
    } else {
      return result;
    }
  }
  return '0';
};
