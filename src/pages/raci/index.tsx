import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout";
import { raciService } from "../../services/raci.service";
import type { ProjectRaci } from "../../types/entities";
import { ProcessingScreen } from "../../components/processing-screen";
import toast from "react-hot-toast";
import * as S from "./styles";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { RaciForm } from "./form";

export const RaciMatrix = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [assignments, setAssignments] = useState<ProjectRaci[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadAssignments();
    }
  }, [projectId]);

  const loadAssignments = async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const data = await raciService.getByProject(Number(projectId));
      setAssignments(data);
    } catch (error) {
      toast.error("Erro ao carregar matriz RACI");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssignment = async (assignmentId: number) => {
    if (!confirm("Deseja deletar esta atribuição?")) return;

    try {
      await raciService.delete(assignmentId);
      setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
      toast.success("Atribuição deletada com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar atribuição");
    }
  };

  const handleAssignmentCreated = (newAssignment: ProjectRaci) => {
    setAssignments((prev) => [...prev, newAssignment]);
    setShowForm(false);
    toast.success("Atribuição criada com sucesso");
  };

  if (loading) return <ProcessingScreen />;

  // Group by user
  const userMap: Record<number, { name: string; assignments: ProjectRaci[] }> = {};
  assignments.forEach((a) => {
    if (!userMap[a.userId]) {
      userMap[a.userId] = { name: a.user?.name || `Usuário ${a.userId}`, assignments: [] };
    }
    userMap[a.userId].assignments.push(a);
  });

  const raciRoles = ["R", "A", "C", "I"];

  return (
    <Layout title="Matriz RACI" subtitle="Gerenciar responsabilidades e papéis">
      {showForm && projectId && (
        <RaciForm 
          projectId={projectId} 
          onSuccess={handleAssignmentCreated}
          onCancel={() => setShowForm(false)}
        />
      )}

      <S.Container>
        <S.Header>
          <S.Title>Atribuições RACI</S.Title>
          <S.AddButton onClick={() => setShowForm(true)}>
            <FiPlus /> Nova Atribuição
          </S.AddButton>
        </S.Header>

        {Object.keys(userMap).length === 0 ? (
          <S.EmptyState>
            <p>Nenhuma atribuição RACI definida para este projeto</p>
            <S.AddButton onClick={() => setShowForm(true)}>
              <FiPlus /> Criar primeira atribuição
            </S.AddButton>
          </S.EmptyState>
        ) : (
          <S.MatrixWrapper>
            <S.MatrixTable>
              <thead>
                <tr>
                  <S.MatrixHeader>Usuário</S.MatrixHeader>
                  {raciRoles.map((role) => (
                    <S.MatrixHeader key={role}>{role}</S.MatrixHeader>
                  ))}
                  <S.MatrixHeader>Ações</S.MatrixHeader>
                </tr>
              </thead>
              <tbody>
                {Object.entries(userMap).map(([_, userData]) => {
                  const roleMap = userData.assignments.reduce(
                    (acc, a) => {
                      acc[a.raciRole] = a;
                      return acc;
                    },
                    {} as Record<string, ProjectRaci>
                  );

                  return (
                    <tr key={userData.name}>
                      <S.MatrixCell bold>{userData.name}</S.MatrixCell>
                      {raciRoles.map((role) => (
                        <S.MatrixCell key={role} center>
                          {roleMap[role] ? (
                            <S.RoleBadge role={role as any}>{role}</S.RoleBadge>
                          ) : (
                            "-"
                          )}
                        </S.MatrixCell>
                      ))}
                      <S.MatrixCell center>
                        <S.ActionButton
                          onClick={() => {
                            const toDelete = userData.assignments.filter(
                              (a) => roleMap[a.raciRole]
                            );
                            if (toDelete.length > 0) {
                              handleDeleteAssignment(toDelete[0].id);
                            }
                          }}
                          title="Deletar"
                        >
                          <FiTrash2 />
                        </S.ActionButton>
                      </S.MatrixCell>
                    </tr>
                  );
                })}
              </tbody>
            </S.MatrixTable>
          </S.MatrixWrapper>
        )}
      </S.Container>
    </Layout>
  );
};
