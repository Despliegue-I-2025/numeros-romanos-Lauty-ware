import { arabicToRoman, isValidArabicInput } from '../arabicToRoman.js';

describe('Conversor Arábigo a Romano', () => {
    
    describe('arabicToRoman', () => {
        
        test('debería convertir números básicos correctamente', () => {
            expect(arabicToRoman(1)).toBe('I');
            expect(arabicToRoman(5)).toBe('V');
            expect(arabicToRoman(10)).toBe('X');
            expect(arabicToRoman(50)).toBe('L');
            expect(arabicToRoman(100)).toBe('C');
            expect(arabicToRoman(500)).toBe('D');
            expect(arabicToRoman(1000)).toBe('M');
        });
        
        test('debería convertir números con sustracciones correctamente', () => {
            expect(arabicToRoman(4)).toBe('IV');
            expect(arabicToRoman(9)).toBe('IX');
            expect(arabicToRoman(40)).toBe('XL');
            expect(arabicToRoman(90)).toBe('XC');
            expect(arabicToRoman(400)).toBe('CD');
            expect(arabicToRoman(900)).toBe('CM');
        });
        
        test('debería convertir números compuestos correctamente', () => {
            expect(arabicToRoman(14)).toBe('XIV');
            expect(arabicToRoman(49)).toBe('XLIX');
            expect(arabicToRoman(99)).toBe('XCIX');
            expect(arabicToRoman(444)).toBe('CDXLIV');
            expect(arabicToRoman(999)).toBe('CMXCIX');
            expect(arabicToRoman(2023)).toBe('MMXXIII');
            expect(arabicToRoman(3999)).toBe('MMMCMXCIX');
        });
        
        test('debería lanzar error para números fuera de rango', () => {
            expect(() => arabicToRoman(0)).toThrow('El número debe estar entre 1 y 3999');
            expect(() => arabicToRoman(4000)).toThrow('El número debe estar entre 1 y 3999');
            expect(() => arabicToRoman(-1)).toThrow('El número debe estar entre 1 y 3999');
        });
        
        test('debería lanzar error para valores no numéricos', () => {
            expect(() => arabicToRoman('abc')).toThrow('El valor debe ser un número');
            expect(() => arabicToRoman(null)).toThrow('El valor debe ser un número');
            expect(() => arabicToRoman(undefined)).toThrow('El valor debe ser un número');
        });
        
        test('debería lanzar error para números decimales', () => {
            expect(() => arabicToRoman(3.14)).toThrow('El número debe ser entero');
            expect(() => arabicToRoman(10.5)).toThrow('El número debe ser entero');
        });
        
        test('debería manejar números en los límites del rango', () => {
            expect(arabicToRoman(1)).toBe('I');
            expect(arabicToRoman(3999)).toBe('MMMCMXCIX');
        });
    });
    
    describe('isValidArabicInput', () => {
        
        test('debería validar entradas correctas', () => {
            expect(isValidArabicInput('1')).toBe(true);
            expect(isValidArabicInput('100')).toBe(true);
            expect(isValidArabicInput('3999')).toBe(true);
            expect(isValidArabicInput('  42  ')).toBe(true); // con espacios
        });
        
        test('debería rechazar entradas incorrectas', () => {
            expect(isValidArabicInput('0')).toBe(false);
            expect(isValidArabicInput('4000')).toBe(false);
            expect(isValidArabicInput('-5')).toBe(false);
            expect(isValidArabicInput('3.14')).toBe(false);
            expect(isValidArabicInput('abc')).toBe(false);
            expect(isValidArabicInput('')).toBe(false);
            expect(isValidArabicInput('   ')).toBe(false);
            expect(isValidArabicInput(null)).toBe(false);
            expect(isValidArabicInput(undefined)).toBe(false);
        });
        
        test('debería manejar casos edge', () => {
            expect(isValidArabicInput('0001')).toBe(true); // '0001' = 1
            expect(isValidArabicInput('1e3')).toBe(false); // notación científica
        });
    });
    
    describe('Casos de prueba exhaustivos', () => {
        
        const testCases = [
            { arabic: 1, roman: 'I' },
            { arabic: 2, roman: 'II' },
            { arabic: 3, roman: 'III' },
            { arabic: 4, roman: 'IV' },
            { arabic: 5, roman: 'V' },
            { arabic: 6, roman: 'VI' },
            { arabic: 7, roman: 'VII' },
            { arabic: 8, roman: 'VIII' },
            { arabic: 9, roman: 'IX' },
            { arabic: 10, roman: 'X' },
            { arabic: 14, roman: 'XIV' },
            { arabic: 19, roman: 'XIX' },
            { arabic: 40, roman: 'XL' },
            { arabic: 44, roman: 'XLIV' },
            { arabic: 49, roman: 'XLIX' },
            { arabic: 50, roman: 'L' },
            { arabic: 90, roman: 'XC' },
            { arabic: 99, roman: 'XCIX' },
            { arabic: 100, roman: 'C' },
            { arabic: 400, roman: 'CD' },
            { arabic: 500, roman: 'D' },
            { arabic: 900, roman: 'CM' },
            { arabic: 1000, roman: 'M' },
            { arabic: 1987, roman: 'MCMLXXXVII' },
            { arabic: 2023, roman: 'MMXXIII' },
            { arabic: 3999, roman: 'MMMCMXCIX' }
        ];
        
        testCases.forEach(({ arabic, roman }) => {
            test(`debería convertir ${arabic} a ${roman}`, () => {
                expect(arabicToRoman(arabic)).toBe(roman);
            });
        });
    });
});


import { romanToArabic, isValidRoman } from '../romanToArabic.js';

describe('Conversor Romano a Arábigo', () => {
    
    describe('romanToArabic', () => {
        
        test('debería convertir números básicos correctamente', () => {
            expect(romanToArabic('I')).toBe(1);
            expect(romanToArabic('V')).toBe(5);
            expect(romanToArabic('X')).toBe(10);
            expect(romanToArabic('L')).toBe(50);
            expect(romanToArabic('C')).toBe(100);
            expect(romanToArabic('D')).toBe(500);
            expect(romanToArabic('M')).toBe(1000);
        });
        
        test('debería convertir números con sustracciones correctamente', () => {
            expect(romanToArabic('IV')).toBe(4);
            expect(romanToArabic('IX')).toBe(9);
            expect(romanToArabic('XL')).toBe(40);
            expect(romanToArabic('XC')).toBe(90);
            expect(romanToArabic('CD')).toBe(400);
            expect(romanToArabic('CM')).toBe(900);
        });
        
        test('debería convertir números compuestos correctamente', () => {
            expect(romanToArabic('XIV')).toBe(14);
            expect(romanToArabic('XLIX')).toBe(49);
            expect(romanToArabic('XCIX')).toBe(99);
            expect(romanToArabic('CDXLIV')).toBe(444);
            expect(romanToArabic('CMXCIX')).toBe(999);
            expect(romanToArabic('MMXXIII')).toBe(2023);
            expect(romanToArabic('MMMCMXCIX')).toBe(3999);
        });
        
        test('debería ser case insensitive', () => {
            expect(romanToArabic('xiv')).toBe(14);
            expect(romanToArabic('XIV')).toBe(14);
            expect(romanToArabic('Xiv')).toBe(14);
        });
        
        test('debería lanzar error para números romanos inválidos', () => {
            expect(() => romanToArabic('IIII')).toThrow();
            expect(() => romanToArabic('VV')).toThrow();
            expect(() => romanToArabic('IC')).toThrow();
            expect(() => romanToArabic('XM')).toThrow();
            expect(() => romanToArabic('ABC')).toThrow();
            expect(() => romanToArabic('')).toThrow();
        });
        
        test('debería manejar números complejos', () => {
            expect(romanToArabic('MCMLXXXIV')).toBe(1984);
            expect(romanToArabic('MCMXC')).toBe(1990);
            expect(romanToArabic('MMCDXLIV')).toBe(2444);
        });
    });
    
    describe('isValidRoman', () => {
        
        test('debería validar números romanos correctos', () => {
            expect(isValidRoman('I')).toBe(true);
            expect(isValidRoman('IV')).toBe(true);
            expect(isValidRoman('IX')).toBe(true);
            expect(isValidRoman('XLII')).toBe(true);
            expect(isValidRoman('XCIX')).toBe(true);
            expect(isValidRoman('MMXXIII')).toBe(true);
            expect(isValidRoman('xiv')).toBe(true); // case insensitive
        });
        
        test('debería rechazar números con repeticiones inválidas', () => {
            expect(isValidRoman('IIII')).toBe(false); // más de 3 I's
            expect(isValidRoman('XXXX')).toBe(false); // más de 3 X's
            expect(isValidRoman('CCCC')).toBe(false); // más de 3 C's
            expect(isValidRoman('MMMM')).toBe(false); // más de 3 M's
            expect(isValidRoman('VV')).toBe(false);   // V repetido
            expect(isValidRoman('LL')).toBe(false);   // L repetido
            expect(isValidRoman('DD')).toBe(false);   // D repetido
        });
        
        test('debería rechazar sustracciones inválidas', () => {
            expect(isValidRoman('IL')).toBe(false); // I no puede restar a L
            expect(isValidRoman('IC')).toBe(false); // I no puede restar a C
            expect(isValidRoman('ID')).toBe(false); // I no puede restar a D
            expect(isValidRoman('IM')).toBe(false); // I no puede restar a M
            expect(isValidRoman('VX')).toBe(false); // V no puede restar
            expect(isValidRoman('XD')).toBe(false); // X no puede restar a D
            expect(isValidRoman('XM')).toBe(false); // X no puede restar a M
            expect(isValidRoman('LC')).toBe(false); // L no puede restar
            expect(isValidRoman('DM')).toBe(false); // D no puede restar
        });
        
        test('debería rechazar caracteres no romanos', () => {
            expect(isValidRoman('ABC')).toBe(false);
            expect(isValidRoman('X1V')).toBe(false);
            expect(isValidRoman('X IV')).toBe(false); // espacios
            expect(isValidRoman('X.IV')).toBe(false); // puntos
        });
        
        test('debería rechazar valores no string', () => {
            expect(isValidRoman(123)).toBe(false);
            expect(isValidRoman(null)).toBe(false);
            expect(isValidRoman(undefined)).toBe(false);
            expect(isValidRoman({})).toBe(false);
        });
        
        test('debería rechazar strings vacíos', () => {
            expect(isValidRoman('')).toBe(false);
            expect(isValidRoman('   ')).toBe(false);
        });
    });
    
    describe('Casos de prueba exhaustivos', () => {
        
        const testCases = [
            { roman: 'I', arabic: 1 },
            { roman: 'II', arabic: 2 },
            { roman: 'III', arabic: 3 },
            { roman: 'IV', arabic: 4 },
            { roman: 'V', arabic: 5 },
            { roman: 'VI', arabic: 6 },
            { roman: 'VII', arabic: 7 },
            { roman: 'VIII', arabic: 8 },
            { roman: 'IX', arabic: 9 },
            { roman: 'X', arabic: 10 },
            { roman: 'XIV', arabic: 14 },
            { roman: 'XIX', arabic: 19 },
            { roman: 'XL', arabic: 40 },
            { roman: 'XLIV', arabic: 44 },
            { roman: 'XLIX', arabic: 49 },
            { roman: 'L', arabic: 50 },
            { roman: 'XC', arabic: 90 },
            { roman: 'XCIX', arabic: 99 },
            { roman: 'C', arabic: 100 },
            { roman: 'CD', arabic: 400 },
            { roman: 'D', arabic: 500 },
            { roman: 'CM', arabic: 900 },
            { roman: 'M', arabic: 1000 },
            { roman: 'MCMLXXXVII', arabic: 1987 },
            { roman: 'MMXXIII', arabic: 2023 },
            { roman: 'MMMCMXCIX', arabic: 3999 }
        ];
        
        testCases.forEach(({ roman, arabic }) => {
            test(`debería convertir ${roman} a ${arabic}`, () => {
                expect(romanToArabic(roman)).toBe(arabic);
            });
        });
    });
    
    describe('Pruebas de ida y vuelta', () => {
        
        test('debería ser reversible para números válidos', () => {
            const testNumbers = [1, 4, 9, 14, 49, 99, 444, 999, 2023, 3999];
            
            testNumbers.forEach(num => {
                const roman = require('../arabicToRoman.js').arabicToRoman(num);
                const convertedBack = romanToArabic(roman);
                expect(convertedBack).toBe(num);
            });
        });
    });
});