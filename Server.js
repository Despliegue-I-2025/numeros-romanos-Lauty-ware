const express = require('express');
const cors = require('cors');

const { arabicToRoman } = require('./ArabicToRoman');
const { romanToArabic } = require('./RomanToArabic');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// GET /a2r?arabic=123 → {"roman":"CXXIII"}
app.get('/a2r', (req, res) => {
  const arabicStr = req.query.arabic;
  const arabic = parseInt(arabicStr, 10);

  if (!arabicStr || Number.isNaN(arabic) || arabic <= 0) {
    return res
      .status(400)
      .json({ error: 'Parámetro "arabic" inválido o ausente' });
  }

  try {
    const roman = arabicToRoman(arabic);
    return res.status(200).json({ roman });
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.message || 'Error al convertir a romano' });
  }
});

// GET /r2a?roman=CXXIII → {"arabic":123}
app.get('/r2a', (req, res) => {
  const roman = req.query.roman;

  if (!roman || typeof roman !== 'string' || !/^[IVXLCDM]+$/i.test(roman)) {
    return res
      .status(400)
      .json({ error: 'Parámetro "roman" inválido o ausente' });
  }

  try {
    const arabic = romanToArabic(roman.toUpperCase());
    if (arabic == null || Number.isNaN(arabic)) {
      return res
        .status(400)
        .json({ error: 'No se pudo convertir el número romano' });
    }
    return res.status(200).json({ arabic });
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.message || 'Error al convertir a arábigo' });
  }
});

app.get('/', (req, res) => {
  res.send('API Números Romanos OK');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
