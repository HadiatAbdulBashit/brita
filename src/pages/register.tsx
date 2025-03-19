import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { toast } from "sonner";

import { LoaderCircle } from "lucide-react";

import InputError from "@/components/ui/input-error";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);

    // Simulate API call
    const timer = setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const isEmailExist = existingUsers.some((user: { email: string }) => user.email === data.email);
      if (isEmailExist) {
        toast.error("Email is already registered. Please use another email.");
        setIsLoading(false);
        return;
      }

      const newUser = { id: uuidv4(), name: data.name, email: data.email, password: data.password };
      existingUsers.push(newUser);

      localStorage.setItem("users", JSON.stringify(existingUsers));

      toast.success("Registration successful!");
      setIsLoading(false);
      reset();
      navigate("/login");
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <PageTitle title='Register' />
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
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters with one uppercase letter, one lowercase letter, one digit, and one special character",
                },
              })}
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
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters with one uppercase letter, one lowercase letter, one digit, and one special character",
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
    </>
  );
};

export default Register;
