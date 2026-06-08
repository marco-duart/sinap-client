import { styled } from "../../assets/styles/stitches.config";

export const Container = styled("div", {
  maxWidth: "1200px",
  margin: "0 auto",
});

export const MetricsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "$large",
  marginBottom: "$xl",
});

export const MetricCard = styled("div", {
  background: "$white",
  borderRadius: "12px",
  padding: "$large",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  textAlign: "center",

  "&:hover": {
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-4px)",
  },
});

export const MetricIcon = styled("div", {
  fontSize: "40px",
  marginBottom: "$medium",
});

export const MetricTitle = styled("h3", {
  fontSize: "14px",
  color: "$darkGray",
  margin: 0,
  marginBottom: "$small",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

export const MetricValue = styled("div", {
  fontSize: "32px",
  fontWeight: "bold",
  color: "$primary",
  marginBottom: "$small",
});

export const MetricDetail = styled("div", {
  fontSize: "12px",
  color: "$mediumGray",
});

export const DetailsSection = styled("div", {
  background: "$white",
  borderRadius: "12px",
  padding: "$large",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  marginBottom: "$xl",
});

export const SectionTitle = styled("h2", {
  fontSize: "18px",
  fontWeight: "bold",
  color: "$secondary",
  margin: "0 0 $large 0",
});

export const StatsList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$large",
});

export const StatsItem = styled("div", {
  "& span": {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "$darkGray",
    marginBottom: "$small",
  },
});

export const ProgressBar = styled("div", {
  width: "100%",
  height: "30px",
  background: "$lightGray",
  borderRadius: "8px",
  overflow: "hidden",
});

export const ProgressFill = styled("div", {
  height: "100%",
  transition: "width 0.5s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingRight: "$medium",
  color: "$white",
  fontWeight: "bold",
  fontSize: "12px",

  variants: {
    color: {
      success: {
        background: "$success",
      },
      warning: {
        background: "$warning",
      },
      error: {
        background: "$error",
      },
      info: {
        background: "$info",
      },
    },
  },
} as const);
