import { useDispatch } from "react-redux";
import { useToast } from "./use-toast";
import { SignInCredentials } from "@/types";
import { authenticate } from "@/store/features/userSlice";
import { useSignInMutation } from "@/store/api/authApi";

const useSignIn = () => {
  const [signIn, options] = useSignInMutation();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleSignIn = async (credentials: SignInCredentials) => {
    const { data: userDetails, error } = await signIn(credentials);

    if (error) {
      toast({
        title: "Failed to sign up",
        description: "something went wrong",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      authenticate({
        token: userDetails?.token,
        user: userDetails?.user,
      })
    );

    toast({
      title: "Welcome!",
      description: "You have successfully signed in",
    });
  };

  return [handleSignIn, options] as const;
};

export default useSignIn;
