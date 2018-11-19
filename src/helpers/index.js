export const validateEmail = email => {
  const parse_email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return parse_email.test(email);
};

export const validateUser = user => {
  const hasFirstName =
    typeof user.firstName === "string" && user.firstName.trim() !== "";
  const hasLastName =
    typeof user.lastName === "string" && user.lastName.trim() !== "";
  const hasEmail =
    typeof user.email === "string" &&
    user.email.trim() !== "" &&
    validateEmail(user.email);
  const hasPassword =
    typeof user.password === "string" && user.password.trim() !== "";
  return hasFirstName && hasLastName && hasEmail && hasPassword;
};
