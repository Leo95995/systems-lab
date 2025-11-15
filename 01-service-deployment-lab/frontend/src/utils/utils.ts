const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

const getTimestamp = (date: Date) => date.getTime();

export const utils = { formatDate, getTimestamp };
