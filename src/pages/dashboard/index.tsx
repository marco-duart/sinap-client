import * as S from "./styles";
import { useGetDashboard } from "../../hooks/use-get-dashboard";
import { ProcessingScreen } from "../../components/processing-screen";
import { ProjectCard } from "../../components/project-card";
import { ProjectsTable } from "../../components/projects-table";
import { useEffect, useCallback } from "react";

export const Dashboard = () => {
  const { dashboard, fetchActiveProjects, fetchBacklogProjects } =
    useGetDashboard();
  const { activeProjects, backlogProjects, loading } = dashboard;

  const startRealtimeUpdates = useCallback(() => {
    const intervalId = setInterval(() => {
      fetchActiveProjects();
      fetchBacklogProjects();
    }, 15000);

    return () => clearInterval(intervalId);
  }, [fetchActiveProjects, fetchBacklogProjects]);

  useEffect(() => {
    const cleanup = startRealtimeUpdates();
    return cleanup;
  }, [startRealtimeUpdates]);

  if (loading && activeProjects.length === 0 && backlogProjects.length === 0) {
    return <ProcessingScreen message="Sincronizando dados de projetos..." />;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Acompanhamento de Projetos 📊</S.Title>
      </S.Header>

      <S.Subtitle>Projetos Ativos ({activeProjects.length})</S.Subtitle>
      <S.ActiveProjectsGrid>
        {activeProjects.length > 0 ? (
          activeProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p>Nenhum projeto está em desenvolvimento ativo no momento.</p>
        )}
      </S.ActiveProjectsGrid>

      <S.QueueSection>
        <S.Subtitle>Próximos Projetos (Backlog Priorizado)</S.Subtitle>
        <ProjectsTable data={backlogProjects} />
      </S.QueueSection>
    </S.Container>
  );
};
