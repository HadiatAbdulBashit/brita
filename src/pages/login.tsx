import { Link } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";

import { LoaderCircle } from "lucide-react";

import InputError from "@/components/ui/input-error";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      remember: false,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Simulate API call
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    console.log(data);
    return () => clearTimeout(timer);
  };

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid gap-6'>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email address</Label>
          <Input
            id='email'
            type='email'
            autoFocus
            tabIndex={1}
            placeholder='email@example.com'
            {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
            disabled={isLoading}
            autoComplete=''
          />
          <InputError message={errors.email?.message} />
        </div>

        <div className='grid gap-2'>
          <div className='flex items-center'>
            <Label htmlFor='password'>Password</Label>
            <Link to={"/reset-password"} className='ml-auto text-sm' tabIndex={5}>
              Forgot password?
            </Link>
          </div>
          <Input
            id='password'
            type='password'
            tabIndex={2}
            autoComplete='current-password'
            {...register("password", { required: "Password is required" })}
            placeholder='Password'
            disabled={isLoading}
          />
          <InputError message={errors.password?.message} />
        </div>

        <div className='flex items-center space-x-3'>
          <Checkbox id='remember' {...register("remember")} tabIndex={3} disabled={isLoading} />
          <Label htmlFor='remember'>Remember me</Label>
        </div>

        <Button type='submit' className='mt-4 w-full' tabIndex={4} disabled={isLoading}>
          {isLoading && <LoaderCircle className='h-4 w-4 animate-spin' />}
          Log in
        </Button>
      </div>

      <div className='text-muted-foreground text-center text-sm'>
        Don't have an account?{" "}
        <Link to={"/register"} tabIndex={5} className='hover:underline'>
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default Login;
