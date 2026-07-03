exports.handler = async function(event) {
  const apiKey = process.env.ODDS_API_KEY;
  const { path, queryStringParameters } = event;

  const oddsPath = event.queryStringParameters._path || '';
  delete queryStringParameters._path;

  const params = new URLSearchParams({
    ...queryStringParameters,
    apiKey
  });

  const url = `https://api.the-odds-api.com${oddsPath}?${params}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: data
    };
  } catch(err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
