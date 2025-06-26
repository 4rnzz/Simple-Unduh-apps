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
      <body>
        <Script id="monetag-script" strategy="afterInteractive">
          {`
            (function(d,z,s){
              s.src='https://'+d+'/401/'+z;
              try{
                (document.body || document.documentElement).appendChild(s)
              } catch(e){}
            })('groleegni.net', 9495292, document.createElement('script'));
          `}
        </Script>

        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}