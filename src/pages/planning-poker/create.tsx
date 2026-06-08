import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";
import { planningPokerService } from "../../services/planning-poker.service";
import toast from "react-hot-toast";
import * as S from "./planning-styles";

const sessionSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().optional(),
  projectId: z.number(),
});

type SessionFormData = z.infer<typeof sessionSchema>;

export const PlanningPokerCreate = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
  });

  const onSubmit = async (data: SessionFormData) => {
    try {
      setIsSubmitting(true);
      const session = await planningPokerService.createSession(data.projectId);
      toast.success("Sessão de Planning Poker criada");
      navigate(`/planning-poker/${session.id}`);
    } catch (error) {
      toast.error("Erro ao criar sessão");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="Criar Sessão de Planning Poker"
      subtitle="Crie uma nova sessão de estimativa em equipe"
    >
      <S.Container>
        <S.FormCard>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.FormGroup>
              <S.Label htmlFor="title">Título da Sessão *</S.Label>
              <S.Input id="title" type="text" {...register("title")} />
              {errors.title && <S.Error>{errors.title.message}</S.Error>}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="description">Descrição</S.Label>
              <S.TextArea id="description" {...register("description")} />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="projectId">Projeto *</S.Label>
              <S.Input
                id="projectId"
                type="number"
                {...register("projectId", { valueAsNumber: true })}
              />
            </S.FormGroup>

            <S.ButtonGroup>
              <S.Button type="submit" disabled={isSubmitting} className="primary">
                {isSubmitting ? "Criando..." : "Criar Sessão"}
              </S.Button>
              <S.Button
                type="button"
                className="secondary"
                onClick={() => navigate("/dashboard")}
              >
                Cancelar
              </S.Button>
            </S.ButtonGroup>
          </S.Form>
        </S.FormCard>
      </S.Container>
    </Layout>
  );
};
