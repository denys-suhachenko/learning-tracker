export const HOUR_MINUTES = 60;
export const DAY_MINUES = 1440;
export const MONTH_MINUTES = 43_800;
export const YEAR_MINUTES = 525_600;

const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? '' : 's'}`;

export function formatInterval(interval: number) {
  if (interval < HOUR_MINUTES) {
    return `${interval} min`;
  } else if (interval < DAY_MINUES) {
    const hour = Math.round(interval / HOUR_MINUTES);
    return plural(hour, 'hour');
  } else if (interval < MONTH_MINUTES) {
    const day = Math.round(interval / DAY_MINUES);
    return plural(day, 'day');
  } else if (interval < YEAR_MINUTES) {
    const month = Math.round(interval / MONTH_MINUTES);
    return plural(month, 'month');
  } else {
    const year = Math.round(interval / YEAR_MINUTES);
    return plural(year, 'year');
  }
}
