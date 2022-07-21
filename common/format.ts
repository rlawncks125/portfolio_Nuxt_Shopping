export const formatToWon = (price: string, isCurrency = false) => {
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
