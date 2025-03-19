import { Link } from "react-router";
import logo from "/fav-icon.png";

const AuthLayout = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => {
  return (
    <div className='relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <Link to={"/"} className='relative z-20 flex items-center text-lg font-medium'>
          <img src={logo} alt='Logo Brita' className='w-12 h-12' />
        </Link>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>&ldquo; Wise people learn when they can; fools learn when they must. &rdquo;</p>
            <footer className='text-sm text-neutral-300'>Arthur Wellesley</footer>
          </blockquote>
        </div>
      </div>
      <div className='w-full lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <Link to={"/"} className='relative z-20 flex items-center justify-center lg:hidden'>
            <img src={logo} alt='Logo Brita' className='w-12 h-12' />
          </Link>
          <div className='flex flex-col items-start gap-2 text-left sm:items-center sm:text-center'>
            <h1 className='text-xl font-medium'>{title}</h1>
            <p className='text-muted-foreground text-sm text-balance'>{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
