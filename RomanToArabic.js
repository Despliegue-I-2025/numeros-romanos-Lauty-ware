function romanToArabic(roman) {
  if (typeof roman !== 'string') {
    throw new Error('El valor debe ser una cadena');
  }

  const valores = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };

  const s = roman.toUpperCase();
  let total = 0;
  let prev = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    const c = s[i];
    const valor = valores[c];
    if (!valor) {
      throw new Error('Número romano inválido');
    }

    if (valor < prev) {
      total -= valor;
    } else {
      total += valor;
      prev = valor;
    }
  }

  return total;
}

module.exports = { romanToArabic };
