import { styled } from "../../assets/styles/stitches.config";

export const Container = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
});

export const ActionBar = styled("div", {
  marginBottom: "$xl",
  display: "flex",
  gap: "$medium",
  flexWrap: "wrap",
});

export const Button = styled("button", {
  padding: "$medium $large",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.3s ease",
  display: "flex",
  alignItems: "center",
  gap: "$small",

  "&.primary": {
    background: "$primary",
    color: "$white",
    "&:hover": {
      background: "$primaryDark",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(8, 207, 204, 0.3)",
    },
  },

  "&.secondary": {
    background: "$secondary",
    color: "$white",
    "&:hover": {
      background: "$secondaryDark",
    },
  },

  "&.danger": {
    background: "$error",
    color: "$white",
    "&:hover": {
      background: "$errorDark",
    },
  },
});

export const EmptyState = styled("div", {
  textAlign: "center",
  padding: "$xxl",
  background: "$white",
  borderRadius: "12px",
  border: "2px dashed $lightGray",

  "& p": {
    fontSize: "16px",
    color: "$darkGray",
    marginBottom: "$large",
  },
});

export const ProjectsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "$large",
});

export const ProjectCard = styled("div", {
  background: "$white",
  borderRadius: "12px",
  padding: "$large",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  gap: "$medium",

  "&:hover": {
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-4px)",
  },
});

export const ProjectHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "start",
  gap: "$medium",
});

export const ProjectTitle = styled("h3", {
  fontSize: "18px",
  fontWeight: "bold",
  color: "$secondary",
  margin: 0,
});

export const ProjectPriority = styled("span", {
  padding: "$small $medium",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  whiteSpace: "nowrap",

  variants: {
    priority: {
      "Urgente": {
        background: "$error",
        color: "$white",
      },
      "Alta": {
        background: "$warning",
        color: "$white",
      },
      "Média": {
        background: "$info",
        color: "$white",
      },
      "Baixa": {
        background: "$success",
        color: "$white",
      },
    },
  },
});

export const ProjectDescription = styled("p", {
  fontSize: "14px",
  color: "$darkGray",
  margin: 0,
  lineHeight: 1.5,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const ProjectMeta = styled("div", {
  display: "flex",
  gap: "$medium",
  fontSize: "13px",
  color: "$mediumGray",

  "& span": {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
});

export const ProjectActions = styled("div", {
  display: "flex",
  gap: "$small",
  justifyContent: "flex-end",
  borderTop: "1px solid $lightGray",
  paddingTop: "$medium",
  marginTop: "auto",
});

export const ActionButton = styled("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "$small",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",

  "&.view": {
    color: "$primary",
    "&:hover": {
      background: "rgba(8, 207, 204, 0.1)",
    },
  },

  "&.edit": {
    color: "$info",
    "&:hover": {
      background: "rgba(52, 152, 219, 0.1)",
    },
  },

  "&.delete": {
    color: "$error",
    "&:hover": {
      background: "rgba(217, 27, 91, 0.1)",
    },
  },
});
