export async function onRequest(context) {
  const { request } = context;
  const urlParams = new URL(request.url);
  const targetUrl = urlParams.searchParams.get("url");

  if (!targetUrl) {
    return new Response("URL parameter is required", { status: 400 });
  }

  try {
    // Fetch tanpa header Range agar server sumber tidak bingung
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!response.ok) {
       throw new Error(`Upstream error: ${response.status}`);
    }

    // Kembalikan file sebagai stream
    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
        status: 502,
        headers: { 
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": "*" 
        }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}
