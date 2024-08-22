export const formatCurrency = (
  locale: string = "id-ID",
  currencyCode: string = "IDR"
) => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
    });
  } catch (error) {
    throw new Error("Invalid locale or currency code");
  }
};
