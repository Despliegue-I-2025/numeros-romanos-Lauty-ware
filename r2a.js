const { romanToArabic } = require('../RomanToArabic');

module.exports = (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
};
