import { styled } from "../../assets/styles/stitches.config";

export const Container = styled("div", {
  maxWidth: "800px",
  margin: "0 auto",
});

export const FormCard = styled("div", {
  background: "$white",
  borderRadius: "12px",
  padding: "$xl",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$xl",
});

export const FormRow = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "$large",
});

export const FormGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$small",
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
  transition: "all 0.3s ease",
  fontFamily: "inherit",

  "&:focus": {
    outline: "none",
    borderColor: "$primary",
    boxShadow: "0 0 0 3px rgba(8, 207, 204, 0.1)",
  },

  "&::placeholder": {
    color: "$mediumGray",
  },
});

export const TextArea = styled("textarea", {
  padding: "$medium",
  borderRadius: "8px",
  border: "1px solid $lightGray",
  fontSize: "14px",
  fontFamily: "inherit",
  resize: "vertical",
  minHeight: "100px",
  transition: "all 0.3s ease",

  "&:focus": {
    outline: "none",
    borderColor: "$primary",
    boxShadow: "0 0 0 3px rgba(8, 207, 204, 0.1)",
  },

  "&::placeholder": {
    color: "$mediumGray",
  },
});

export const Select = styled("select", {
  padding: "$medium",
  borderRadius: "8px",
  border: "1px solid $lightGray",
  fontSize: "14px",
  fontFamily: "inherit",
  transition: "all 0.3s ease",
  cursor: "pointer",
  background: "$white",

  "&:focus": {
    outline: "none",
    borderColor: "$primary",
    boxShadow: "0 0 0 3px rgba(8, 207, 204, 0.1)",
  },
});

export const Error = styled("span", {
  fontSize: "12px",
  color: "$error",
  fontWeight: "500",
});

export const ButtonGroup = styled("div", {
  display: "flex",
  gap: "$medium",
  justifyContent: "flex-end",
  marginTop: "$large",
  borderTop: "1px solid $lightGray",
  paddingTop: "$large",
});

export const Button = styled("button", {
  padding: "$medium $large",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.3s ease",

  "&.primary": {
    background: "$primary",
    color: "$white",
    "&:hover:not(:disabled)": {
      background: "$primaryDark",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(8, 207, 204, 0.3)",
    },
  },

  "&.secondary": {
    background: "$lightGray",
    color: "$secondary",
    "&:hover:not(:disabled)": {
      background: "$mediumGray",
    },
  },

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
});
