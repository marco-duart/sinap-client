import { useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { stepService } from "../../services/steps.service";
import type { Step } from "../../types/entities";
import { ProcessingScreen } from "../../components/processing-screen";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as S from "./admin-styles";
import { FiTrash2, FiEdit2, FiPlus, FiX } from "react-icons/fi";

const stepSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  order: z.number().min(1, "Ordem é obrigatória"),
  pdcaPhase: z.enum(["PLAN", "DO", "CHECK", "ACT"]),
  isActionable: z.boolean().optional(),
});

type StepFormData = z.infer<typeof stepSchema>;

const PDCA_PHASES = [
  { value: "PLAN", label: "PLAN" },
  { value: "DO", label: "DO" },
  { value: "CHECK", label: "CHECK" },
  { value: "ACT", label: "ACT" },
];

export const AdminSteps = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Step | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<StepFormData>({
    resolver: zodResolver(stepSchema),
  });

  useEffect(() => {
    loadSteps();
  }, []);

  const loadSteps = async () => {
    try {
      setLoading(true);
      const data = await stepService.getAll();
      setSteps(data);
    } catch (error) {
      toast.error("Erro ao carregar etapas");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: StepFormData) => {
    try {
      setSubmitting(true);
      if (editing) {
        await stepService.update(editing.id, data);
        setSteps(steps.map((s) => (s.id === editing.id ? { ...s, ...data } : s)));
        toast.success("Etapa atualizada com sucesso");
      } else {
        const newStep = await stepService.create(data);
        setSteps([...steps, newStep]);
        toast.success("Etapa criada com sucesso");
      }
      setShowForm(false);
      setEditing(null);
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Erro ao salvar etapa");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (step: Step) => {
    setEditing(step);
    setValue("name", step.name);
    setValue("order", step.order);
    setValue("pdcaPhase", step.pdcaPhase);
    setValue("isActionable", step.isActionable);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza?")) return;

    try {
      await stepService.delete(id);
      setSteps(steps.filter((s) => s.id !== id));
      toast.success("Etapa deletada com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar etapa");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    reset();
  };

  if (loading) return <ProcessingScreen />;

  return (
    <Layout title="Gerenciar Etapas" subtitle="CRUD de etapas do projeto">
      <S.Container>
        {showForm && (
          <S.FormContainer>
            <S.FormHeader>
              <S.FormTitle>
                {editing ? "Editar Etapa" : "Nova Etapa"}
              </S.FormTitle>
              <S.CloseButton onClick={handleCancel} disabled={submitting}>
                <FiX />
              </S.CloseButton>
            </S.FormHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <S.FormGroup>
                <S.Label>Nome</S.Label>
                <S.Input placeholder="Nome da etapa" {...register("name")} />
                {errors.name && <S.ErrorText>{errors.name.message}</S.ErrorText>}
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>Ordem</S.Label>
                <S.Input
                  type="number"
                  {...register("order", { valueAsNumber: true })}
                />
                {errors.order && <S.ErrorText>{errors.order.message}</S.ErrorText>}
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>Fase PDCA</S.Label>
                <S.Select {...register("pdcaPhase")}>
                  {PDCA_PHASES.map((phase) => (
                    <option key={phase.value} value={phase.value}>
                      {phase.label}
                    </option>
                  ))}
                </S.Select>
                {errors.pdcaPhase && (
                  <S.ErrorText>{errors.pdcaPhase.message}</S.ErrorText>
                )}
              </S.FormGroup>

              <S.FormGroup>
                <S.CheckboxLabel>
                  <S.Checkbox {...register("isActionable")} type="checkbox" />
                  Acionável
                </S.CheckboxLabel>
              </S.FormGroup>

              <S.FormActions>
                <S.CancelButton onClick={handleCancel} disabled={submitting}>
                  Cancelar
                </S.CancelButton>
                <S.SubmitButton type="submit" disabled={submitting}>
                  {submitting ? "Salvando..." : editing ? "Atualizar" : "Criar"}
                </S.SubmitButton>
              </S.FormActions>
            </form>
          </S.FormContainer>
        )}

        <S.Header>
          <S.Title>Etapas ({steps.length})</S.Title>
          {!showForm && (
            <S.AddButton onClick={() => setShowForm(true)}>
              <FiPlus /> Nova Etapa
            </S.AddButton>
          )}
        </S.Header>

        <S.TableWrapper>
          <S.Table>
            <thead>
              <tr>
                <S.TableHeader>Nome</S.TableHeader>
                <S.TableHeader>Ordem</S.TableHeader>
                <S.TableHeader>Fase PDCA</S.TableHeader>
                <S.TableHeader>Acionável</S.TableHeader>
                <S.TableHeader>Ações</S.TableHeader>
              </tr>
            </thead>
            <tbody>
              {steps.map((step) => (
                <tr key={step.id}>
                  <S.TableCell>{step.name}</S.TableCell>
                  <S.TableCell>{step.order}</S.TableCell>
                  <S.TableCell>{step.pdcaPhase}</S.TableCell>
                  <S.TableCell>{step.isActionable ? "✓" : "-"}</S.TableCell>
                  <S.TableCell>
                    <S.ActionGroup>
                      <S.ActionButton className="edit" onClick={() => handleEdit(step)}>
                        <FiEdit2 />
                      </S.ActionButton>
                      <S.ActionButton
                        className="delete"
                        onClick={() => handleDelete(step.id)}
                      >
                        <FiTrash2 />
                      </S.ActionButton>
                    </S.ActionGroup>
                  </S.TableCell>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </S.TableWrapper>
      </S.Container>
    </Layout>
  );
};
