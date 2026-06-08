import { styled } from "../../assets/styles/stitches.config";

export const Container = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, $primary 0%, $secondary 100%)",
  padding: "$large",
});

export const FormContainer = styled("div", {
  background: "$white",
  borderRadius: "12px",
  padding: "$xl",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
  animation: "slideUp 0.5s ease-out",
});

export const Logo = styled("div", {
  fontSize: "32px",
  textAlign: "center",
  marginBottom: "$large",
  fontWeight: "bold",
});

export const Title = styled("h1", {
  fontSize: "28px",
  color: "$secondary",
  textAlign: "center",
  marginBottom: "$small",
});

export const Description = styled("p", {
  fontSize: "14px",
  color: "$darkGray",
  textAlign: "center",
  marginBottom: "$xl",
});

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$medium",
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
  padding: "$small $medium",
  border: "2px solid $lightGray",
  borderRadius: "8px",
  fontSize: "14px",
  transition: "all 0.3s ease",
  fontFamily: "$primary",

  "&:focus": {
    outline: "none",
    borderColor: "$primary",
    boxShadow: "0 0 0 3px rgba(8, 207, 204, 0.1)",
  },

  "&::placeholder": {
    color: "$mediumGray",
  },
});

export const Error = styled("span", {
  fontSize: "12px",
  color: "$error",
  marginTop: "-4px",
});

export const SubmitButton = styled("button", {
  padding: "$medium",
  background: "$primary",
  color: "$white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.3s ease",
  marginTop: "$medium",

  "&:hover:not(:disabled)": {
    background: "$primaryDark",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(8, 207, 204, 0.3)",
  },

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
});

export const Divider = styled("div", {
  textAlign: "center",
  color: "$mediumGray",
  margin: "$medium 0",
  fontSize: "14px",
});

export const RegisterLink = styled("div", {
  textAlign: "center",
  fontSize: "14px",
  color: "$darkGray",

  "& a": {
    color: "$primary",
    fontWeight: "600",
    transition: "color 0.3s ease",

    "&:hover": {
      color: "$primaryDark",
    },
  },
});
