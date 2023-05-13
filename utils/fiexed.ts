/** 별점 소수점 반올림 */
export const floatFixed = (num: any, fixed: number) => {
  return +Number.parseFloat(num).toFixed(fixed);
};
