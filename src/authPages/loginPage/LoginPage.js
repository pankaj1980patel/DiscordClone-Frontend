import React, { useEffect, useState } from "react";
import AuthBox from "../../shared/components/AuthBox";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInputs";
import LoginPageFooter from "./LoginPageFooter";
import { validateLoginForm } from "../../shared/util/Validators";
import { getActions } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

// import "./LoginPage.css";
const LoginPage = ({ login }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);
  const handleLogin = () => {
    console.log("Login");
    login({ mail, password }, navigator);
  };

  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionToProps)(LoginPage);
