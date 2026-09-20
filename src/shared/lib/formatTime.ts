type DateFormat = 'date' | 'time' | 'datetime';

export function formatDateTime(
  dateTime?: string | null,
  format: DateFormat = 'datetime',
  locales = 'uk-UA',
) {
  if (!dateTime) {
    return '-';
  }

  const date = new Date(dateTime);

  if (Number.isNaN(date.getTime)) {
    return '-';
  }

  let options = {};

  if (format === 'datetime') {
    options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
  } else if (format === 'date') {
    options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
  } else if (format === 'time') {
    options = {
      hour: '2-digit',
      minute: '2-digit',
    };
  }

  return Intl.DateTimeFormat(locales, options).format(date);
}
