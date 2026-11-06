export async function onRequest(context) {
  const { request } = context;
  const targetUrl = new URL(request.url).searchParams.get("url");

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "URL wajib diisi" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const isYouTube = targetUrl.includes("youtube.com") || targetUrl.includes("youtu.be");
  const isTikTok = targetUrl.includes("tiktok.com");

  let apiUrl = "";

  // Gunakan API dari Vercel untuk menghindari konflik DNS Cloudflare
  if (isYouTube) {
    apiUrl = `https://btch-downloader-api-green.vercel.app/api/download/youtube?url=${encodeURIComponent(targetUrl)}`;
  } else if (isTikTok) {
    apiUrl = `https://btch-downloader-api-green.vercel.app/api/download/tiktok?url=${encodeURIComponent(targetUrl)}`;
  } else {
    return new Response(JSON.stringify({ error: "Platform belum didukung" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  try {
    const apiResponse = await fetch(apiUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(15000), // Batas waktu 15 detik
    });

    const text = await apiResponse.text();

    if (!apiResponse.ok) {
      // Teruskan pesan error dari upstream agar mudah didiagnosis
      let errorMsg = `Upstream error (${apiResponse.status})`;
      try {
        const errJson = JSON.parse(text);
        errorMsg += `: ${errJson.error?.message || text.slice(0, 150)}`;
      } catch (e) {
        errorMsg += `: ${text.slice(0, 150)}`;
      }
      throw new Error(errorMsg);
    }

    const data = JSON.parse(text);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Gagal menghubungi server sumber" }), {
      status: 502,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
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
