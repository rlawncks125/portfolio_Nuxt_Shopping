export const HangulValidation = (str: string) => {
  const hangulReg = new RegExp("[ㄱ-ㅎㅏ-ㅣ가-힣]", "g");

  return hangulReg.test(str);
};
export const PasswordValidation = (str: string) => {
  const regexPassword = new RegExp(
    "^(.{0,5}|[^0-9]*|[^A-Za-z]*|[a-zA-Z0-9]*)$"
  );

  return !regexPassword.test(str);
};
export const EmailValidation = (str: string) => {
  const regexEmail = new RegExp(
    "^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9-]+[.]{1}[a-zA-Z0-9-.]+$"
  );

  return regexEmail.test(str);
};
export const TelValidation = (str: string) => {
  const regexTel = new RegExp("^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$");

  return regexTel.test(str);
};
