export function convertToUTC(date: string | Date): string {
  let parsedDate: Date;

  if (typeof date === 'string') {
    // Assuming the input string is in the format 'yyyy-MM-dd HH:mm:ss'
    const [datePart, timePart] = date.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    parsedDate = new Date(year, month - 1, day, hours, minutes, seconds);
  } else {
    parsedDate = date;
  }
  const utcDate = new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000);
  const year = utcDate.getUTCFullYear();
  const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getUTCDate()).padStart(2, '0');
  const hours = String(utcDate.getUTCHours()).padStart(2, '0');
  const minutes = String(utcDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(utcDate.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function convertFromUTCToLocal(utcDate: string): string {
  const date = new Date(utcDate);
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  const hours = String(localDate.getHours()).padStart(2, '0');
  const minutes = String(localDate.getMinutes()).padStart(2, '0');
  const seconds = String(localDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
