export const randomFloat = (max: number, min: number) => {
  return Math.random() * (max - min) + min;
};
