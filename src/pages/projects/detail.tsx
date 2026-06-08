import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";
import { projectService } from "../../services/projects.service";
import { taskService } from "../../services/tasks.service";
import { raciService } from "../../services/raci.service";
import { artifactService } from "../../services/artifacts.service";
import type { Project, Task, ProjectRaci, Artifact } from "../../types/entities";
import { ProcessingScreen } from "../../components/processing-screen";
import toast from "react-hot-toast";
import * as S from "./detail-styles";
import { FiEdit2, FiTrash2, FiPlus, FiArrowLeft, FiDownload } from "react-icons/fi";

type TabType = "general" | "tasks" | "artifacts" | "raci" | "metrics";

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [raciAssignments, setRaciAssignments] = useState<ProjectRaci[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("general");

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      if (!id) return;
      const projectData = await projectService.getById(Number(id));
      setProject(projectData);
      await Promise.all([loadTasks(), loadRaci(), loadArtifacts()]);
    } catch (error) {
      toast.error("Erro ao carregar projeto");
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      if (!id) return;
      const tasksData = await taskService.getByProject(Number(id));
      setTasks(tasksData);
    } catch (error) {
      toast.error("Erro ao carregar tasks");
    }
  };

  const loadRaci = async () => {
    try {
      if (!id) return;
      const raciData = await raciService.getByProject(Number(id));
      setRaciAssignments(raciData);
    } catch (error) {
      // RACI pode não estar implementado no backend ainda
    }
  };

  const loadArtifacts = async () => {
    try {
      if (!id) return;
      const artifactsData = await artifactService.getByProject(Number(id));
      setArtifacts(artifactsData);
    } catch (error) {
      // Artifacts podem não estar implementados
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (confirm("Deletar esta task?")) {
      try {
        await taskService.delete(taskId);
        setTasks(tasks.filter((t) => t.id !== taskId));
        toast.success("Task deletada");
      } catch (error) {
        toast.error("Erro ao deletar task");
      }
    }
  };

  if (loading || !project) {
    return <ProcessingScreen message="Carregando projeto..." />;
  }

  const getArtifactIcon = (type: string): string => {
    const icons: Record<string, string> = {
      DOCUMENTO: "📄",
      IMAGEM: "🖼️",
      VÍDEO: "🎬",
      ÁUDIO: "🔊",
      OUTRO: "📦",
    };
    return icons[type] || "📎";
  };

  return (
    <Layout title={project.title} subtitle={project.description}>
      <S.Container>
        <S.Header>
          <S.BackButton onClick={() => navigate("/projects")}>
            <FiArrowLeft size={20} /> Voltar
          </S.BackButton>
          <S.HeaderActions>
            <S.ActionButton
              onClick={() => navigate(`/projects/${id}/edit`)}
              className="edit"
            >
              <FiEdit2 size={18} /> Editar
            </S.ActionButton>
          </S.HeaderActions>
        </S.Header>

        <S.TabsContainer>
          <S.TabsBar>
            <S.Tab
              active={activeTab === "general"}
              onClick={() => setActiveTab("general")}
            >
              📋 Geral
            </S.Tab>
            <S.Tab
              active={activeTab === "tasks"}
              onClick={() => setActiveTab("tasks")}
            >
              ✅ Tasks ({tasks.length})
            </S.Tab>
            <S.Tab
              active={activeTab === "artifacts"}
              onClick={() => setActiveTab("artifacts")}
            >
              📎 Artifacts
            </S.Tab>
            <S.Tab
              active={activeTab === "raci"}
              onClick={() => setActiveTab("raci")}
            >
              👥 RACI
            </S.Tab>
            <S.Tab
              active={activeTab === "metrics"}
              onClick={() => setActiveTab("metrics")}
            >
              📊 Métricas
            </S.Tab>
          </S.TabsBar>

          <S.TabContent>
            {activeTab === "general" && (
              <S.GeneralInfo>
                <S.InfoRow>
                  <S.InfoLabel>Departamento</S.InfoLabel>
                  <S.InfoValue>{project.requestingDepartment}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>Etapa</S.InfoLabel>
                  <S.InfoValue>{project.step?.name}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>Prioridade</S.InfoLabel>
                  <S.PriorityBadge priority={project.priority?.name as any}>
                    {project.priority?.name}
                  </S.PriorityBadge>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>Urgência</S.InfoLabel>
                  <S.ScoreBar>{project.urgencyScore}/10</S.ScoreBar>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>Importância</S.InfoLabel>
                  <S.ScoreBar>{project.importanceScore}/10</S.ScoreBar>
                </S.InfoRow>
                {project.businessValue && (
                  <S.InfoRow>
                    <S.InfoLabel>Valor de Negócio</S.InfoLabel>
                    <S.InfoValue>{project.businessValue}</S.InfoValue>
                  </S.InfoRow>
                )}
                {project.budget && (
                  <S.InfoRow>
                    <S.InfoLabel>Orçamento</S.InfoLabel>
                    <S.InfoValue>R$ {project.budget.toLocaleString()}</S.InfoValue>
                  </S.InfoRow>
                )}
              </S.GeneralInfo>
            )}

            {activeTab === "tasks" && (
              <S.TasksContainer>
                <S.TasksHeader>
                  <h3>Tasks do Projeto</h3>
                  <S.Button
                    className="primary"
                    onClick={() => navigate(`/projects/${id}/tasks/create`)}
                  >
                    <FiPlus size={18} /> Nova Task
                  </S.Button>
                </S.TasksHeader>

                {tasks.length === 0 ? (
                  <S.EmptyMessage>Nenhuma task cadastrada</S.EmptyMessage>
                ) : (
                  <S.TasksList>
                    {tasks.map((task) => (
                      <S.TaskItem key={task.id}>
                        <S.TaskInfo>
                          <S.TaskTitle>{task.title}</S.TaskTitle>
                          <S.TaskMeta>
                            Status: <S.StatusBadge status={task.status}>{task.status}</S.StatusBadge>
                          </S.TaskMeta>
                        </S.TaskInfo>
                        <S.TaskActions>
                          <S.DetailActionButton className="edit">
                            <FiEdit2 size={16} />
                          </S.DetailActionButton>
                          <S.DetailActionButton
                            className="delete"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <FiTrash2 size={16} />
                          </S.DetailActionButton>
                        </S.TaskActions>
                      </S.TaskItem>
                    ))}
                  </S.TasksList>
                )}
              </S.TasksContainer>
            )}

            {activeTab === "artifacts" && (
              <S.ArtifactsContainer>
                {artifacts.length === 0 ? (
                  <S.EmptyMessage>
                    Nenhum artefato enviado. 
                    <S.Button 
                      className="primary" 
                      onClick={() => navigate(`/projects/${id}/artifacts`)}
                      style={{ marginTop: '1rem' }}
                    >
                      <FiPlus size={18} /> Gerenciar Artefatos
                    </S.Button>
                  </S.EmptyMessage>
                ) : (
                  <>
                    <S.ArtifactsHeader>
                      <h3>Artefatos ({artifacts.length})</h3>
                      <S.Button 
                        className="primary" 
                        onClick={() => navigate(`/projects/${id}/artifacts`)}
                      >
                        <FiEdit2 size={16} /> Gerenciar
                      </S.Button>
                    </S.ArtifactsHeader>
                    <S.ArtifactsList>
                      {artifacts.map((artifact) => (
                        <S.ArtifactItem key={artifact.id}>
                          <S.ArtifactItemIcon>
                            {getArtifactIcon(artifact.type)}
                          </S.ArtifactItemIcon>
                          <S.ArtifactItemInfo>
                            <S.ArtifactItemTitle>{artifact.title}</S.ArtifactItemTitle>
                            <S.ArtifactItemType>{artifact.type}</S.ArtifactItemType>
                          </S.ArtifactItemInfo>
                          {artifact.url && (
                            <S.ArtifactDownloadLink
                              href={artifact.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Download"
                            >
                              <FiDownload size={18} />
                            </S.ArtifactDownloadLink>
                          )}
                        </S.ArtifactItem>
                      ))}
                    </S.ArtifactsList>
                  </>
                )}
              </S.ArtifactsContainer>
            )}

            {activeTab === "raci" && (
              <S.RaciContainer>
                {raciAssignments.length === 0 ? (
                  <S.EmptyMessage>
                    Nenhuma atribuição RACI definida. 
                    <S.Button 
                      className="primary" 
                      onClick={() => navigate(`/projects/${id}/raci`)}
                      style={{ marginTop: '1rem' }}
                    >
                      <FiPlus size={18} /> Gerenciar RACI
                    </S.Button>
                  </S.EmptyMessage>
                ) : (
                  <>
                    <S.RaciHeader>
                      <h3>Matriz RACI</h3>
                      <S.Button 
                        className="primary" 
                        onClick={() => navigate(`/projects/${id}/raci`)}
                      >
                        <FiEdit2 size={16} /> Gerenciar
                      </S.Button>
                    </S.RaciHeader>
                    <S.RaciTable>
                      <thead>
                        <tr>
                          <th>Usuário</th>
                          <th style={{ textAlign: 'center' }}>R</th>
                          <th style={{ textAlign: 'center' }}>A</th>
                          <th style={{ textAlign: 'center' }}>C</th>
                          <th style={{ textAlign: 'center' }}>I</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from(
                          new Map(
                            raciAssignments.map((a) => [a.userId, a.user?.name || `Usuário ${a.userId}`])
                          ).entries()
                        ).map(([userId, userName]) => {
                          const userAssignments = raciAssignments.filter(a => a.userId === userId);
                          const roleMap = userAssignments.reduce((acc, a) => {
                            acc[a.raciRole] = true;
                            return acc;
                          }, {} as Record<string, boolean>);

                          return (
                            <tr key={userId}>
                              <td style={{ fontWeight: 600 }}>{userName}</td>
                              <td style={{ textAlign: 'center' }}>{roleMap['R'] ? '✓' : '-'}</td>
                              <td style={{ textAlign: 'center' }}>{roleMap['A'] ? '✓' : '-'}</td>
                              <td style={{ textAlign: 'center' }}>{roleMap['C'] ? '✓' : '-'}</td>
                              <td style={{ textAlign: 'center' }}>{roleMap['I'] ? '✓' : '-'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </S.RaciTable>
                  </>
                )}
              </S.RaciContainer>
            )}

            {activeTab === "metrics" && (
              <S.EmptyMessage>
                Métricas do projeto serão exibidas aqui
              </S.EmptyMessage>
            )}
          </S.TabContent>
        </S.TabsContainer>
      </S.Container>
    </Layout>
  );
};
