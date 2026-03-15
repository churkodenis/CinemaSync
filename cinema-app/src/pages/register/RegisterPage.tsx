import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSignUp from "@/hooks/useSignUp";
import {
  SignUpCredentialsValiador,
  TSignUpCredentialsValiador,
} from "@/lib/validationScemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthBanner from "@/assets/auth_banner.png";
import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useRedux";

const RegisterPage = () => {
  const [handleSignUp, { isLoading }] = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUpCredentialsValiador>({
    resolver: zodResolver(SignUpCredentialsValiador),
  });

  const { user } = useAppSelector((state) => state.user);

  if (user) {
    return <Navigate to="/" />;
  }

  const onSubmit = async ({
    username,
    password,
    email,
  }: TSignUpCredentialsValiador) => {
    await handleSignUp({ username, password, email });
  };

  return (
    <div className="flex items-center justify-between h-screen">
      <img src={AuthBanner} alt="auth banner" className="max-w-[500px]" />
      <div className="w-[500px] h-full flex flex-col justify-center gap-5">
        <h1 className="text-center text-4xl font-bold">Зареєеструватись</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Input type="text" placeholder="ПІБ" {...register("username")} />
            {errors.username && (
              <p className="text-red-500 text-sm ml-2">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm ml-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Input
              type="password"
              placeholder="Пароль"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm ml-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" size="lg" disabled={isLoading}>
            Зареєструватись
          </Button>
        </form>
        <p className="text-center">
          Вже маєте аккаунт?{" "}
          <Link to="/login" className="text-primary">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
