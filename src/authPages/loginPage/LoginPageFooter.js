import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";

const LoginPageFooter = (props) => {
  return (
    <CustomPrimaryButton
      label="LOGIN"
      additionalStyles={{ marginTop: "30px" }}
      disable={!props.isFormValid}
      onClick={props.handleLogin}
    />
  );
};

export default LoginPageFooter;
