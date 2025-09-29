export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '*';
    const corsHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Vary': 'Origin',
      'Access-Control-Allow-Methods': 'POST,OPTIONS',
      'Access-Control-Allow-Headers': 'content-type'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return new Response('ok', { headers: corsHeaders });
    }

    if (url.pathname === '/v1/generate' && request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch (_) {
        body = {};
      }
      const prompt = (body && body.prompt) || '';
      if (!prompt) {
        return new Response(JSON.stringify({ error: 'Missing prompt' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${env.GEMINI_API_KEY}`;
      const payload = {
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      };

      try {
        const apiRes = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const apiJson = await apiRes.json();

        let text = '';
        try {
          const parts = (apiJson && apiJson.candidates && apiJson.candidates[0] && apiJson.candidates[0].content && apiJson.candidates[0].content.parts) || [];
          text = parts.map(p => p.text || '').join('');
        } catch (_) {
          text = '';
        }

        if (!text) {
          text = 'Sorry, unable to generate a response right now.';
        }

        return new Response(JSON.stringify({ text }), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Upstream error', details: String(err) }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    return new Response('Not found', { status: 404, headers: corsHeaders });
  }
};

