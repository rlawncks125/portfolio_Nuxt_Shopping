export const HangulValidation = (str: string) => {
  const hangulReg = new RegExp("[ㄱ-ㅎㅏ-ㅣ가-힣]", "g");

  return hangulReg.test(str);
};
