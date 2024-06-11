import { Button } from "@mui/material";
import React from "react";

const CustomPrimaryButton = (props) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: "#5865f2",
        color: "white",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 500,
        width: "100%",
        height: "40px",
      }}
      style={props.additionalStyles ? props.additionalStyles : {}}
      disabled={props.disable}
      onClick={props.onClick}
    >
      {props.label}
    </Button>
  );
};

export default CustomPrimaryButton;
