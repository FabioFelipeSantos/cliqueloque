export default function createCnpj() {
  const cnpj = [];

  for (let i = 0; i < 12; i++) {
    if (i === 0) {
      cnpj.push(Math.floor(Math.random() * 3) + 1);
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

// for (let i = 0; i < 10; i++) {
//   console.log(createCnpj());
// }

/*
23386103/0002-18
28678182/0003-35
34362840/0001-16
20643130/0003-11
16604333/0002-40
31475866/0002-63
28028826/0002-69
32777640/0003-60
24006277/0001-90
17070407/0001-98
*/
