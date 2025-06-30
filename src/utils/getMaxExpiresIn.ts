export const getMaxExpiresIn = (): number => {
  const currentTime = new Date();

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const timeDiffMs = endOfDay.getTime() - currentTime.getTime();

  const maxExpiresInHours = timeDiffMs / (1000 * 60 * 60);

  return Math.floor(maxExpiresInHours);
};