import { useEffect, useId, useState } from "react";

import { LoaderCircle, Moon, Search, Sun } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

import { useTheme } from "@/components/theme-provider";

import logoWide from "@/assets/image/icon/logo-wide.png";

const Header = () => {
  const id = useId();
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  return (
    <header className='sticky top-0 bg-background z-10'>
      <div className='container mx-auto flex justify-between py-2 items-center'>
        <div className='flex gap-8 items-center'>
          <img src={logoWide} alt='logo' className='max-w-32 h-auto' />
          <nav>
            <ul className='flex gap-4'>
              <li>News</li>
              <li>Bookmark</li>
            </ul>
          </nav>
        </div>
        <div className='justify-self-end flex gap-2 items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='relative'>
            <Input
              id={id}
              className='peer ps-9'
              placeholder='Search News...'
              type='search'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
              {isLoading ? (
                <LoaderCircle className='animate-spin' size={16} strokeWidth={2} role='status' aria-label='Loading...' />
              ) : (
                <Search size={16} strokeWidth={2} aria-hidden='true' />
              )}
            </div>
          </div>
          <Button variant={"outline"}>Login</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
