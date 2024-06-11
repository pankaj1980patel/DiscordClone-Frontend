import React from "react";
import { styled } from "@mui/system";
import BasicMenu from "./DropDownMenu";
import ChosenOptionLabel from "./ChosenOptionLabel";

const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "48px",
  borderBottom: "1px solid black",
  backgroundColor: "#36393f",
  width: "calc(100% - 326px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
});
const AppBar = (props) => {
  return (
    <MainContainer>
      <ChosenOptionLabel />
      <BasicMenu />
    </MainContainer>
  );
};

export default AppBar;
