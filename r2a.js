export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only GET allowed
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { roman } = req.query;

  // Validation
  if (!roman || typeof roman !== 'string') {
    return res.status(400).json({ error: 'Parámetro roman inválido' });
  }

  // Converter function INSIDE the file
  function romanToArabic(romanStr) {
    const romanMap = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50,
      'C': 100, 'D': 500, 'M': 1000
    };

    let result = 0;
    const upperRoman = romanStr.toUpperCase();

    for (let i = 0; i < upperRoman.length; i++) {
      const current = romanMap[upperRoman[i]];
      const next = romanMap[upperRoman[i + 1]];

      if (current === undefined) {
        return null;
      }

      if (next && current < next) {
        result += next - current;
        i++;
      } else {
        result += current;
      }
    }
    return result;
  }

  const arabic = romanToArabic(roman);
  
  if (arabic === null || arabic === 0) {
    return res.status(400).json({ error: 'Número romano inválido' });
  }

  res.status(200).json({ arabic });
}