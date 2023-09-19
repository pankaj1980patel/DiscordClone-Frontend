import React, { useState, useEffect } from "react";
import AuthBox from "../../shared/components/AuthBox";
import { Typography } from "@mui/material";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooter from "./RegisterPageFooter";
import { validateRegisterForm } from "../../shared/util/Validators";
import { getActions } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

// import "./RegisterPage.css";
const RegisterPage = ({register}) => {
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    setIsFormValid(validateRegisterForm({ mail, password, username }));
  }, [mail, password, username, setIsFormValid]);

  const handleRegister = () => {
    console.log("registerd");
    register({mail,username,password}, navigator)
  };
  return (
    <AuthBox>
      <Typography
        variant="h5"
        sx={{
          color: "white",
        }}
      >
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
      />
      <RegisterPageFooter
        title="Create Account"
        isFormValid={isFormValid}
        handleRegister={handleRegister}
      />
    </AuthBox>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionToProps)(RegisterPage);
