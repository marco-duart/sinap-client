import { styled } from "../../assets/styles/stitches.config";

export const Container = styled("main", {
  padding: "$xlarge",
  maxWidth: "1400px",
  margin: "0 auto",

  "@desktop": {
    padding: "$xxlarge",
  },
});

export const Header = styled("header", {
  marginBottom: "$xlarge",
  borderBottom: `2px solid $lightGray`,
  paddingBottom: "$medium",
});

export const Title = styled("h1", {
  color: "$secondaryDark",
  fontSize: "$huge",
  fontWeight: "$extraBold",
  margin: 0,
});

export const Subtitle = styled("h2", {
  color: "$primaryDark",
  fontSize: "$large",
  fontWeight: "$bold",
  marginTop: "$xlarge",
  marginBottom: "$medium",
});

export const ActiveProjectsGrid = styled("section", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "$large",
  marginBottom: "$xxlarge",
});

export const QueueSection = styled("section", {
  marginTop: "$xxlarge",
});
