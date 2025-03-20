import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router";
import { useId, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

import { LoaderCircle, LogOut, Moon, Search, Sun, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "@/components/theme-provider";

import { useInitials } from "@/hooks/use-initials";

import logoWide from "@/assets/image/icon/logo-wide.png";

import { setNews } from "@/redux/news/newsSlice";
import { logout } from "@/redux/auth/authSlice";
import store from "@/redux/store";

import { Article } from "@/types";

const Header = () => {
  const id = useId();
  const getInitials = useInitials();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const { user, isAuthenticated } = useSelector((state: any) => state.auth);

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const { data, error, isLoading } = useSWR(searchKeyword ? `/everything?q=${searchKeyword}&pageSize=10&searchIn=title` : null);

  const onClickLogout = () => {
    dispatch(logout());
    toast.info("Logout successful!");
    navigate("/");
  };

  const onClickNews = (article: Article) => {
    setSearchKeyword("");
    store.dispatch(setNews(article));
  };

  return (
    <header className='sticky top-0 bg-background z-10'>
      <div className='container mx-auto flex justify-between py-2 items-center'>
        <div className='flex gap-8 items-center'>
          <Link to={"/"}>
            <img src={logoWide} alt='logo' className='max-w-32 h-auto' />
          </Link>
          <nav>
            <ul className='flex gap-2'>
              <li>
                <NavLink
                  to={"/"}
                  className={({ isActive }) => (isActive ? "border-b border-primary bg-primary/10 hover:grayscale-100" : "none") + " py-1"}
                >
                  <Button variant='ghost'>Home</Button>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/search"}
                  className={({ isActive }) => (isActive ? "border-b border-primary bg-primary/10 hover:grayscale-100" : "none") + " py-1"}
                >
                  <Button variant='ghost'>Search</Button>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className='justify-self-end flex gap-2 items-center relative'>
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
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
              {isLoading ? (
                <LoaderCircle className='animate-spin' size={16} strokeWidth={2} role='status' aria-label='Loading...' />
              ) : (
                <Search size={16} strokeWidth={2} aria-hidden='true' />
              )}
            </div>
            <div className={`h-72 w-full top-full left-0 z-20 bg-primary-foreground border ${searchKeyword ? "absolute" : "hidden"}`}>
              {searchKeyword && data && !error && (
                <ScrollArea className='h-72'>
                  <div className='p-4'>
                    {data.articles.map((article: Article, index: number) => (
                      <div key={index}>
                        <Link to={`/news`} className='text-sm hover:text-primary' onClick={() => onClickNews(article)}>
                          {article.title}
                        </Link>
                        <Separator className='my-2' />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='size-10 rounded-full p-1'>
                  <Avatar className='size-8 overflow-hidden rounded-full'>
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback className='rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'>
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56' align='end'>
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <Avatar className='h-8 w-8 overflow-hidden rounded-full'>
                      <AvatarImage src={user.profileImage} alt={user.name} />
                      <AvatarFallback className='rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white'>
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
                    <Link className='block w-full' to={"/profile"}>
                      <User className='mr-2' />
                      Profile
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
