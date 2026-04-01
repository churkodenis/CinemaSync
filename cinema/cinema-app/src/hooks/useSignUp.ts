import { useSignUpMutation } from "@/store/api/authApi";
import { useToast } from "./use-toast";
import { SignUpCredentials } from "@/types";
import { useAppDispatch } from "./useRedux";
import { authenticate } from "@/store/features/userSlice";

const useSignUp = () => {
  const [signUp, options] = useSignUpMutation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleSignUp = async (credentials: SignUpCredentials) => {
    const { error, data: userDetails } = await signUp(credentials);

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
      title: "Congratulations!",
      description: "You have successfully signed up",
    });
  };

  return [handleSignUp, options] as const;
};

export default useSignUp;
