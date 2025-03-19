import { Link, redirect, useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";

import { LoaderCircle } from "lucide-react";

import InputError from "@/components/ui/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Simulate API call
    setIsLoading(true);
    const timer = setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const isEmailExist = existingUsers.some((user: { email: string }) => user.email === data.email);
      if (isEmailExist) {
        toast.error("Email is already registered. Please use another email.");
        setIsLoading(false);
        return;
      }

      const newUser = { name: data.name, email: data.email, password: data.password };
      existingUsers.push(newUser);

      localStorage.setItem("users", JSON.stringify(existingUsers));

      toast.success("Registration successful!");
      setIsLoading(false);
      navigate("/login");
    }, 2000);
    console.log(data);
    return () => clearTimeout(timer);
  };

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid gap-6'>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Name</Label>
          <Input
            id='name'
            type='text'
            autoFocus
            tabIndex={1}
            placeholder='John Doe'
            {...register("name", { required: "Name is required" })}
            disabled={isLoading}
            autoComplete='name'
          />
          <InputError message={errors.name?.message} />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email address</Label>
          <Input
            id='email'
            type='email'
            tabIndex={2}
            placeholder='email@example.com'
            {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
            disabled={isLoading}
            autoComplete='email'
          />
          <InputError message={errors.email?.message} />
        </div>

        <div className='grid gap-2'>
          <div className='flex items-center'>
            <Label htmlFor='password'>Password</Label>
          </div>
          <Input
            id='password'
            type='password'
            tabIndex={3}
            {...register("password", { required: "Password is required" })}
            placeholder='Password'
            disabled={isLoading}
            autoComplete='password'
          />
          <InputError message={errors.password?.message} />
        </div>
        <div className='grid gap-2'>
          <div className='flex items-center'>
            <Label htmlFor='confirmPassword'>Password</Label>
          </div>
          <Input
            id='confirmPassword'
            type='password'
            tabIndex={4}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Your passwords do no match";
                }
              },
            })}
            placeholder='Password'
            disabled={isLoading}
            autoComplete='confirm-password'
          />
          <InputError message={errors.confirmPassword?.message} />
        </div>

        <Button type='submit' className='mt-4 w-full' tabIndex={5} disabled={isLoading}>
          {isLoading && <LoaderCircle className='h-4 w-4 animate-spin' />}
          Create account
        </Button>
      </div>

      <div className='text-muted-foreground text-center text-sm'>
        Already have an account?{" "}
        <Link to={"/login"} tabIndex={5} className='hover:underline'>
          Log in
        </Link>
      </div>
    </form>
  );
};

export default Register;
