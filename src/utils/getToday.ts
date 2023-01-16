export const getToday = (string?: string) => {
  const when = string ? new Date(string) : new Date();
  const year = when.getFullYear();
  const month = String(when.getMonth() + 1).padStart(2, '0');
  const day = String(when.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
