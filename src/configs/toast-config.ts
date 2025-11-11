import theme from "../assets/styles/theme";

export const toastConfig = {
  position: "top-center" as const,
  className: "payment-gateway-toast",
  duration: 6000,
  style: {
    background: theme.colors.white,
    color: theme.colors.primary,
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: "8px",
    fontSize: theme.fontSizes.large,
    fontWeight: theme.fonts.weights.regular,
    padding: "12px 20px",
    boxShadow: theme.shadows.medium,
    minWidth: "300px",
    maxWidth: "500px",
    minHeight: "100px",
  },
  success: {
    iconTheme: {
      primary: theme.colors.success,
      secondary: theme.colors.white,
    },
    style: {
      border: `2px solid ${theme.colors.success}`,
      background: `${theme.colors.success}15`,
    },
  },
  error: {
    iconTheme: {
      primary: theme.colors.error,
      secondary: theme.colors.white,
    },
    style: {
      border: `2px solid ${theme.colors.error}`,
      background: `${theme.colors.error}15`,
    },
  },
  loading: {
    iconTheme: {
      primary: theme.colors.primary,
      secondary: theme.colors.white,
    },
    style: {
      border: `2px solid ${theme.colors.primary}`,
      background: `${theme.colors.primary}15`,
    },
  },
};
