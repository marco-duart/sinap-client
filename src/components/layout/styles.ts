import { styled } from "../../assets/styles/stitches.config";
import { Link } from "react-router-dom";

export const LayoutContainer = styled("div", {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#f4f7f6",
});

export const Sidebar = styled("aside", {
  width: "250px",
  backgroundColor: "#2c3e50",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
});

export const Logo = styled("div", {
  padding: "20px",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: "1px solid #34495e",
});

export const Nav = styled("nav", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "20px 0",
});

export const NavLink = styled(Link, {
  padding: "15px 20px",
  color: "#ecf0f1",
  textDecoration: "none",
  display: "block",
  transition: "background-color 0.2s",

  "&:hover": {
    backgroundColor: "#34495e",
  },
});

export const LogoutButton = styled("button", {
  padding: "15px 20px",
  background: "none",
  border: "none",
  color: "#e74c3c",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "16px",
  borderTop: "1px solid #34495e",

  "&:hover": {
    backgroundColor: "#34495e",
  },
});

export const MainContent = styled("main", {
  flex: 1,
  padding: "20px",
  overflowY: "auto",
});