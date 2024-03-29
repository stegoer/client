export const base64toBlob = (base64: string, type: string): Promise<Blob> =>
  fetch(`data:${type};base64,${base64}`).then((result) => result.blob());

export const download = (objectUrl: string, filename: string) => {
  const a = document.createElement(`a`);
  // document.body.append(a);
  // a.style = `display: none`;
  a.href = objectUrl;
  a.download = filename;
  a.click();
};
