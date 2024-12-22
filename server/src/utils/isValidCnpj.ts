export default function isValidCnpj(cnpj: string): boolean {
  const helpers = [
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  ];

  const toVerifyFirstDigit = cnpj.split("").slice(0, -2);

  const sumFirstDigit = toVerifyFirstDigit.reduce(
    (acc, cur, index) => (acc += Number(cur) * helpers[0][index]),
    0,
  );

  let modBy11 = sumFirstDigit % 11;

  const firstValidDigit = modBy11 < 2 ? 0 : 11 - modBy11;

  if (firstValidDigit !== Number(cnpj[cnpj.length - 2])) return false;

  const toVerifySecondDigit = cnpj.split("").slice(0, -1);

  const sumSecondDigit = toVerifySecondDigit.reduce(
    (acc, cur, index) => (acc += Number(cur) * helpers[1][index]),
    0,
  );

  modBy11 = sumSecondDigit % 11;

  const secondValidDigit = modBy11 < 2 ? 0 : 11 - modBy11;

  if (secondValidDigit !== Number(cnpj[cnpj.length - 1])) return false;

  return true;
}
