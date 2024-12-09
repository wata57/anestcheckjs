import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login as loginApi,
  loginWithGoogle,
  resetPassword as resetPasswordApi,
  sendResetPasswordEmail as sendResetPasswordEmailApi,
} from "./apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Login feito com sucesso. Aguarde!");
    },
    onError: () => toast.error("Usuário e/ou senha inválidos"),
  });

  return { login, isPending };
}

export function useLoginWithGoogle() {
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: () => loginWithGoogle(),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => toast("Acesso não autorizado"),
  });

  return { login, isPending };
}

export function useSendResetPasswordEmail() {
  const { mutate: sendResetPasswordEmail, isPending } = useMutation({
    mutationFn: (email) => sendResetPasswordEmailApi(email),
    onSuccess: () => {
      toast.success("Email de redefinição enviado.");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Houve um erro no envio do email de redefinição.");
    },
  });

  return { sendResetPasswordEmail, isPending };
}

export function useResetPassword() {
  const navigate = useNavigate();

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: (new_password) => resetPasswordApi(new_password),
    onSuccess: () => {
      toast.success("Senha redefinida com sucesso.");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Houve um erro na redefinição de senha.");
    },
  });

  return { changePassword, isPending };
}
