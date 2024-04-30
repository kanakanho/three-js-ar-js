This is a Next.js Approuter PWA Template.

This project uses `Dynamic Routes` for dynamic `manifest.json` and `start_url`.

## Create manifest.json in api route

you must create `.env.local` file.

Example:
```env:.env.loval
NEXT_PUBLIC_BASE_URL=http://localhost:3000/
```

## Change manifest

Change `app/api/manifest/route` file.

Example:
```ts:route.ts
import { NextRequest, NextResponse } from 'next/server';

interface Manifest {
  theme_color: string;
  background_color: string;
  display: string;
  scope: string;
  start_url: string;
  name: string;
  short_name: string;
  description: string;
  icons: {
    src: string;
    sizes: string;
    type: string;
  }[];
}

export async function GET(req: NextRequest): Promise<NextResponse<Manifest>> {
  const { searchParams } = req.nextUrl;
  const start_url = `/${searchParams.get('start_url')}`;

  const manifest: Manifest = {
    theme_color: '#f69435',
    background_color: '#f69435',
    display: 'standalone',
    scope: '/',
    start_url: start_url,
    name: 'next-pwa',
    short_name: 'next-pwa',
    description: '',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  return NextResponse.json(manifest);
}
```

> [!NOTE]
> ```ts
> type Props = {
>   params: {
>     id: string;
>   };
> };
> ```
> `id` is linked to Dynamic Routes (`[]`) directory name.
