import { styled, keyframes } from "../../assets/styles/stitches.config";

const pulseEffect = keyframes({
  "0%": { boxShadow: "0 0 10px rgba(8, 207, 204, 0.4)" },
  "50%": { boxShadow: "0 0 15px rgba(8, 207, 204, 0.8)" },
  "100%": { boxShadow: "0 0 10px rgba(8, 207, 204, 0.4)" },
});

export const Card = styled("div", {
  background: "$white",
  borderRadius: "12px",
  padding: "$medium",
  boxShadow: "$large",
  display: "flex",
  flexDirection: "column",
  gap: "$small",
  borderLeft: "6px solid $primary",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",

  animation: `${pulseEffect} 4s infinite ease-in-out`,

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
});

export const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const Title = styled("h4", {
  fontSize: "$medium",
  fontWeight: "$bold",
  color: "$secondaryDark",
  margin: 0,
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: "80%",
});

export const PriorityTag = styled("span", {
  fontSize: "$small",
  fontWeight: "$bold",
  padding: "2px $small",
  borderRadius: "6px",
  textTransform: "uppercase",
  variants: {
    priority: {
      4: {
        background: "$errorLight",
        color: "$errorDark",
      },
      3: {
        background: "$warningLight",
        color: "$warningDark",
      },
      2: {
        background: "$infoLight",
        color: "$infoDark",
      },
      1: {
        background: "$successLight",
        color: "$successDark",
      },
    },
  },
});

export const DetailRow = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$xsmall",
  fontSize: "$regular",
  color: "$darkGray",

  "& svg": {
    color: "$primaryDark",
  },
});

export const StepName = styled("span", {
  fontWeight: "$bold",
  color: "$accentDark",
});

export const ResponsibleName = styled("span", {
  fontWeight: "$regular",
  color: "$secondary",
});

export const TimeAgo = styled("p", {
  fontSize: "$small",
  color: "$mediumGray",
  margin: 0,
  variants: {
    critical: {
      true: {
        color: "$error",
        fontWeight: "$bold",
      },
    },
  },
});
