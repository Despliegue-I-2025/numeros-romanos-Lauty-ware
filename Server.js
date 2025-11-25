const express = require('express');
const cors = require('cors');

const app = express();

// Configurar CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Ruta GET /a2r?arabic=123
app.get('/a2r', (req, res) => {
  const arabic = req.query.arabic;
  
  if (!arabic) {
    return res.status(400).json({ error: 'Parámetro "arabic" es requerido' });
  }
  
  const arabicNumber = parseInt(arabic);
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ error: 'Parámetro "arabic" debe ser un número válido' });
  }
  
  if (arabicNumber < 1 || arabicNumber > 3999) {
    return res.status(400).json({ error: 'El número debe estar entre 1 y 3999' });
  }
  
  const roman = arabicToRoman(arabicNumber);
  res.status(200).json({ roman });
});

// Ruta GET /r2a?roman=CXXIII
app.get('/r2a', (req, res) => {
  const roman = req.query.roman;
  
  if (!roman) {
    return res.status(400).json({ error: 'Parámetro "roman" es requerido' });
  }
  
  const arabic = romanToArabic(roman.toString().toUpperCase());
  if (!arabic) {
    return res.status(400).json({ error: 'Número romano inválido' });
  }
  
  res.status(200).json({ arabic });
});

// Funciones de conversión
function arabicToRoman(num) {
  const romanNumerals = [
    { value: 1000, numeral: 'M' }, { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' }, { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' }, { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' }, { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' }, { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' }, { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];
  
  let result = '';
  let remaining = num;
  
  for (const { value, numeral } of romanNumerals) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  
  return result;
}

function romanToArabic(roman) {
  const romanValues = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };
  
  const validRomanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  if (!validRomanRegex.test(roman)) return null;
  
  let result = 0;
  let previousValue = 0;
  
  for (let i = roman.length - 1; i >= 0; i--) {
    const currentValue = romanValues[roman[i]];
    if (currentValue < previousValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }
    previousValue = currentValue;
  }
  
  return result;
}

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Números Romanos funcionando' });
});

app.options('*', cors());

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});

module.exports = app;