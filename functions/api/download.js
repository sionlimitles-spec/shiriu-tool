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
  const isInstagram = targetUrl.includes("instagram.com");

  let apiUrl = "";

  if (isYouTube) {
    // Coba API YouTube yang lebih stabil
    apiUrl = `https://api.nyxs.pw/dl/ytmp4?url=${encodeURIComponent(targetUrl)}`;
  } else if (isTikTok) {
    apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(targetUrl)}`;
  } else if (isInstagram) {
    apiUrl = `https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(targetUrl)}`;
  } else {
    return new Response(JSON.stringify({ error: "Platform belum didukung" }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  try {
    const apiResponse = await fetch(apiUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(10000), // Batas waktu 10 detik
    });

    const text = await apiResponse.text(); // Baca teks mentah dulu untuk menghindari error parsing

    if (!apiResponse.ok) {
      throw new Error(`Upstream error (${apiResponse.status}): ${text.slice(0, 100)}`);
    }

    const data = JSON.parse(text); // Parse setelah dipastikan tidak error

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Gagal menghubungi server sumber" }), {
      status: 502, // Bad Gateway
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
