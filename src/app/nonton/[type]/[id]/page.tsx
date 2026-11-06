import DetailClient from "./DetailClient";

// Fungsi ini wajib ada untuk static export (output: 'export')
// Kita berikan ID dummy agar Next.js mau mem-build halaman ini.
// Saat user membuka ID lain (misal: anime/123), Next.js akan menanganinya di sisi browser.
export function generateStaticParams() {
  return [
    { type: 'anime', id: '1' },
    { type: 'film', id: '1' },
    { type: 'donghua', id: '1' },
  ];
}

export default function Page() {
  return <DetailClient />;
}
