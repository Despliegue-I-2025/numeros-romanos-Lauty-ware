class RomanConverter {
    constructor() {
        this.romanNumerals = {
            'I': 1,
            'V': 5,
            'X': 10,
            'L': 50,
            'C': 100,
            'D': 500,
            'M': 1000
        };
        
        this.validSubtractions = {
            'IV': 4,
            'IX': 9,
            'XL': 40,
            'XC': 90,
            'CD': 400,
            'CM': 900
        };
    }

    isValidRoman(roman) {
        if (typeof roman !== 'string') return false;
        if (roman === '') return false;
        
        const validChars = /^[IVXLCDM]+$/i;
        if (!validChars.test(roman)) return false;
        
        const upperRoman = roman.toUpperCase();
        
        const repetitionRules = [
            /I{4,}/, /X{4,}/, /C{4,}/, /M{4,}/, 
            /V{2,}/, /L{2,}/, /D{2,}/,           
        ];
        
        for (let rule of repetitionRules) {
            if (rule.test(upperRoman)) return false;
        }
        
    
        const invalidPatterns = [
            /IL/, /IC/, /ID/, /IM/,  
            /VX/, /VL/, /VC/, /VD/, /VM/, 
            /XD/, /XM/,              
            /LC/, /LD/, /LM/,       
            /DM/,                    
        ];
        
        for (let pattern of invalidPatterns) {
            if (pattern.test(upperRoman)) return false;
        }
        
        return true;
    }

    romanToArabic(roman) {
       
        if (!this.isValidRoman(roman)) {
            throw new Error(`"${roman}" no es un número romano válido`);
        }
        
        const upperRoman = roman.toUpperCase();
        let result = 0;
        let i = 0;
        
        while (i < upperRoman.length) {
                if (i < upperRoman.length - 1) {
                const twoChars = upperRoman.substring(i, i + 2);
                if (this.validSubtractions[twoChars]) {
                    result += this.validSubtractions[twoChars];
                    i += 2;
                    continue;
                }
            }
        
            const currentChar = upperRoman[i];
            result += this.romanNumerals[currentChar];
            i++;
        }
        
        return result;
    }

}
module.exports = { romanToArabic };

