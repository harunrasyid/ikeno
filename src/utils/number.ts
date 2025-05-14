export const randomFloat = (max: number, min: number) => {
  return Math.random() * (max - min) + min;
};

export const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
