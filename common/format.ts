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

export const formatTelNumber = (tel: string) => {
  if (tel.includes("-")) {
    return tel;
  }

  // 010-0000-0000

  if (tel.length > 10) {
    return (
      tel.slice(0, 3) + "-" + tel.slice(3, 7) + "-" + tel.slice(7, tel.length)
    );
  }

  // 010-000-0000
  return (
    tel.slice(0, 3) + "-" + tel.slice(3, 6) + "-" + tel.slice(6, tel.length)
  );
};
