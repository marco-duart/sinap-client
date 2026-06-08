import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import * as S from "./styles";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <S.HeaderContainer>
        <S.LogoArea>
          <S.MenuButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </S.MenuButton>
          <S.Logo onClick={() => navigate("/dashboard")}>🚀 SINAP</S.Logo>
        </S.LogoArea>

        <S.UserArea>
          <S.UserInfo>
            <div>
              <S.UserName>{user?.name || "Usuário"}</S.UserName>
              <S.UserRole>{user?.roleName || user?.role || "Assistente"}</S.UserRole>
            </div>
          </S.UserInfo>
          <S.LogoutButton onClick={handleLogout} title="Sair">
            <FiLogOut size={20} />
          </S.LogoutButton>
        </S.UserArea>
      </S.HeaderContainer>

      {sidebarOpen && (
        <S.SidebarOverlay onClick={() => setSidebarOpen(false)} />
      )}
    </>
  );
};
