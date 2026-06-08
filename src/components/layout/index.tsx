import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import * as S from "./styles";

export const Layout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <S.LayoutContainer>
      <S.Sidebar>
        <S.Logo>🚀 SINAP</S.Logo>
        
        <S.Nav>
          <S.NavLink to="/dashboard">Dashboard</S.NavLink>
          <S.NavLink to="/projects">Projetos</S.NavLink>
          <S.NavLink to="/metrics">Métricas</S.NavLink>
          
          {/* Admin Links */}
          <S.NavLink to="/admin/users">Usuários (Admin)</S.NavLink>
          <S.NavLink to="/admin/steps">Etapas (Admin)</S.NavLink>
          <S.NavLink to="/admin/priorities">Prioridades (Admin)</S.NavLink>
        </S.Nav>
        
        <S.LogoutButton onClick={handleLogout}>Sair</S.LogoutButton>
      </S.Sidebar>
      
      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.LayoutContainer>
  );
};