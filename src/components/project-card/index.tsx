import type { Project } from "../../services/projects/DTO";
import * as S from "./styles";
import { FaLayerGroup, FaUser, FaStopwatch } from "react-icons/fa";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  project: Project.ProjectWithRelations;
}

export const ProjectCard = ({ project }: Props) => {
  const timeAgo = formatDistanceToNow(parseISO(project.updatedAt), {
    addSuffix: true,
    locale: ptBR,
  });

  const isCritical =
    (new Date().getTime() - parseISO(project.updatedAt).getTime()) /
      (1000 * 3600 * 24) >
    7;

  return (
    <S.Card>
      <S.Header>
        <S.Title title={project.title}>{project.title}</S.Title>
        <S.PriorityTag priority={project.priority.value as 1 | 2 | 3 | 4}>
          {project.priority.name}
        </S.PriorityTag>
      </S.Header>

      <S.DetailRow>
        <FaLayerGroup size={14} />
        Etapa: <S.StepName>{project.step.name}</S.StepName>
      </S.DetailRow>

      {project.responsible && (
        <S.DetailRow>
          <FaUser size={14} />
          Responsável:{" "}
          <S.ResponsibleName>{project.responsible.name}</S.ResponsibleName>
        </S.DetailRow>
      )}

      <S.DetailRow>
        <FaStopwatch size={14} />
        Última Atualização:{" "}
        <S.TimeAgo critical={isCritical}>{timeAgo}</S.TimeAgo>
      </S.DetailRow>
    </S.Card>
  );
};
