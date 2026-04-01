import {
  SignInCredentials,
  SignInResponse,
  SignUpCredentials,
  SignUpResponse,
} from "@/types";
import { appApi } from "./appApi";

export const authApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<SignInResponse, SignInCredentials>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: build.mutation<SignUpResponse, SignUpCredentials>({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
