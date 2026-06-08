import { styled } from "../../assets/styles/stitches.config";

export const Container = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
});

export const EmptyMessage = styled("div", {
  padding: "$xl",
  textAlign: "center",
  color: "$mediumGray",
  fontSize: "14px",
  background: "$white",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const Table = styled("table", {
  width: "100%",
  borderCollapse: "collapse",
  background: "$white",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const TableHead = styled("thead", {
  background: "$lightGray",
});

export const TableBody = styled("tbody", {});

export const TableRow = styled("tr", {
  borderBottom: "1px solid $lightGray",
  transition: "all 0.3s ease",

  "&:hover": {
    background: "$lightGray",
  },
});

export const TableHeader = styled("th", {
  padding: "$medium $large",
  textAlign: "left",
  fontSize: "12px",
  fontWeight: "bold",
  color: "$secondary",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

export const TableCell = styled("td", {
  padding: "$medium $large",
  fontSize: "14px",
  color: "$secondary",
});

export const RoleBadge = styled("span", {
  padding: "$small $medium",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  background: "$primary",
  color: "$white",
  display: "inline-block",
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

  "&.delete": {
    color: "$error",
    "&:hover": {
      background: "rgba(217, 27, 91, 0.1)",
    },
  },

  "&.edit": {
    color: "$primary",
    "&:hover": {
      background: "rgba(8, 207, 204, 0.1)",
    },
  },
});

export const ActionGroup = styled("div", {
  display: "flex",
  gap: "$small",
});

export const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "$large",
  paddingBottom: "$large",
  borderBottom: "1px solid $lightGray",
});

export const Title = styled("h2", {
  fontSize: "20px",
  fontWeight: "bold",
  color: "$secondary",
  margin: 0,
});

export const AddButton = styled("button", {
  padding: "$medium $large",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "$primary",
  color: "white",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "$small",
  transition: "all 0.3s ease",

  "&:hover": {
    opacity: 0.8,
  },
});

export const FormContainer = styled("div", {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "$large",
  marginBottom: "$large",
  border: "1px solid $lightGray",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const FormHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "$large",
  paddingBottom: "$medium",
  borderBottom: "1px solid $lightGray",
});

export const FormTitle = styled("h3", {
  fontSize: "18px",
  fontWeight: "bold",
  color: "$secondary",
  margin: 0,
});

export const CloseButton = styled("button", {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "20px",
  color: "$gray",
  transition: "all 0.2s ease",

  "&:hover:not(:disabled)": {
    color: "$secondary",
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const FormGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$small",
  marginBottom: "$medium",
});

export const Label = styled("label", {
  fontSize: "14px",
  fontWeight: "600",
  color: "$secondary",
});

export const Input = styled("input", {
  padding: "$medium",
  borderRadius: "8px",
  border: "1px solid $lightGray",
  fontSize: "14px",
  fontFamily: "inherit",

  "&:focus": {
    outline: "none",
    borderColor: "$primary",
    boxShadow: "0 0 0 3px rgba(8, 207, 204, 0.1)",
  },
});

export const Select = styled("select", {
  padding: "$medium",
  borderRadius: "8px",
  border: "1px solid $lightGray",
  fontSize: "14px",
  fontFamily: "inherit",
  backgroundColor: "white",

  "&:focus": {
    outline: "none",
    borderColor: "$primary",
    boxShadow: "0 0 0 3px rgba(8, 207, 204, 0.1)",
  },
});

export const CheckboxLabel = styled("label", {
  display: "flex",
  alignItems: "center",
  gap: "$small",
  fontSize: "14px",
  cursor: "pointer",
  fontWeight: "500",
});

export const Checkbox = styled("input", {
  cursor: "pointer",
});

export const ErrorText = styled("span", {
  fontSize: "12px",
  color: "$error",
  marginTop: "$small",
});

export const FormActions = styled("div", {
  display: "flex",
  gap: "$medium",
  marginTop: "$large",
  paddingTop: "$medium",
  borderTop: "1px solid $lightGray",
});

export const CancelButton = styled("button", {
  flex: 1,
  padding: "$medium",
  borderRadius: "8px",
  border: "1px solid $lightGray",
  backgroundColor: "white",
  color: "$gray",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:hover:not(:disabled)": {
    borderColor: "$gray",
    backgroundColor: "$gray100",
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const SubmitButton = styled("button", {
  flex: 1,
  padding: "$medium",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "$primary",
  color: "white",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:hover:not(:disabled)": {
    opacity: 0.8,
  },

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const TableWrapper = styled("div", {
  overflowX: "auto",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});
