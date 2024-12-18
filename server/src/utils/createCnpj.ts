export default function createCnpj() {
  const cnpj = [];

  for (let i = 0; i < 12; i++) {
    if (i === 0) {
      cnpj.push(Math.floor(Math.random() * 2) + 1);
    } else if (i < 8) {
      cnpj.push(Math.floor(Math.random() * 9));
    } else if (i < 11) {
      cnpj.push(0);
    } else {
      cnpj.push(Math.floor(Math.random() * 3) + 1);
    }
  }

  const helpers = [
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  ];

  let firstVerificationDigit =
    cnpj.reduce((acc, cur, index) => (acc += cur * helpers[0][index]), 0) % 11;
  firstVerificationDigit =
    firstVerificationDigit < 2 ? 0 : 11 - firstVerificationDigit;
  cnpj.push(firstVerificationDigit);

  let secondVerificationDigit =
    cnpj.reduce((acc, cur, index) => (acc += cur * helpers[1][index]), 0) % 11;
  secondVerificationDigit =
    secondVerificationDigit < 2 ? 0 : 11 - secondVerificationDigit;
  cnpj.push(secondVerificationDigit);

  return [
    [cnpj.slice(0, 8).join(""), cnpj.slice(8, 12).join("")].join("/"),
    cnpj.slice(12, 14).join(""),
  ].join("-");
}

// console.log(createCnpj());
// console.log(createCnpj());
// console.log(createCnpj());
// console.log(createCnpj());
// console.log(createCnpj());
// console.log(createCnpj());

// 23600072/0001-75
// 28140530/0003-16
// 13605004/0003-07
// 13620654/0001-60
// 17626015/0003-24
// 15084506/0002-84
