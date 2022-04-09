export const base64toBlob = (base64: string, type: string) =>
  fetch(`data:${type};base64,${base64}`).then((result) => result.blob());

export const download = (objectUrl: string, filename: string) => {
  console.log(`dl: ${filename}`);

  const a = document.createElement(`a`);
  // document.body.append(a);
  // a.style = `display: none`;
  a.href = objectUrl;
  a.download = filename;
  a.click();
};
