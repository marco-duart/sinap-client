import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { artifactService } from "../../services/artifacts.service";
import type { Artifact } from "../../types/entities";
import * as S from "./styles";
import { FiUpload, FiDownload, FiTrash2, FiX } from "react-icons/fi";

const artifactSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  type: z.enum(["DOCUMENTO", "IMAGEM", "VÍDEO", "ÁUDIO", "OUTRO"], {
    errorMap: () => ({ message: "Tipo de artefato é obrigatório" }),
  }),
});

type ArtifactFormData = z.infer<typeof artifactSchema>;

const ARTIFACT_TYPES = [
  { value: "DOCUMENTO", label: "📄 Documento" },
  { value: "IMAGEM", label: "🖼️ Imagem" },
  { value: "VÍDEO", label: "🎬 Vídeo" },
  { value: "ÁUDIO", label: "🔊 Áudio" },
  { value: "OUTRO", label: "📦 Outro" },
];

export const ArtifactsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ArtifactFormData>({
    resolver: zodResolver(artifactSchema),
  });

  useEffect(() => {
    if (projectId) {
      loadArtifacts();
    }
  }, [projectId]);

  const loadArtifacts = async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const data = await artifactService.getByProject(Number(projectId));
      setArtifacts(data);
    } catch (error) {
      toast.error("Erro ao carregar artefatos");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ArtifactFormData) => {
    if (!selectedFile) {
      toast.error("Selecione um arquivo");
      return;
    }

    if (!projectId) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("type", data.type);
      formData.append("file", selectedFile);
      formData.append("projectId", projectId);

      const newArtifact = await artifactService.create(formData);
      setArtifacts((prev) => [...prev, newArtifact]);
      toast.success("Artefato enviado com sucesso");
      reset();
      setSelectedFile(null);
      setShowForm(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Erro ao enviar artefato");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteArtifact = async (artifactId: number) => {
    if (!confirm("Deseja deletar este artefato?")) return;

    try {
      await artifactService.delete(artifactId);
      setArtifacts((prev) => prev.filter((a) => a.id !== artifactId));
      toast.success("Artefato deletado com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar artefato");
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Artefatos do Projeto</S.Title>
        <S.UploadButton onClick={() => setShowForm(!showForm)}>
          <FiUpload /> {showForm ? "Cancelar" : "Novo Artefato"}
        </S.UploadButton>
      </S.Header>

      {showForm && (
        <S.FormContainer>
          <S.FormHeader>
            <S.FormTitle>Enviar Artefato</S.FormTitle>
            <S.CloseButton onClick={() => setShowForm(false)}>
              <FiX />
            </S.CloseButton>
          </S.FormHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <S.FormGroup>
              <S.Label>Título</S.Label>
              <S.Input placeholder="Nome do artefato" {...register("title")} />
              {errors.title && <S.ErrorText>{errors.title.message}</S.ErrorText>}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Descrição (opcional)</S.Label>
              <S.Textarea
                placeholder="Descrição do artefato"
                {...register("description")}
                rows={3}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Tipo</S.Label>
              <S.Select {...register("type")}>
                <option value="">Selecione um tipo</option>
                {ARTIFACT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </S.Select>
              {errors.type && <S.ErrorText>{errors.type.message}</S.ErrorText>}
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>Arquivo</S.Label>
              <S.FileInput
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
              />
              <S.FileInputLabel onClick={() => fileInputRef.current?.click()}>
                <FiUpload /> {selectedFile ? selectedFile.name : "Selecionar arquivo"}
              </S.FileInputLabel>
            </S.FormGroup>

            <S.FormActions>
              <S.CancelButton
                type="button"
                onClick={() => {
                  setShowForm(false);
                  reset();
                  setSelectedFile(null);
                }}
                disabled={uploading}
              >
                Cancelar
              </S.CancelButton>
              <S.SubmitButton type="submit" disabled={uploading || !selectedFile}>
                {uploading ? "Enviando..." : "Enviar Artefato"}
              </S.SubmitButton>
            </S.FormActions>
          </form>
        </S.FormContainer>
      )}

      {loading ? (
        <S.LoadingMessage>Carregando artefatos...</S.LoadingMessage>
      ) : artifacts.length === 0 ? (
        <S.EmptyState>
          <p>Nenhum artefato enviado para este projeto</p>
        </S.EmptyState>
      ) : (
        <S.ArtifactsList>
          {artifacts.map((artifact) => (
            <S.ArtifactCard key={artifact.id}>
              <S.ArtifactIcon>{getArtifactIcon(artifact.type)}</S.ArtifactIcon>
              <S.ArtifactInfo>
                <S.ArtifactTitle>{artifact.title}</S.ArtifactTitle>
                <S.ArtifactType>{artifact.type}</S.ArtifactType>
                {artifact.description && (
                  <S.ArtifactDescription>{artifact.description}</S.ArtifactDescription>
                )}
              </S.ArtifactInfo>
              <S.ArtifactActions>
                {artifact.url && (
                  <S.ActionButton
                    as="a"
                    href={artifact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Download"
                  >
                    <FiDownload />
                  </S.ActionButton>
                )}
                <S.ActionButton
                  onClick={() => handleDeleteArtifact(artifact.id)}
                  className="delete"
                  title="Deletar"
                >
                  <FiTrash2 />
                </S.ActionButton>
              </S.ArtifactActions>
            </S.ArtifactCard>
          ))}
        </S.ArtifactsList>
      )}
    </S.Container>
  );
};

function getArtifactIcon(type: string): string {
  const icons: Record<string, string> = {
    DOCUMENTO: "📄",
    IMAGEM: "🖼️",
    VÍDEO: "🎬",
    ÁUDIO: "🔊",
    OUTRO: "📦",
  };
  return icons[type] || "📎";
}
