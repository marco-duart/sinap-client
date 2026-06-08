import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { raciService } from "../../services/raci.service";
import { userService } from "../../services/users.service";
import type { User } from "../../types/auth";
import type { ProjectRaci } from "../../types/entities";
import * as S from "./styles";
import { FiX } from "react-icons/fi";

interface RaciFormProps {
  projectId: string;
  onSuccess: (assignment: ProjectRaci) => void;
  onCancel: () => void;
}

const raciSchema = z.object({
  userId: z.string().min(1, "Usuário é obrigatório"),
  raciRole: z.enum(["R", "A", "C", "I"], {
    errorMap: () => ({ message: "Papel RACI é obrigatório" }),
  }),
});

type RaciFormData = z.infer<typeof raciSchema>;

const RACI_DEFINITIONS = {
  R: "Responsible - Responsável pela execução",
  A: "Accountable - Responsável pelos resultados",
  C: "Consulted - Consultado durante o processo",
  I: "Informed - Informado após decisões",
};

export const RaciForm = ({ projectId, onSuccess, onCancel }: RaciFormProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RaciFormData>({
    resolver: zodResolver(raciSchema),
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      toast.error("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: RaciFormData) => {
    try {
      setSubmitting(true);
      const assignments = await raciService.assign(Number(projectId), [
        {
          userId: parseInt(data.userId),
          raciRole: data.raciRole,
        },
      ]);
      if (assignments && assignments.length > 0) {
        onSuccess(assignments[0]);
      }
      reset();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Erro ao criar atribuição");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <S.ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <S.ModalTitle>Nova Atribuição RACI</S.ModalTitle>
          <S.CloseButton onClick={onCancel} disabled={submitting}>
            <FiX />
          </S.CloseButton>
        </S.ModalHeader>

        <S.FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.FormGroup>
              <S.Label>Usuário</S.Label>
              <S.Select {...register("userId")} disabled={loading || submitting}>
                <option value="">Selecione um usuário</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.roleName})
                  </option>
                ))}
              </S.Select>
              {errors.userId && <S.ErrorText>{errors.userId.message}</S.ErrorText>}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Papel RACI</S.Label>
              <S.RoleContainer>
                {(Object.entries(RACI_DEFINITIONS) as Array<[keyof typeof RACI_DEFINITIONS, string]>).map(
                  ([role, definition]) => (
                    <S.RoleOption key={role}>
                      <S.RoleRadio
                        type="radio"
                        value={role}
                        {...register("raciRole")}
                        id={`role-${role}`}
                      />
                      <S.RoleLabel htmlFor={`role-${role}`}>
                        <S.RoleTitle>{role}</S.RoleTitle>
                        <S.RoleDefinition>{definition}</S.RoleDefinition>
                      </S.RoleLabel>
                    </S.RoleOption>
                  )
                )}
              </S.RoleContainer>
              {errors.raciRole && <S.ErrorText>{errors.raciRole.message}</S.ErrorText>}
            </S.FormGroup>

            <S.FormActions>
              <S.CancelButton onClick={onCancel} disabled={submitting}>
                Cancelar
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={submitting || loading}>
                {submitting ? "Criando..." : "Criar Atribuição"}
              </S.SubmitButton>
            </S.FormActions>
          </form>
        </S.FormWrapper>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
