export const toHours = (totalSeconds: number) => {
  const totalMinutes = Math.floor(totalSeconds / 60);
  return `UTC ${totalSeconds > 0 ? '+' : ''} ${Math.floor(totalMinutes / 60)}`;
};
