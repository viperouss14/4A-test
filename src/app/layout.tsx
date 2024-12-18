import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const rubik = localFont({
  src: './fonts/Rubik-VariableFont_wght.ttf',
  variable: '--font-rubik',
  weight: '100 900',
});
const bebasNeue = localFont({
  src: './fonts/BebasNeue-Regular.ttf',
  variable: '--font-bebas-neue',
  weight: '400',
});
const ptRootUIBold = localFont({
  src: './fonts/PT Root UI_Bold.otf',
  variable: '--font-pt-root-ui',
  weight: '700',
});
const ptRootUIReg = localFont({
  src: './fonts/PT Root UI_Regular.otf',
  variable: '--font-pt-root-ui-reg',
  weight: '400',
});
const bebasNeueCyr = localFont({
  src: './fonts/bebasneuecyrillic.ttf',
  variable: '--font-bebas-neue-cyr',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'FitnessClub',
  description: 'Страница выбора тарифов фитнес клуба с хорошими скидками',
  openGraph: {
    title: 'FitnessClub',
    description: 'Страница выбора тарифов фитнес клуба с хорошими скидками',
    url: 'https://4-a-test.vercel.app/',
    siteName: 'FitnessClub',
    images: [
      {
        url: 'https://4-a-test.vercel.app/meta.png',
        width: 1200,
        height: 630,
        alt: 'FitnessClub',
        type: 'image/png',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitnessClub',
    description: 'Страница выбора тарифов фитнес клуба с хорошими скидками',
    images: ['https://4-a-test.vercel.app/meta.png'],
  },
  other: {
    'og:image:secure_url': 'https://4-a-test.vercel.app/meta.png',
    'og:image:width': '1200',
    'og:image:height': '630',
    'telegram:channel': '@victor_us',
    'telegram:card': 'summary_large_image',
    'telegram:image': 'https://4-a-test.vercel.app/meta.png',
    'telegram:title': 'FitnessClub',
    'telegram:description':
      'Страница выбора тарифов фитнес клуба с хорошими скидками',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} ${bebasNeue.variable} ${ptRootUIBold.variable} ${ptRootUIReg.variable} ${bebasNeueCyr.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
