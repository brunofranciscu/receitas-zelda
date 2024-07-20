import express from 'express';
import fetch from 'node-fetch'; // Substitua request por node-fetch

const app = express();
const port = 3000;

// Middleware para adicionar cabeçalhos CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/proxy', async (req, res) => {
  const url = 'https://script.google.com/macros/s/AKfycbwVgIc_isVOGEG9t0v9fFWkGvK9K0i2PH3o9qQ6fBvl-zzI9Fr3xzGOoENI5aeOgjKDcA/exec';
  
  try {
    const response = await fetch(url);
    const text = await response.text(); // Ler como texto para verificar conteúdo

    console.log('Response Text:', text); // Adicionar log

    if (text.startsWith('<')) {
      console.error('Erro: Esperado JSON, mas retornou HTML');
      return res.status(500).send('Erro: Esperado JSON, mas retornou HTML');
    }

    const body = JSON.parse(text); // Converter texto para JSON
    res.json(body);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).send('Erro ao buscar dados: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
