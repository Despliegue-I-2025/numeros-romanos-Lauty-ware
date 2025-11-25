export default function handler(req, res) {
  const { arabicToRoman } = require('../ArabicToRoman');

module.exports = (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
}; 

}
