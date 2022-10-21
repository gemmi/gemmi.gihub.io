const uniq = (arr) => Array.from(new Set(arr));
const desc = (arr) => arr.sort((a, b) => b - a);
const asc = (arr) => arr.sort((a, b) => a - b);

const randomNumber = (max = 10, min = 0) =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

const randomNumArr = (max = 100, min = 0, len = 100) =>
  Array(len)
    .fill(0)
    .map(() => randomNumber(max, min));

const randomStr = (len = 10, index = 0) =>
  Array(len)
    .fill(null)
    .map(
      (x) =>
        [
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[
            Math.floor(Math.random() * 62)
          ],
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[
            Math.floor(Math.random() * 52)
          ],
          'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)],
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)],
        ][index]
    )
    .join('');

const randomStrWithDuplicateChar = (len = 10, k, index = 2) => {
  const str = randomStr(len, index);
  const tmpArr = str.split('');
  const dupSecCount = Math.floor(Math.random() * len);
  const randomArr = randomNumArr(len, 0, dupSecCount);

  for (let i = 0; i < randomArr.length; i++) {
    const start = randomArr[i];
    const c = str[start];
    if (start <= len - k) {
      for (let j = 0; j < k; j++) {
        tmpArr[start + j] = c;
      }
    }
  }
  return tmpArr.join('');
};

console.log(randomStrWithDuplicateChar(20, 3));

const print = (baseStr, data) =>
  baseStr.match(/.{1,22}/g).map(
    (line) =>
      console.log(line.split('').join('    ')) ||
      console.log(
        line
          .split('')
          .map((char) => (!data ? char : data[char] || '  '))
          .join(' ')
      )
  );

const printStat = (baseStr, str) => {
  console.log('base string:', baseStr, ', statistic detail:');

  const hash = str.split('').reduce((hash, char) => {
    hash[char] = hash[char] || 0;
    hash[char]++;
    return hash;
  }, {});
  const sum = Object.values(hash).reduce((t, c) => t + c);
  Object.keys(hash).forEach(
    (char) => (hash[char] = ((hash[char] * 100) / sum).toFixed(2))
  );
  // console.log(hash);
  // print(baseStr, hash);
};

const randomStrBenchmark = () =>
  Array(1)
    .fill(0)
    .map(() => {
      const len = 100;
      printStat(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        randomStr(len, 0)
      );
      printStat(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        randomStr(len, 1)
      );
      printStat('abcdefghijklmnopqrstuvwxyz', randomStr(len, 2));
      printStat('ABCDEFGHIJKLMNOPQRSTUVWXYZ', randomStr(len, 3));
    });

const repeat = (times, fn) => Array(times).fill(0).forEach(fn);

// repeat(100, () => {
//   const arr = randomNumArr(99, -100);
//   console.log(Math.max(...arr), Math.min(...arr));
// });

/************************************************************************************************/

var removeDuplicates = function (s, k) {
  let rs = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    rs.push(c);

    if (rs.length < k) {
      continue;
    } else {
      let flag = true;
      const lastIndex = rs.length - 1;
      for (let j = lastIndex; j > lastIndex + 1 - k && j > 0; j--) {
        if (rs[j] !== rs[j - 1]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        for (let m = k; m > 0; m--) {
          rs.pop();
        }
      }
    }
  }

  return rs.join('');
};

var compareGroup = function (s, k) {
  let rs = s;
  const reg = new RegExp(`(\\w)\\1{${k - 1}}`, 'ig');
  let tmp = rs.replace(reg, '');
  while (tmp.length < rs.length) {
    tmp = tmp.replace(reg, '');
  }
  return rs;
};

// const s = 'deeedbbcccbdaa';
// const s = randomStr(1000);

// console.log(
//   Array(10000)
//     .fill(0)
//     .map(() => {
//       s = randomStr(Math.floor(Math.random() * 1000), 2);
//       const rs = removeDuplicates(s, 3) === compareGroup(s, 3);
//       // console.log(s, rs);
//       return rs;
//     })
//     .every((rs) => rs === true)
// );
