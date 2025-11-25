function arabicToRoman(num) {
  if (typeof num !== 'number') {
    throw new Error('El valor debe ser un número');
  }
  if (num <= 0 || num >= 4000) {
    throw new Error('El número debe estar entre 1 y 3999');
  }

  const valores = [
    1000, 900, 500, 400,
    100, 90, 50, 40,
    10, 9, 5, 4,
    1
  ];

  const simbolos = [
    'M', 'CM', 'D', 'CD',
    'C', 'XC', 'L', 'XL',
    'X', 'IX', 'V', 'IV',
    'I'
  ];

  let resultado = '';
  let i = 0;

  while (num > 0) {
    if (num >= valores[i]) {
      resultado += simbolos[i];
      num -= valores[i];
    } else {
      i++;
    }
  }

  return resultado;
}

module.exports = { arabicToRoman };
