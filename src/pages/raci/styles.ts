import { styled } from "@stitches/react";

export const Container = styled("div", {
  padding: "$3",
});

export const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "$3",
  gap: "$2",

  "@bp1": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export const Title = styled("h2", {
  fontSize: "$4",
  fontWeight: 600,
  color: "$secondary",
  margin: 0,
});

export const AddButton = styled("button", {
  display: "flex",
  alignItems: "center",
  gap: "$1",
  padding: "$2 $3",
  borderRadius: "$md",
  border: "none",
  backgroundColor: "$primary",
  color: "white",
  fontSize: "$2",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 200ms",

  "&:hover:not(:disabled)": {
    backgroundColor: "$primary",
    opacity: 0.8,
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  "@bp1": {
    width: "100%",
  },
});

export const EmptyState = styled("div", {
  textAlign: "center",
  padding: "$6 $3",
  backgroundColor: "$gray100",
  borderRadius: "$md",

  "& p": {
    color: "$gray600",
    marginBottom: "$3",
  },
});

export const MatrixWrapper = styled("div", {
  overflowX: "auto",
  borderRadius: "$md",
  border: "1px solid $gray300",
  backgroundColor: "white",
});

export const MatrixTable = styled("table", {
  width: "100%",
  borderCollapse: "collapse",

  "& thead": {
    backgroundColor: "$gray50",
    borderBottom: "2px solid $gray300",
  },

  "& tbody tr": {
    borderBottom: "1px solid $gray200",

    "&:last-child": {
      borderBottom: "none",
    },
  },

  "& tbody tr:hover": {
    backgroundColor: "$gray50",
  },
});

export const MatrixHeader = styled("th", {
  padding: "$2 $3",
  textAlign: "left",
  fontWeight: 600,
  color: "$secondary",
  fontSize: "$2",

  variants: {
    center: {
      true: {
        textAlign: "center",
      },
    },
  },
});

export const MatrixCell = styled("td", {
  padding: "$2 $3",
  fontSize: "$2",
  color: "$gray700",

  variants: {
    bold: {
      true: {
        fontWeight: 600,
        color: "$secondary",
      },
    },
    center: {
      true: {
        textAlign: "center",
      },
    },
  },
});

export const RoleBadge = styled("span", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "$6",
  height: "$6",
  borderRadius: "$sm",
  fontWeight: 600,
  fontSize: "$2",

  variants: {
    role: {
      R: {
        backgroundColor: "#D91B5B",
        color: "white",
      },
      A: {
        backgroundColor: "#F39C12",
        color: "white",
      },
      C: {
        backgroundColor: "#3498DB",
        color: "white",
      },
      I: {
        backgroundColor: "#9B59B6",
        color: "white",
      },
    },
  },
});

export const ActionButton = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "$5",
  height: "$5",
  padding: 0,
  borderRadius: "$sm",
  border: "none",
  backgroundColor: "$error",
  color: "white",
  cursor: "pointer",
  transition: "all 200ms",
  fontSize: "$3",

  "&:hover": {
    opacity: 0.8,
    transform: "scale(1.05)",
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

// Modal styles
export const ModalOverlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: "$2",
});

export const ModalContent = styled("div", {
  backgroundColor: "white",
  borderRadius: "$lg",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
  maxWidth: "500px",
  width: "100%",
  maxHeight: "90vh",
  overflow: "auto",
});

export const ModalHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "$3",
  borderBottom: "1px solid $gray200",
});

export const ModalTitle = styled("h2", {
  fontSize: "$4",
  fontWeight: 600,
  color: "$secondary",
  margin: 0,
});

export const CloseButton = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "$5",
  height: "$5",
  padding: 0,
  borderRadius: "$sm",
  border: "none",
  backgroundColor: "transparent",
  color: "$gray600",
  cursor: "pointer",
  fontSize: "$4",
  transition: "all 200ms",

  "&:hover:not(:disabled)": {
    backgroundColor: "$gray100",
    color: "$secondary",
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const FormWrapper = styled("div", {
  padding: "$3",
});

export const FormGroup = styled("div", {
  marginBottom: "$3",
  display: "flex",
  flexDirection: "column",
  gap: "$1",
});

export const Label = styled("label", {
  fontSize: "$2",
  fontWeight: 600,
  color: "$secondary",
});

export const Select = styled("select", {
  padding: "$2",
  borderRadius: "$md",
  border: "1px solid $gray300",
  fontSize: "$2",
  fontFamily: "inherit",
  backgroundColor: "white",
  color: "$gray700",

  "&:focus": {
    outline: "none",
    borderColor: "$primary",
    boxShadow: "0 0 0 3px rgba(8, 207, 204, 0.1)",
  },

  "&:disabled": {
    backgroundColor: "$gray100",
    color: "$gray500",
    cursor: "not-allowed",
  },
});

export const RoleContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
});

export const RoleOption = styled("div", {
  display: "flex",
  alignItems: "flex-start",
  gap: "$2",
});

export const RoleRadio = styled("input", {
  marginTop: "$1",
  width: "auto",
  cursor: "pointer",

  "&:focus": {
    outline: "none",
  },
});

export const RoleLabel = styled("label", {
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  gap: "$0.5",
});

export const RoleTitle = styled("span", {
  fontSize: "$2",
  fontWeight: 600,
  color: "$secondary",
});

export const RoleDefinition = styled("span", {
  fontSize: "$1",
  color: "$gray600",
});

export const ErrorText = styled("span", {
  fontSize: "$1",
  color: "$error",
  marginTop: "$0.5",
});

export const FormActions = styled("div", {
  display: "flex",
  gap: "$2",
  marginTop: "$3",
  paddingTop: "$3",
  borderTop: "1px solid $gray200",
});

export const CancelButton = styled("button", {
  flex: 1,
  padding: "$2",
  borderRadius: "$md",
  border: "1px solid $gray300",
  backgroundColor: "white",
  color: "$gray700",
  fontSize: "$2",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 200ms",

  "&:hover:not(:disabled)": {
    backgroundColor: "$gray50",
    borderColor: "$gray400",
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const SubmitButton = styled("button", {
  flex: 1,
  padding: "$2",
  borderRadius: "$md",
  border: "none",
  backgroundColor: "$primary",
  color: "white",
  fontSize: "$2",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 200ms",

  "&:hover:not(:disabled)": {
    backgroundColor: "$primary",
    opacity: 0.8,
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});
