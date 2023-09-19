import React from "react";
import { Button } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";

const MainPageButthon = (props) => {
  return (
    <Button
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "white",
        backgroundColor: "#5865f2",
      }}
    >
      <GroupsIcon />
    </Button>
  );
};

export default MainPageButthon;
