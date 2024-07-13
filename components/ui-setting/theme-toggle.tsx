import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Laptop2Icon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  //const classIcon = 'size-5 bg-white dark:bg-[#1c1b22]';
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" size="icon">
            {['dark'].includes(theme as string) && (
              <MoonIcon
                onClick={() => setTheme('light')}
                className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              />
            )}
            {['system'].includes(theme as string) && (
              <Laptop2Icon
                onClick={() => setTheme('light')}
                className="size-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-0 dark:scale-100"
              />
            )}
            {['light'].includes(theme as string) && (
              <SunIcon
                className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                onClick={() => setTheme('dark')}
              />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-16 dark:border-gray-800 dark:bg-[#1c1b22]">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setTheme('light')}>
              <span className="cursor-pointer">Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              <span className="cursor-pointer">Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              <span className="cursor-pointer">System</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="system">System</option>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select> */}
    </>
  );
};

export { ThemeToggle };
