export const rupiahFormatter = (value: string | undefined) => {
  if (!value || isNaN(Number(value))) return "0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(Number(value))
    .replace("Rp", "")
    .trim();
};

export const parseRupiah = (value: string): string => {
  if (!value) return "";
  return value.replace(/[^\d]/g, "");
};
