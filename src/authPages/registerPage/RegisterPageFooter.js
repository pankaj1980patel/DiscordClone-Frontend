import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMsg = () => {
    return "Enter correct e-mail address, username of atleast 5 character and password should contain aleast of 6 chacracter."
}
const getFormValidMsg = () => {
    return "Press to register"
}

const RegisterPageFooter = (props) => {
  const navigate = useNavigate();
  const handlePushToLoginPage = () => {
    navigate("/login");
  };
  return (
    <>
      <Tooltip title={!props.isFormValid ? getFormNotValidMsg() : getFormValidMsg()}>
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            disable={!props.isFormValid}
            onClick={props.handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text=""
        redirectText="Already have an account?"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default RegisterPageFooter;
