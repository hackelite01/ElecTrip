export const secondsToHms = (d) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins ") : "";
  return hDisplay + mDisplay;
};
