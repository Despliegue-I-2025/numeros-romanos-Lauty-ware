const express = require('express');
const cors = require('cors');

const app = express();

// 🔥 CONFIGURACIÓN CORS COMPLETA Y EXPLÍCITA
app.use((req, res, next) => {
  console.log('📍 Solicitud recibida:', req.method, req.url);
  
  // Headers CORS MÁS COMPLETOS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, HEAD');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Range');
  
  // Manejar preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    console.log('🛬 Preflight OPTIONS recibido');
    return res.status(200).end();
  }
  
  next();
});

// También usar el middleware cors por si acaso
app.use(cors({
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  credentials: false
}));

app.use(express.json());

// 🎯 RUTA 1: /a2r - Arábigo a Romano
app.get('/a2r', (req, res) => {
  console.log('🔢 /a2r - Parámetros:', req.query);
  
  const arabic = req.query.arabic;
  
  // Validar parámetro ausente
  if (!arabic) {
    console.log('❌ /a2r - Error: Parámetro arabic ausente');
    return res.status(400).json({ 
      error: 'Parámetro "arabic" es requerido' 
    });
  }
  
  // Validar que sea número
  const arabicNumber = parseInt(arabic);
  if (isNaN(arabicNumber)) {
    console.log('❌ /a2r - Error: No es número válido');
    return res.status(400).json({ 
      error: 'Parámetro "arabic" debe ser un número válido' 
    });
  }
  
  // Validar rango (1-3999)
  if (arabicNumber < 1 || arabicNumber > 3999) {
    console.log('❌ /a2r - Error: Fuera de rango');
    return res.status(400).json({ 
      error: 'El número debe estar entre 1 y 3999' 
    });
  }
  
  // Convertir a romano
  const roman = arabicToRoman(arabicNumber);
  console.log('✅ /a2r - Conversión exitosa:', arabicNumber, '→', roman);
  
  res.status(200).json({ roman });
});

// 🎯 RUTA 2: /r2a - Romano a Arábigo
app.get('/r2a', (req, res) => {
  console.log('🔤 /r2a - Parámetros:', req.query);
  
  const roman = req.query.roman;
  
  // Validar parámetro ausente
  if (!roman) {
    console.log('❌ /r2a - Error: Parámetro roman ausente');
    return res.status(400).json({ 
      error: 'Parámetro "roman" es requerido' 
    });
  }
  
  // Validar y convertir
  const arabic = romanToArabic(roman.toString().toUpperCase().trim());
  if (!arabic) {
    console.log('❌ /r2a - Error: Romano inválido');
    return res.status(400).json({ 
      error: 'Número romano inválido' 
    });
  }
  
  console.log('✅ /r2a - Conversión exitosa:', roman, '→', arabic);
  res.status(200).json({ arabic });
});

// 🏠 RUTA PRINCIPAL - Para pruebas
app.get('/', (req, res) => {
  console.log('🏠 Ruta principal accedida');
  res.json({ 
    message: '✅ API de Números Romanos - FUNCIONANDO',
    status: 'operacional',
    endpoints: [
      'GET /a2r?arabic=123 → {"roman":"CXXIII"}',
      'GET /r2a?roman=CXXIII → {"arabic":123}'
    ],
    timestamp: new Date().toISOString()
  });
});

// 🔧 FUNCIONES DE CONVERSIÓN
function arabicToRoman(num) {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
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
  // Validar caracteres básicos primero
  if (!/^[IVXLCDM]+$/.test(roman)) {
    return null;
  }
  
  const romanValues = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };
  
  // Validar formato romano correcto
  const validRomanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  if (!validRomanRegex.test(roman)) {
    return null;
  }
  
  let result = 0;
  let previousValue = 0;
  
  for (let i = roman.length - 1; i >= 0; i--) {
    const currentChar = roman[i];
    const currentValue = romanValues[currentChar];
    
    if (currentValue < previousValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }
    
    previousValue = currentValue;
  }
  
  return result;
}

// 🚨 MANEJADOR DE ERRORES
app.use((req, res) => {
  console.log('❌ Ruta no encontrada:', req.url);
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    rutas_validas: ['/a2r', '/r2a', '/']
  });
});

// 📝 EXPORT PARA VERCEL
module.exports = app;