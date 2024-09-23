export const getCurrentTime = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let time;

  if (currentHour < 12) {
    time = "Pagi";
  } else if (currentHour < 18) {
    time = "Siang";
  } else {
    time = "Malam";
  }

  return time;
};
