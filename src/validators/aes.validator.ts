const validLengths = new Set([16, 24, 32]);

const aesValidator = () => {
  const encoder = new TextEncoder();
  return (key: string) => validLengths.has(encoder.encode(key).length);
};

export default aesValidator;
