export const getDateTimeFromFormattedString = (formattedString) => {
  const parts = formattedString.split(" - ");
  const datePart = parts[0];
  const timePart = parts[1];

  const [day, month, year] = datePart.split(" ");
  const [hour, minute] = timePart.split(".");

  const monthIndex = getMonthIndexFromMonthName(month);

  return new Date(year, monthIndex, day, hour, minute);
};

export const getMonthIndexFromMonthName = (monthName) => {
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return monthNames.findIndex((name) => name === monthName);
};
