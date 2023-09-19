export const validateLoginForm = ({ mail, password }) => {
  const isMailValid = validateMail(mail);
  const isPasswordValid = validateLength(password, 5);
  return isMailValid && isPasswordValid;
};

export const validateRegisterForm = ({ mail, username, password }) => {
  const isMailValid = validateMail(mail);
  const isPasswordValid = validateLength(password, 5);
  const isUsernameValid = validateLength(username, 4);
  return isMailValid && isPasswordValid && isUsernameValid;
};

const validateLength = (str, len) => {
  return str.length > len;
};
export const validateMail = (mail) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(mail);
};
