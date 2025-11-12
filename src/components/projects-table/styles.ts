import { styled } from "../../assets/styles/stitches.config";

export const TableWrapper = styled("div", {
  overflowX: "auto",
  width: "100%",
  marginTop: "$medium",
  background: "$white",
  borderRadius: "12px",
  boxShadow: "$medium",
});

export const Table = styled("table", {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0",
  fontFamily: "$primary",
  
  "& th, td": {
    textAlign: "left",
    padding: "$small $medium",
  },
});

export const Th = styled("th", {
  background: "$secondary",
  color: "$white",
  fontSize: "$regular",
  fontWeight: "$bold",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  position: "sticky",
  top: 0,
  zIndex: 10,

  "&:first-child": {
    borderTopLeftRadius: "12px",
  },
  "&:last-child": {
    borderTopRightRadius: "12px",
  },
});

export const Td = styled("td", {
  fontSize: "$regular",
  color: "$darkGray",
  borderBottom: "1px solid $lightGray",
  transition: "background-color 0.2s",
  
  variants: {
    priority: {
      4: { color: "$errorDark", fontWeight: "$bold" },
      3: { color: "$warningDark", fontWeight: "$bold" },
    },
  },
});

export const Tr = styled("tr", {
  "&:hover": {
    background: "$lightGray",
  },

  "&:last-child td": {
    borderBottom: "none",
  },
});

export const NoDataMessage = styled("div", {
  padding: "$xlarge",
  textAlign: "center",
  color: "$mediumGray",
  fontSize: "$large",
});
