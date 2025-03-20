import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import { LoaderCircle, LogOut, Moon, Search, Settings, Sun } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useTheme } from "@/components/theme-provider";

import { useInitials } from "@/hooks/use-initials";

import logoWide from "@/assets/image/icon/logo-wide.png";
import { logout } from "@/redux/auth/authSlice";
import { toast } from "sonner";

const Header = () => {
  const id = useId();
  const getInitials = useInitials();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const { user, isAuthenticated } = useSelector((state: any) => state.auth);

  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const onClickLogout = () => {
    dispatch(logout());
    toast.info("Logout successful!");
    navigate("/");
  };

  return (
    <header className='sticky top-0 bg-background z-10'>
      <div className='container mx-auto flex justify-between py-2 items-center'>
        <div className='flex gap-8 items-center'>
          <Link to={"/"}>
            <img src={logoWide} alt='logo' className='max-w-32 h-auto' />
          </Link>
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

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='size-10 p-1'>
                  <Avatar className='size-8 overflow-hidden'>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className='bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end'>
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <Avatar className='h-8 w-8 overflow-hidden'>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className='bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'>
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-medium'>{user.name}</span>
                      <span className='text-muted-foreground truncate text-xs'>{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link className='block w-full' to={"/"}>
                      <Settings className='mr-2' />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button className='block w-full' onClick={() => onClickLogout()}>
                    <LogOut className='mr-2' />
                    Log out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to={"/login"}>
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link to={"/register"}>
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
