import { styled } from "../../assets/styles/stitches.config";

export const Container = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
});

export const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "$xl",
  paddingBottom: "$large",
  borderBottom: "1px solid $lightGray",
});

export const BackButton = styled("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "$primary",
  fontSize: "14px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  gap: "$small",
  transition: "all 0.3s ease",

  "&:hover": {
    color: "$primaryDark",
  },
});

export const HeaderActions = styled("div", {
  display: "flex",
  gap: "$medium",
});

export const ActionButton = styled("button", {
  padding: "$medium $large",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  gap: "$small",
  transition: "all 0.3s ease",

  "&.edit": {
    background: "$primary",
    color: "$white",
    "&:hover": {
      background: "$primaryDark",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(8, 207, 204, 0.3)",
    },
  },

  "&.delete": {
    background: "$error",
    color: "$white",
    "&:hover": {
      background: "darken($error, 10%)",
    },
  },
});

export const TabsContainer = styled("div", {
  background: "$white",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
});

export const TabsBar = styled("div", {
  display: "flex",
  borderBottom: "1px solid $lightGray",
  overflowX: "auto",
});

export const Tab = styled("button", {
  padding: "$large $xl",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  color: "$mediumGray",
  borderBottom: "3px solid transparent",
  transition: "all 0.3s ease",
  whiteSpace: "nowrap",

  variants: {
    active: {
      true: {
        color: "$primary",
        borderBottomColor: "$primary",
      },
    },
  },

  "&:hover": {
    color: "$primary",
  },
});

export const TabContent = styled("div", {
  padding: "$xl",
});

export const GeneralInfo = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "$large",
});

export const InfoRow = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$small",
});

export const InfoLabel = styled("span", {
  fontSize: "12px",
  fontWeight: "600",
  color: "$mediumGray",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

export const InfoValue = styled("span", {
  fontSize: "16px",
  color: "$secondary",
  fontWeight: "500",
});

export const PriorityBadge = styled("span", {
  padding: "$small $medium",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  display: "inline-block",
  width: "fit-content",

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

export const ScoreBar = styled("div", {
  fontSize: "14px",
  fontWeight: "600",
  color: "$primary",
});

export const TasksContainer = styled("div", {});

export const TasksHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "$large",

  "& h3": {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    color: "$secondary",
  },
});

export const Button = styled("button", {
  padding: "$medium $large",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  gap: "$small",
  transition: "all 0.3s ease",

  "&.primary": {
    background: "$primary",
    color: "$white",
    "&:hover": {
      background: "$primaryDark",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(8, 207, 204, 0.3)",
    },
  },
});

export const EmptyMessage = styled("div", {
  padding: "$xl",
  textAlign: "center",
  color: "$mediumGray",
  fontSize: "14px",
});

export const TasksList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$medium",
});

export const TaskItem = styled("div", {
  padding: "$medium $large",
  background: "$lightGray",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "all 0.3s ease",

  "&:hover": {
    background: "$mediumGray",
  },
});

export const TaskInfo = styled("div", {
  flex: 1,
});

export const TaskTitle = styled("div", {
  fontSize: "16px",
  fontWeight: "600",
  color: "$secondary",
  marginBottom: "$small",
});

export const TaskMeta = styled("div", {
  fontSize: "13px",
  color: "$mediumGray",
  display: "flex",
  alignItems: "center",
  gap: "$small",
});

export const StatusBadge = styled("span", {
  padding: "2px 8px",
  borderRadius: "12px",
  fontSize: "11px",
  fontWeight: "600",

  variants: {
    status: {
      "TODO": {
        background: "$lightGray",
        color: "$secondary",
      },
      "IN_PROGRESS": {
        background: "$info",
        color: "$white",
      },
      "DONE": {
        background: "$success",
        color: "$white",
      },
    },
  },
});

export const TaskActions = styled("div", {
  display: "flex",
  gap: "$small",
});

export const DetailActionButton = styled("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: "$small",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",

  "&.edit": {
    color: "$primary",
    "&:hover": {
      background: "rgba(8, 207, 204, 0.1)",
    },
  },

  "&.delete": {
    color: "$error",
    "&:hover": {
      background: "rgba(217, 27, 91, 0.1)",
    },
  },
});

export const RaciContainer = styled("div", {});

export const RaciHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "$large",

  "& h3": {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    color: "$secondary",
  },
});

export const RaciTable = styled("table", {
  width: "100%",
  borderCollapse: "collapse",
  border: "1px solid $lightGray",
  borderRadius: "8px",
  
  "& thead": {
    backgroundColor: "$lightGray",
    
    "& th": {
      padding: "$medium",
      fontWeight: "600",
      color: "$secondary",
      textAlign: "left",
      borderBottom: "2px solid $gray",
    },
  },
  
  "& tbody": {
    "& tr": {
      borderBottom: "1px solid $lightGray",
      
      "&:hover": {
        backgroundColor: "rgba(8, 207, 204, 0.05)",
      },
      
      "& td": {
        padding: "$medium",
        color: "$gray700",
      },
    },
  },
});

export const ArtifactsContainer = styled("div", {});

export const ArtifactsHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "$large",

  "& h3": {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    color: "$secondary",
  },
});

export const ArtifactsList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$medium",
});

export const ArtifactItem = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$medium",
  padding: "$medium",
  borderRadius: "8px",
  backgroundColor: "$lightGray",
  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: "rgba(8, 207, 204, 0.1)",
  },
});

export const ArtifactItemIcon = styled("div", {
  fontSize: "28px",
});

export const ArtifactItemInfo = styled("div", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "$small",
});

export const ArtifactItemTitle = styled("h4", {
  margin: 0,
  fontSize: "14px",
  fontWeight: "600",
  color: "$secondary",
});

export const ArtifactItemType = styled("span", {
  fontSize: "12px",
  color: "$primary",
  fontWeight: "500",
  textTransform: "uppercase",
});

export const ArtifactDownloadLink = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  borderRadius: "6px",
  backgroundColor: "$primary",
  color: "white",
  transition: "all 0.3s ease",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "$primaryDark",
    transform: "scale(1.05)",
  },
});
