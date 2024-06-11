import React from "react";

import InputWithLabel from "../../shared/components/InputWithLabel";
const LoginPageInputs = (props) => {
  return (
    <>
    <InputWithLabel
      value={props.mail}
      setValue={props.setMail}
      label="E-mail"
      type="text"
      placeholder="Enter e-mail address"
    />
    <InputWithLabel
      value={props.password}
      setValue={props.setPassword}
      label="Password"
      type="password"
      placeholder="Enter password"
    />
    </>
  );
};

export default LoginPageInputs;
