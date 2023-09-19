import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const RedirectText = styled("span")({
  color: "#00Aff4",
  fontWeight: 500,
  cursor: "pointer",
});

const RedirectInfo = (props) => {
  const { text, redirectText, additionalStyle, redirectHandler } = props;
  return (
    <Typography
      sx={{ color: "#72767d" }}
      style={additionalStyle ? additionalStyle : {}}
      variant="subtitle2"
    >
      {text}
      <RedirectText onClick={redirectHandler}>{redirectText}</RedirectText>
    </Typography>
  );
};

export default RedirectInfo;
