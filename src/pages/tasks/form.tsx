import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { taskService } from "../../services/tasks.service";
import { stepService } from "../../services/steps.service";
import type { Step } from "../../types/entities";
import toast from "react-hot-toast";
import * as S from "./form-styles";
import { ProcessingScreen } from "../../components/processing-screen";

const taskSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().optional(),
  projectId: z.number(),
  stepId: z.number().optional(),
  estimatedEffort: z.number().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
});

type TaskFormData = z.infer<typeof taskSchema>;

export const TaskForm = () => {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const navigate = useNavigate();
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(!!taskId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      projectId: projectId ? Number(projectId) : undefined,
      status: "TODO",
    },
  });

  useEffect(() => {
    loadSteps();
    if (taskId) {
      loadTask();
    }
  }, [taskId]);

  const loadSteps = async () => {
    try {
      const stepsData = await stepService.getAll();
      setSteps(stepsData);
    } catch (error) {
      toast.error("Erro ao carregar etapas");
    }
  };

  const loadTask = async () => {
    try {
      if (!taskId) return;
      const task = await taskService.getById(Number(taskId));
      reset({
        title: task.title,
        description: task.description,
        projectId: task.projectId,
        stepId: task.stepId,
        estimatedEffort: task.estimatedEffort,
        status: task.status as "TODO" | "IN_PROGRESS" | "DONE",
      });
    } catch (error) {
      toast.error("Erro ao carregar task");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: TaskFormData) => {
    try {
      setIsSubmitting(true);
      if (taskId) {
        await taskService.update(Number(taskId), data);
        toast.success("Task atualizada com sucesso");
      } else {
        await taskService.create(data);
        toast.success("Task criada com sucesso");
      }
      navigate(projectId ? `/projects/${projectId}` : "/dashboard");
    } catch (error) {
      toast.error("Erro ao salvar task");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <ProcessingScreen message="Carregando task..." />;
  }

  return (
    <Layout
      title={taskId ? "Editar Task" : "Criar Nova Task"}
      subtitle={taskId ? "Atualize os dados da task" : "Preencha os dados da nova task"}
    >
      <S.Container>
        <S.FormCard>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.FormGroup>
              <S.Label htmlFor="title">Título *</S.Label>
              <S.Input id="title" type="text" {...register("title")} />
              {errors.title && <S.Error>{errors.title.message}</S.Error>}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="description">Descrição</S.Label>
              <S.TextArea id="description" {...register("description")} />
            </S.FormGroup>

            <S.FormRow>
              <S.FormGroup>
                <S.Label htmlFor="stepId">Etapa</S.Label>
                <S.Select id="stepId" {...register("stepId", { valueAsNumber: true })}>
                  <option value="">Selecione uma etapa</option>
                  {steps.map((step) => (
                    <option key={step.id} value={step.id}>
                      {step.name}
                    </option>
                  ))}
                </S.Select>
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="status">Status *</S.Label>
                <S.Select id="status" {...register("status")}>
                  <option value="TODO">A Fazer</option>
                  <option value="IN_PROGRESS">Em Progresso</option>
                  <option value="DONE">Concluído</option>
                </S.Select>
              </S.FormGroup>
            </S.FormRow>

            <S.FormGroup>
              <S.Label htmlFor="estimatedEffort">Esforço Estimado (pontos)</S.Label>
              <S.Input
                id="estimatedEffort"
                type="number"
                step="0.5"
                {...register("estimatedEffort")}
              />
            </S.FormGroup>

            <S.ButtonGroup>
              <S.Button type="submit" disabled={isSubmitting} className="primary">
                {isSubmitting ? "Salvando..." : "Salvar Task"}
              </S.Button>
              <S.Button
                type="button"
                className="secondary"
                onClick={() =>
                  navigate(projectId ? `/projects/${projectId}` : "/dashboard")
                }
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
