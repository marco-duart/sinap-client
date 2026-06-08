import { useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { userService } from "../../services/users.service";
import type { User } from "../../types/auth";
import { ProcessingScreen } from "../../components/processing-screen";
import toast from "react-hot-toast";
import * as S from "./admin-styles";
import { FiTrash2 } from "react-icons/fi";

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleDeleteUser = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await userService.delete(id);
        setUsers(users.filter((u) => u.id !== id));
        toast.success("Usuário deletado com sucesso");
      } catch (error) {
        toast.error("Erro ao deletar usuário");
      }
    }
  };

  if (loading) {
    return <ProcessingScreen message="Carregando usuários..." />;
  }

  return (
    <Layout title="Gerenciamento de Usuários" subtitle="Administre os usuários do sistema">
      <S.Container>
        {users.length === 0 ? (
          <S.EmptyMessage>Nenhum usuário encontrado</S.EmptyMessage>
        ) : (
          <S.Table>
            <S.TableHead>
              <S.TableRow>
                <S.TableHeader>Nome</S.TableHeader>
                <S.TableHeader>Email</S.TableHeader>
                <S.TableHeader>Papel</S.TableHeader>
                <S.TableHeader>Ações</S.TableHeader>
              </S.TableRow>
            </S.TableHead>
            <S.TableBody>
              {users.map((user) => (
                <S.TableRow key={user.id}>
                  <S.TableCell>{user.name}</S.TableCell>
                  <S.TableCell>{user.email}</S.TableCell>
                  <S.TableCell>
                    <S.RoleBadge>{user.roleName || "Desconhecido"}</S.RoleBadge>
                  </S.TableCell>
                  <S.TableCell>
                    <S.ActionButton
                      onClick={() => handleDeleteUser(user.id)}
                      className="delete"
                      title="Deletar"
                    >
                      <FiTrash2 size={18} />
                    </S.ActionButton>
                  </S.TableCell>
                </S.TableRow>
              ))}
            </S.TableBody>
          </S.Table>
        )}
      </S.Container>
    </Layout>
  );
};
