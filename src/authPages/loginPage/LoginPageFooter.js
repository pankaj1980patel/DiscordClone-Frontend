import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMsg = () => {
    return "Enter correct e-mail address and password should contain aleast of 6 chacracter."
}
const getFormValidMsg = () => {
    return "Press to login"
}

const LoginPageFooter = (props) => {
  const navigate = useNavigate();
  const handlePushToRegisterPage = () => {
    navigate("/register");
  };
  return (
    <>
      <Tooltip title={!props.isFormValid ? getFormNotValidMsg() : getFormValidMsg()}>
        <div>
          <CustomPrimaryButton
            label="LOGIN"
            additionalStyles={{ marginTop: "30px" }}
            disable={!props.isFormValid}
            onClick={props.handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account? "
        redirectText="Create an account"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;
