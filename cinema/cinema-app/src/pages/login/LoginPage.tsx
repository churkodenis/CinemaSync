import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSignIn from "@/hooks/useSignIn";
import {
  SignInCredentialsValiador,
  TSignInCredentialsValiador,
} from "@/lib/validationScemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import AuthBanner from "@/assets/auth_banner.png";
import { useAppSelector } from "@/hooks/useRedux";

const LoginPage = () => {
  const [handleSignIn, { isLoading }] = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInCredentialsValiador>({
    resolver: zodResolver(SignInCredentialsValiador),
  });
  const { user } = useAppSelector((state) => state.user);

  if (user) {
    return <Navigate to="/" />;
  }

  const onSubmit = async ({ email, password }: TSignInCredentialsValiador) => {
    await handleSignIn({ email, password });
  };

  return (
    <div className="flex items-center justify-between h-screen">
      <img src={AuthBanner} alt="auth banner" className="max-w-[500px]" />
      <div className="w-[500px] h-full flex flex-col justify-center gap-5">
        <h1 className="text-center text-4xl font-bold">Увійти</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input type="text" placeholder="ПІБ" {...register("email")} />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Пароль"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isLoading} size="lg">
            Увійти
          </Button>
        </form>

        <p className="text-center">
          Ще не маєте акаунту?{" "}
          <Link to="/register" className="text-primary">
            Зареєструватись
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
