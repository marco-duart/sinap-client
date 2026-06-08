import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import * as S from "./styles";
import { useAuth } from "../../context/auth.context";

const registerSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não correspondem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        passwordDigest: data.password,
        roleLevel: 20, // Assistente por padrão
      });
      navigate("/login");
    } catch (error) {
      // Erro já tratado no context
    }
  };

  return (
    <S.Container>
      <S.FormContainer>
        <S.Logo>🚀 SINAP</S.Logo>
        <S.Title>Criar Conta</S.Title>
        <S.Description>Junte-se ao sistema de planejamento</S.Description>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.FormGroup>
            <S.Label htmlFor="name">Nome Completo</S.Label>
            <S.Input
              id="name"
              type="text"
              placeholder="Seu nome"
              {...register("name")}
            />
            {errors.name && <S.Error>{errors.name.message}</S.Error>}
          </S.FormGroup>

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

          <S.FormGroup>
            <S.Label htmlFor="confirmPassword">Confirmar Senha</S.Label>
            <S.Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <S.Error>{errors.confirmPassword.message}</S.Error>
            )}
          </S.FormGroup>

          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </S.SubmitButton>
        </S.Form>

        <S.Divider>ou</S.Divider>

        <S.RegisterLink>
          Já tem conta? <Link to="/login">Faça login</Link>
        </S.RegisterLink>
      </S.FormContainer>
    </S.Container>
  );
};
