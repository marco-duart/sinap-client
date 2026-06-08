import { styled } from "@stitches/react";

export const Container = styled("div", {
  padding: "$3",
  maxWidth: "1200px",
  margin: "0 auto",
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

export const UploadButton = styled("button", {
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

  "&:hover": {
    opacity: 0.8,
  },

  "@bp1": {
    width: "100%",
  },
});

export const FormContainer = styled("div", {
  backgroundColor: "white",
  borderRadius: "$md",
  border: "1px solid $gray300",
  padding: "$3",
  marginBottom: "$3",
});

export const FormHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "$2",
  paddingBottom: "$2",
  borderBottom: "1px solid $gray200",
});

export const FormTitle = styled("h3", {
  fontSize: "$3",
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

  "&:hover": {
    backgroundColor: "$gray100",
    color: "$secondary",
  },
});

export const FormGroup = styled("div", {
  marginBottom: "$2",
  display: "flex",
  flexDirection: "column",
  gap: "$1",
});

export const Label = styled("label", {
  fontSize: "$2",
  fontWeight: 600,
  color: "$secondary",
});

export const Input = styled("input", {
  padding: "$2",
  borderRadius: "$md",
  border: "1px solid $gray300",
  fontSize: "$2",
  fontFamily: "inherit",

  "&:focus": {
    outline: "none",
    borderColor: "$primary",
    boxShadow: "0 0 0 3px rgba(8, 207, 204, 0.1)",
  },
});

export const Textarea = styled("textarea", {
  padding: "$2",
  borderRadius: "$md",
  border: "1px solid $gray300",
  fontSize: "$2",
  fontFamily: "inherit",
  resize: "vertical",

  "&:focus": {
    outline: "none",
    borderColor: "$primary",
    boxShadow: "0 0 0 3px rgba(8, 207, 204, 0.1)",
  },
});

export const Select = styled("select", {
  padding: "$2",
  borderRadius: "$md",
  border: "1px solid $gray300",
  fontSize: "$2",
  fontFamily: "inherit",
  backgroundColor: "white",

  "&:focus": {
    outline: "none",
    borderColor: "$primary",
    boxShadow: "0 0 0 3px rgba(8, 207, 204, 0.1)",
  },
});

export const FileInput = styled("input", {
  display: "none",
});

export const FileInputLabel = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "$1",
  padding: "$3",
  borderRadius: "$md",
  border: "2px dashed $primary",
  backgroundColor: "rgba(8, 207, 204, 0.05)",
  color: "$primary",
  fontSize: "$2",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 200ms",

  "&:hover": {
    borderColor: "$primaryDark",
    backgroundColor: "rgba(8, 207, 204, 0.1)",
  },
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
  paddingTop: "$2",
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
    opacity: 0.8,
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const LoadingMessage = styled("div", {
  textAlign: "center",
  padding: "$6",
  color: "$gray600",
  fontSize: "$2",
});

export const EmptyState = styled("div", {
  textAlign: "center",
  padding: "$6",
  backgroundColor: "$gray50",
  borderRadius: "$md",
  border: "1px solid $gray200",

  "& p": {
    color: "$gray600",
    margin: 0,
  },
});

export const ArtifactsList = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "$3",

  "@bp1": {
    gridTemplateColumns: "1fr",
  },
});

export const ArtifactCard = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
  padding: "$3",
  borderRadius: "$md",
  border: "1px solid $gray200",
  backgroundColor: "white",
  transition: "all 200ms",

  "&:hover": {
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
});

export const ArtifactIcon = styled("div", {
  fontSize: "$6",
  textAlign: "center",
});

export const ArtifactInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$1",
  flex: 1,
});

export const ArtifactTitle = styled("h4", {
  fontSize: "$2",
  fontWeight: 600,
  color: "$secondary",
  margin: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const ArtifactType = styled("span", {
  fontSize: "$1",
  color: "$primary",
  fontWeight: 500,
  textTransform: "uppercase",
});

export const ArtifactDescription = styled("p", {
  fontSize: "$1",
  color: "$gray600",
  margin: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});

export const ArtifactActions = styled("div", {
  display: "flex",
  gap: "$1",
});

export const ActionButton = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  padding: "$2",
  borderRadius: "$sm",
  border: "none",
  backgroundColor: "$primary",
  color: "white",
  cursor: "pointer",
  fontSize: "$2",
  transition: "all 200ms",

  "&:hover:not(:disabled)": {
    opacity: 0.8,
  },

  "&.delete": {
    backgroundColor: "$error",
  },

  variants: {
    as: {
      a: {
        textDecoration: "none",
        display: "inline-flex",
      },
    },
  },
});
