// app/layout.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: "FF BETA",
  description: `Unduh aplikasi Free Fire Beta secara gratis dan resmi. FF BETA adalah platform terpercaya untuk mengakses versi terbaru Free Fire sebelum dirilis ke publik. Dapatkan pembaruan lebih awal, uji fitur baru, dan nikmati pengalaman bermain yang lebih seru!`,
  icons: {
    icon: "https://files.catbox.moe/o6tznl.ico",
    shortcut: "https://files.catbox.moe/o6tznl.ico",
    apple: "https://files.catbox.moe/dq3sr2.png",
  },
  openGraph: {
    images: [{ url: "https://files.catbox.moe/dq3sr2.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://files.catbox.moe/dq3sr2.png"],
  },
  other: {
    monetag: "20fd7ff6884df4f66f8d228c68e166be",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Meta verifikasi */}
        <meta
          name="95714a6c65a8ac999686234344e9d5786ecf727c"
          content="95714a6c65a8ac999686234344e9d5786ecf727c"
        />
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </head>
      <body>
        {/* Script Monetag */}
        <Script id="monetag-script" strategy="afterInteractive">
          {`
            (function(d,z,s){
              s.src='https://'+d+'/401/'+z;
              try {
                (document.body || document.documentElement).appendChild(s);
              } catch(e) {}
            })('groleegni.net', 9495292, document.createElement('script'));
          `}
        </Script>

        {/* Script Hilltopads */}
        <Script id="essentialmost-script" strategy="afterInteractive">
          {`
            (function(fkdol){
              var d = document,
                  s = d.createElement('script'),
                  l = d.scripts[d.scripts.length - 1];
              s.settings = fkdol || {};
              s.src = "//essentialmost.com/cIDv9Q6Cb.2_5dlDS/W/Qz9/N/j/Q/1ZNWzDY/yXOxCF0D2/NVDEUF3-NtjRID5n";
              s.async = true;
              s.referrerPolicy = 'no-referrer-when-downgrade';
              l.parentNode.insertBefore(s, l);
            })({});
          `}
        </Script>

        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}