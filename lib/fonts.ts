import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['cyrillic'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['cyrillic'],
  variable: '--font-mono',
});
