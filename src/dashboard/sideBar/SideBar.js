import React from "react";
import { styled } from "@mui/system";
import MainPageButthon from "./MainPageButthon";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});
const SideBar = (props) => {
  return <MainContainer>
    <MainPageButthon/>
  </MainContainer>;
};

export default SideBar;
