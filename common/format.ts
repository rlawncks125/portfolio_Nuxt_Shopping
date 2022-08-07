export const formatToWon = (price: string | number, isCurrency = false) => {
  return new Intl.NumberFormat(
    "ko-KR",
    isCurrency
      ? {
          style: "currency",
          currency: "KRW",
        }
      : {}
  ).format(+price);
};
