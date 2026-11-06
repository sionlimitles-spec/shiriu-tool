// functions/api/download.js

export async function onRequest(context) {
  const { request } = context;
  const urlParams = new URL(request.url);
  const targetUrl = urlParams.searchParams.get("url");

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "URL is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // 1. Deteksi platform dari URL yang diminta pengguna
    let apiUrl = "";
    if (targetUrl.includes("youtube.com") || targetUrl.includes("youtu.be")) {
      // Gunakan API YouTube yang stabil (Siputzx / Nyxs)
      apiUrl = `https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(targetUrl)}`;
    } else if (targetUrl.includes("tiktok.com")) {
      // Gunakan TikWM untuk TikTok (sangat stabil)
      apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(targetUrl)}`;
    } else if (targetUrl.includes("instagram.com")) {
      apiUrl = `https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(targetUrl)}`;
    } else {
      return new Response(JSON.stringify({ error: "Platform belum didukung" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Panggil API eksternal dari server Cloudflare
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();

    // 3. Kembalikan data ke frontend dengan header CORS yang terbuka
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Izinkan akses dari domain mana pun
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}

// Menangani preflight request (OPTIONS) agar browser mengizinkan pemanggilan
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
