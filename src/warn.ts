const warn = (message: string) => {
  if (typeof console !== 'undefined') console.warn(message);
};

export { warn };
