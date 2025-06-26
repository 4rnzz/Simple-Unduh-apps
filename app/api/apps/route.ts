export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const data = {
    name: "FF BETA",
    authors: "Garena",
    listapps: [
      {
        name: "FF BETA ASTUTE V1",
        icon: "https://files.catbox.moe/6aginb.webp",
        thumb: "https://files.catbox.moe/x880u6.jpg",
        desk: "FF BETA adalah versi uji coba Free Fire yang sudah dimodifikasi dengan fitur Unlock All Skin, performa ringan, dan fitur premium. Akun langsung jadi sultan!",
        version: "1.95.2",
        size: "125 MB",
        download: "https://example.com/ff-beta-astute-v1.apk",
        unlock_steps: [
          {
            title: "Subscribe YouTube",
            url: "https://youtube.com/@skinxtraa",
            icon: "youtube",
          },
          {
            title: "Join Telegram",
            url: "https://youtube.com/@skinxtraa",
            icon: "telegram",
          },
          {
            title: "Follow Instagram",
            url: "https://youtube.com/@skinxtraa",
            icon: "instagram",
          },
          {
            title: "Visit Website",
            url: "https://youtube.com/@skinxtraa",
            icon: "website",
          },
          {
            title: "Support me",
            url: "https://youtube.com/@skinxtraa",
            icon: "website",
          },
        ],
      },
      {
        name: "FF BETA ASTUTE V2",
        icon: "https://files.catbox.moe/6aginb.webp",
        thumb: "https://files.catbox.moe/x880u6.jpg",
        desk: "FF BETA adalah versi uji coba Free Fire yang sudah dimodifikasi dengan fitur Unlock All Skin, performa ringan, dan fitur premium. Akun langsung jadi sultan!",
        version: "1.96.0",
        size: "180 MB",
        download: "https://example.com/ff-beta-ultra-v2.apk",
        unlock_steps: [
          {
            title: "Subscribe YouTube",
            url: "https://youtube.com/@skinxtraa",
            icon: "youtube",
          },
          {
            title: "Join Telegram",
            url: "https://youtube.com/@skinxtraa",
            icon: "telegram",
          },
          {
            title: "Follow Instagram",
            url: "https://youtube.com/@skinxtraa",
            icon: "instagram",
          },
          {
            title: "Visit Website",
            url: "https://youtube.com/@skinxtraa",
            icon: "website",
          },
          {
            title: "Support me",
            url: "https://youtube.com/@skinxtraa",
            icon: "website",
          },
        ],
      },
      {
        name: "FF BETA ASTUTE V3",
        icon: "https://files.catbox.moe/6aginb.webp",
        thumb: "https://files.catbox.moe/x880u6.jpg",
        desk: "FF BETA adalah versi uji coba Free Fire yang sudah dimodifikasi dengan fitur Unlock All Skin, performa ringan, dan fitur premium. Akun langsung jadi sultan!",
        version: "1.94.8",
        size: "85 MB",
        download: "https://example.com/ff-beta-lite.apk",
        unlock_steps: [
          {
            title: "Subscribe YouTube",
            url: "https://youtube.com/@skinxtraa",
            icon: "youtube",
          },
          {
            title: "Join Telegram",
            url: "https://youtube.com/@skinxtraa",
            icon: "telegram",
          },
          {
            title: "Follow Instagram",
            url: "https://youtube.com/@skinxtraa",
            icon: "instagram",
          },
          {
            title: "Visit Website",
            url: "https://youtube.com/@skinxtraa",
            icon: "website",
          },
          {
            title: "Support me",
            url: "https://youtube.com/@skinxtraa",
            icon: "website",
          },
        ],
      },
      {
        name: "FF BETA ASTUTE V4",
        icon: "https://files.catbox.moe/6aginb.webp",
        thumb: "https://files.catbox.moe/x880u6.jpg",
        desk: "FF BETA adalah versi uji coba Free Fire yang sudah dimodifikasi dengan fitur Unlock All Skin, performa ringan, dan fitur premium. Akun langsung jadi sultan!",
        version: "1.97.1",
        size: "220 MB",
        download: "https://example.com/ff-beta-pro-max.apk",
        unlock_steps: [
          {
            title: "Subscribe YouTube",
            url: "https://youtube.com/@skinxtraa",
            icon: "youtube",
          },
          {
            title: "Join Telegram",
            url: "https://youtube.com/@skinxtraa",
            icon: "telegram",
          },
          {
            title: "Follow Instagram",
            url: "https://youtube.com/@skinxtraa",
            icon: "instagram",
          },
          {
            title: "Visit Website",
            url: "https://youtube.com/@skinxtraa",
            icon: "website",
          },
          {
            title: "Support me",
            url: "https://youtube.com/@skinxtraa",
            icon: "website",
          },
        ],
      },
    ],
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
