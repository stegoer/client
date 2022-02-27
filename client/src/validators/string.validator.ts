const stringValidator = (length: number) => (string: string) => {
  return string.length >= length;
};

export default stringValidator;
