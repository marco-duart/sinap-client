import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import * as S from "./styles";
import { useAuth } from "../../context/auth.context";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      // Erro já tratado no context
    }
  };

  return (
    <S.Container>
      <S.FormContainer>
        <S.Logo>🚀 SINAP</S.Logo>
        <S.Title>Faça Login</S.Title>
        <S.Description>Acesse o sistema de planejamento e acompanhamento</S.Description>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.FormGroup>
            <S.Label htmlFor="email">Email</S.Label>
            <S.Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
            />
            {errors.email && <S.Error>{errors.email.message}</S.Error>}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="password">Senha</S.Label>
            <S.Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && <S.Error>{errors.password.message}</S.Error>}
          </S.FormGroup>

          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Carregando..." : "Entrar"}
          </S.SubmitButton>
        </S.Form>

        <S.Divider>ou</S.Divider>

        <S.RegisterLink>
          Não tem conta? <Link to="/register">Crie uma agora</Link>
        </S.RegisterLink>
      </S.FormContainer>
    </S.Container>
  );
};
