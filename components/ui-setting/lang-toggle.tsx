import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { setLanguage } from '@/i18n/context-intl-provider';
import Image from 'next/image';
import { useInputState } from '../hooks';
import { Button } from '../ui/button';

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: '/media/flags/uk.svg',
  },
  {
    lang: 'fr',
    name: 'French',
    flag: '/media/flags/france.svg',
  },
  {
    lang: 'it',
    name: 'Italian',
    flag: 'media/flags/italy.svg',
  },
  // {
  //   lang: 'zh',
  //   name: 'Mandarin',
  //   flag: 'media/flags/china.svg',
  // },
  // {
  //   lang: 'es',
  //   name: 'Spanish',
  //   flag: 'media/flags/spain.svg',
  // },
  // {
  //   lang: 'ja',
  //   name: 'Japanese',
  //   flag: 'media/flags/japan.svg',
  // },
  // {
  //   lang: 'de',
  //   name: 'German',
  //   flag: 'media/flags/germany.svg',
  // },
];

const LangToggle = () => {
  const { locale } = useInputState();
  const currentLanguage = languages.find((x) => x.lang === locale);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon">
            <Image
              width={15}
              height={15}
              src={String(currentLanguage?.flag ?? '/media/flags/uk.svg')}
              alt={String(currentLanguage?.name ?? 'English')}
            />
            <span className="sr-only">Toggle lang</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#1c1b22]">
          <DropdownMenuGroup>
            {languages.map((l, i) => (
              <DropdownMenuItem
                key={i}
                onClick={() => {
                  setLanguage(l?.lang);
                }}
              >
                <Image
                  width={15}
                  height={15}
                  className="mr-2"
                  src={String(l?.flag)}
                  alt={String(l?.name)}
                />
                <span className="cursor-pointer"> {l?.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export { LangToggle };
