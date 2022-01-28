export const DATE_FORMAT = "YYYY-MM-DD";

export const formatMoney = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(amount);
};
