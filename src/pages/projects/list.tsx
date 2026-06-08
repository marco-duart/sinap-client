import { useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { projectService } from "../../services/projects.service";
import type { Project } from "../../types/entities";
import { ProcessingScreen } from "../../components/processing-screen";
import toast from "react-hot-toast";
import * as S from "./styles";
import { FiPlus, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      toast.error("Erro ao carregar projetos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este projeto?")) {
      try {
        await projectService.delete(id);
        setProjects(projects.filter((p) => p.id !== id));
        toast.success("Projeto deletado com sucesso");
      } catch (error) {
        toast.error("Erro ao deletar projeto");
      }
    }
  };

  if (loading) {
    return <ProcessingScreen message="Carregando projetos..." />;
  }

  return (
    <Layout title="Gerenciamento de Projetos" subtitle="Visualize e gerencie todos os seus projetos">
      <S.Container>
        <S.ActionBar>
          <S.Button
            onClick={() => navigate("/projects/create")}
            className="primary"
          >
            <FiPlus size={20} /> Novo Projeto
          </S.Button>
        </S.ActionBar>

        {projects.length === 0 ? (
          <S.EmptyState>
            <p>Nenhum projeto encontrado</p>
            <S.Button onClick={() => navigate("/projects/create")}>
              Criar primeiro projeto
            </S.Button>
          </S.EmptyState>
        ) : (
          <S.ProjectsGrid>
            {projects.map((project) => (
              <S.ProjectCard key={project.id}>
                <S.ProjectHeader>
                  <S.ProjectTitle>{project.title}</S.ProjectTitle>
                  <S.ProjectPriority priority={project.priority?.name as any}>
                    {project.priority?.name || "Sem prioridade"}
                  </S.ProjectPriority>
                </S.ProjectHeader>

                <S.ProjectDescription>
                  {project.description || "Sem descrição"}
                </S.ProjectDescription>

                <S.ProjectMeta>
                  <span>📌 {project.requestingDepartment}</span>
                  <span>📊 {project.step?.name}</span>
                </S.ProjectMeta>

                <S.ProjectActions>
                  <S.ActionButton
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="view"
                    title="Visualizar"
                  >
                    <FiEye size={18} />
                  </S.ActionButton>
                  <S.ActionButton
                    onClick={() => navigate(`/projects/${project.id}/edit`)}
                    className="edit"
                    title="Editar"
                  >
                    <FiEdit2 size={18} />
                  </S.ActionButton>
                  <S.ActionButton
                    onClick={() => handleDelete(project.id)}
                    className="delete"
                    title="Deletar"
                  >
                    <FiTrash2 size={18} />
                  </S.ActionButton>
                </S.ProjectActions>
              </S.ProjectCard>
            ))}
          </S.ProjectsGrid>
        )}
      </S.Container>
    </Layout>
  );
};
