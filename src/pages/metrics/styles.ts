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

export const EffortBar = styled("div", {
  width: "100%",
  height: "40px",
  background: "$lightGray",
  borderRadius: "8px",
  overflow: "hidden",
  marginBottom: "$medium",
});

export const EffortCompleted = styled("div", {
  height: "100%",
  background: "linear-gradient(90deg, $primary, $accent)",
  transition: "width 0.5s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingRight: "$medium",
  color: "$white",
  fontWeight: "bold",
  fontSize: "12px",
});

export const EffortStats = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "$large",
  fontSize: "14px",
  color: "$darkGray",

  "& div": {
    flex: 1,
  },
});

export const ButtonGroup = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "$large",
  marginTop: "$xl",
});

export const LinkButton = styled("a", {
  padding: "$medium $large",
  background: "$primary",
  color: "$white",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center",
  transition: "all 0.3s ease",
  display: "block",

  "&:hover": {
    background: "$primaryDark",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(8, 207, 204, 0.3)",
  },
});

export const ChartsSection = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
  gap: "$large",
  marginBottom: "$xl",

  "@bp1": {
    gridTemplateColumns: "1fr",
  },
});

export const ChartContainer = styled("div", {
  background: "$white",
  borderRadius: "12px",
  padding: "$large",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const ChartTitle = styled("h3", {
  fontSize: "16px",
  fontWeight: "600",
  color: "$secondary",
  margin: 0,
  marginBottom: "$medium",
});
