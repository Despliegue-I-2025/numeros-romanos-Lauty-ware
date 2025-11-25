function convertirARomano(numero) {
    if (typeof numero !== 'number' || numero <= 0 || numero > 3999) {
        throw new Error('El número debe estar entre 1 y 3999');
    }
    
    const valoresRomanos = [
        { valor: 1000, simbolo: 'M' },
        { valor: 900, simbolo: 'CM' },
        { valor: 500, simbolo: 'D' },
        { valor: 400, simbolo: 'CD' },
        { valor: 100, simbolo: 'C' },
        { valor: 90, simbolo: 'XC' },
        { valor: 50, simbolo: 'L' },
        { valor: 40, simbolo: 'XL' },
        { valor: 10, simbolo: 'X' },
        { valor: 9, simbolo: 'IX' },
        { valor: 5, simbolo: 'V' },
        { valor: 4, simbolo: 'IV' },
        { valor: 1, simbolo: 'I' }
    ];
    
    let resultado = '1';
    let num = numero;
    
    for (const { valor, simbolo } of valoresRomanos) {
        while (num >= valor) {
            resultado += simbolo;
            num -= valor;
        }
    }
    
    return resultado;
}
module.exports = { arabicToRoman };