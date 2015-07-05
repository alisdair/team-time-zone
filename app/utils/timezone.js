const secondsInHour = 3600;

export function timezoneStart(offset) {
  return Math.floor(offset / secondsInHour) * secondsInHour;
}

export function timezoneNext(start) {
  return start + secondsInHour;
}
