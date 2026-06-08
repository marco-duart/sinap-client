import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { projectService } from "../../services/projects.service";
import { stepService } from "../../services/steps.service";
import { priorityService } from "../../services/priorities.service";
import type { Step, Priority } from "../../types/entities";
import toast from "react-hot-toast";
import * as S from "./form-styles";
import { ProcessingScreen } from "../../components/processing-screen";

const projectSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  description: z.string().optional(),
  requestingDepartment: z.string().min(2, "Departamento obrigatório"),
  stepId: z.number(),
  priorityId: z.number(),
  urgencyScore: z.number().min(1).max(10),
  importanceScore: z.number().min(1).max(10),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  budget: z.number().optional(),
  businessValue: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export const ProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [steps, setSteps] = useState<Step[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [loading, setLoading] = useState(!!id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      urgencyScore: 5,
      importanceScore: 5,
    },
  });

  useEffect(() => {
    loadOptions();
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadOptions = async () => {
    try {
      const [stepsData, prioritiesData] = await Promise.all([
        stepService.getAll(),
        priorityService.getAll(),
      ]);
      setSteps(stepsData);
      setPriorities(prioritiesData);
    } catch (error) {
      toast.error("Erro ao carregar opções");
    }
  };

  const loadProject = async () => {
    try {
      if (!id) return;
      const project = await projectService.getById(Number(id));
      reset({
        title: project.title,
        description: project.description,
        requestingDepartment: project.requestingDepartment,
        stepId: project.stepId,
        priorityId: project.priorityId,
        urgencyScore: project.urgencyScore,
        importanceScore: project.importanceScore,
        budget: project.budget,
        businessValue: project.businessValue,
      });
    } catch (error) {
      toast.error("Erro ao carregar projeto");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);
      if (id) {
        await projectService.update(Number(id), data);
        toast.success("Projeto atualizado com sucesso");
      } else {
        await projectService.create(data);
        toast.success("Projeto criado com sucesso");
      }
      navigate("/projects");
    } catch (error) {
      toast.error("Erro ao salvar projeto");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <ProcessingScreen message="Carregando projeto..." />;
  }

  return (
    <Layout
      title={id ? "Editar Projeto" : "Criar Novo Projeto"}
      subtitle={id ? "Atualize os dados do projeto" : "Preencha os dados do novo projeto"}
    >
      <S.Container>
        <S.FormCard>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.FormRow>
              <S.FormGroup>
                <S.Label htmlFor="title">Título *</S.Label>
                <S.Input id="title" type="text" {...register("title")} />
                {errors.title && <S.Error>{errors.title.message}</S.Error>}
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="requestingDepartment">Departamento *</S.Label>
                <S.Input
                  id="requestingDepartment"
                  type="text"
                  {...register("requestingDepartment")}
                />
                {errors.requestingDepartment && (
                  <S.Error>{errors.requestingDepartment.message}</S.Error>
                )}
              </S.FormGroup>
            </S.FormRow>

            <S.FormGroup>
              <S.Label htmlFor="description">Descrição</S.Label>
              <S.TextArea id="description" {...register("description")} />
            </S.FormGroup>

            <S.FormRow>
              <S.FormGroup>
                <S.Label htmlFor="stepId">Etapa *</S.Label>
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
                <S.Label htmlFor="priorityId">Prioridade *</S.Label>
                <S.Select
                  id="priorityId"
                  {...register("priorityId", { valueAsNumber: true })}
                >
                  <option value="">Selecione uma prioridade</option>
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                      {priority.name}
                    </option>
                  ))}
                </S.Select>
              </S.FormGroup>
            </S.FormRow>

            <S.FormRow>
              <S.FormGroup>
                <S.Label htmlFor="urgencyScore">Urgência (1-10)</S.Label>
                <S.NumberInput
                  id="urgencyScore"
                  type="number"
                  min="1"
                  max="10"
                  {...register("urgencyScore", { valueAsNumber: true })}
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="importanceScore">Importância (1-10)</S.Label>
                <S.NumberInput
                  id="importanceScore"
                  type="number"
                  min="1"
                  max="10"
                  {...register("importanceScore", { valueAsNumber: true })}
                />
              </S.FormGroup>
            </S.FormRow>

            <S.FormRow>
              <S.FormGroup>
                <S.Label htmlFor="startDate">Data de Início</S.Label>
                <S.Input id="startDate" type="date" {...register("startDate")} />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="endDate">Data de Fim</S.Label>
                <S.Input id="endDate" type="date" {...register("endDate")} />
              </S.FormGroup>
            </S.FormRow>

            <S.FormRow>
              <S.FormGroup>
                <S.Label htmlFor="budget">Orçamento</S.Label>
                <S.Input id="budget" type="number" step="0.01" {...register("budget")} />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="businessValue">Valor de Negócio</S.Label>
                <S.TextArea id="businessValue" {...register("businessValue")} />
              </S.FormGroup>
            </S.FormRow>

            <S.ButtonGroup>
              <S.Button type="submit" disabled={isSubmitting} className="primary">
                {isSubmitting ? "Salvando..." : "Salvar Projeto"}
              </S.Button>
              <S.Button
                type="button"
                className="secondary"
                onClick={() => navigate("/projects")}
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
