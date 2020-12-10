const fetch = require('node-fetch');

const api_token = process.env.THEMOVIEDB_TOKEN;
exports.handler = async function(event, context) {
  try {
    const { language, sort_by } = event.queryStringParameters || {};

    const uri = `https://api.themoviedb.org/3/discover/movie?language=${language}&sort_by=${sort_by}`;

    const response = await fetch(uri, {
        headers: {
            'Authorization': 'Bearer ' + api_token,
            'Content-Type': 'application/json;charset=utf-8',
        },

    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log("invocation error:", err); // output to netlify function log
    return {
      statusCode: 500,
      body: err.message // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};