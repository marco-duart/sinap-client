import { useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { priorityService } from "../../services/priorities.service";
import type { Priority } from "../../types/entities";
import { ProcessingScreen } from "../../components/processing-screen";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as S from "./admin-styles";
import { FiTrash2, FiEdit2, FiPlus, FiX } from "react-icons/fi";

const prioritySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  value: z.number().min(1, "Valor deve ser maior que 0"),
});

type PriorityFormData = z.infer<typeof prioritySchema>;

export const AdminPriorities = () => {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Priority | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PriorityFormData>({
    resolver: zodResolver(prioritySchema),
  });

  useEffect(() => {
    loadPriorities();
  }, []);

  const loadPriorities = async () => {
    try {
      setLoading(true);
      const data = await priorityService.getAll();
      setPriorities(data);
    } catch (error) {
      toast.error("Erro ao carregar prioridades");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: PriorityFormData) => {
    try {
      setSubmitting(true);
      if (editing) {
        await priorityService.update(editing.id, data);
        setPriorities(
          priorities.map((p) => (p.id === editing.id ? { ...p, ...data } : p))
        );
        toast.success("Prioridade atualizada com sucesso");
      } else {
        const newPriority = await priorityService.create(data);
        setPriorities([...priorities, newPriority]);
        toast.success("Prioridade criada com sucesso");
      }
      setShowForm(false);
      setEditing(null);
      reset();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Erro ao salvar prioridade"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (priority: Priority) => {
    setEditing(priority);
    setValue("name", priority.name);
    setValue("value", priority.value);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza?")) return;

    try {
      await priorityService.delete(id);
      setPriorities(priorities.filter((p) => p.id !== id));
      toast.success("Prioridade deletada com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar prioridade");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    reset();
  };

  if (loading) return <ProcessingScreen />;

  return (
    <Layout title="Gerenciar Prioridades" subtitle="CRUD de prioridades">
      <S.Container>
        {showForm && (
          <S.FormContainer>
            <S.FormHeader>
              <S.FormTitle>
                {editing ? "Editar Prioridade" : "Nova Prioridade"}
              </S.FormTitle>
              <S.CloseButton onClick={handleCancel} disabled={submitting}>
                <FiX />
              </S.CloseButton>
            </S.FormHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <S.FormGroup>
                <S.Label>Nome</S.Label>
                <S.Input
                  placeholder="Ex: Urgente, Alta, Média, Baixa"
                  {...register("name")}
                />
                {errors.name && <S.ErrorText>{errors.name.message}</S.ErrorText>}
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>Valor</S.Label>
                <S.Input
                  type="number"
                  placeholder="Ex: 1, 2, 3, 4"
                  {...register("value", { valueAsNumber: true })}
                />
                {errors.value && <S.ErrorText>{errors.value.message}</S.ErrorText>}
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
          <S.Title>Prioridades ({priorities.length})</S.Title>
          {!showForm && (
            <S.AddButton onClick={() => setShowForm(true)}>
              <FiPlus /> Nova Prioridade
            </S.AddButton>
          )}
        </S.Header>

        <S.TableWrapper>
          <S.Table>
            <thead>
              <tr>
                <S.TableHeader>Nome</S.TableHeader>
                <S.TableHeader>Valor</S.TableHeader>
                <S.TableHeader>Ações</S.TableHeader>
              </tr>
            </thead>
            <tbody>
              {priorities.map((priority) => (
                <tr key={priority.id}>
                  <S.TableCell>{priority.name}</S.TableCell>
                  <S.TableCell>{priority.value}</S.TableCell>
                  <S.TableCell>
                    <S.ActionGroup>
                      <S.ActionButton
                        className="edit"
                        onClick={() => handleEdit(priority)}
                      >
                        <FiEdit2 />
                      </S.ActionButton>
                      <S.ActionButton
                        className="delete"
                        onClick={() => handleDelete(priority.id)}
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
