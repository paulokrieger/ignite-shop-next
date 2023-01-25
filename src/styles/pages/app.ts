import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignContent: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
  width: "100%",
  maxWidth: 1180,

  margin: "0 auto",
  padding: "2rem 0",

  display: "flex",
  justifyContent: "space-between",

  button: {
    width: "3rem",
    height: "3rem",

    border: 0,
    borderRadius: 6,

    background: "$gray800",
    color: "$gray300",

    cursor: "pointer",

    position: "relative",

    span: {
      position: "absolute",
      width: "1.75rem",
      height: "1.75rem",

      top: "calc(-1.25rem / 2)",
      right: "calc(-1.25rem / 2)",

      background: "$green500",
      color: "$gray100",

      border: "3px solid $gray900",
      borderRadius: 1000,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      fontWeight: 700,
    },
  },
});
