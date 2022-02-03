export const getItem = (item: string): string | null => {
  if (typeof localStorage !== `undefined`) {
    localStorage.setItem(
      `token`,
      `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDM5MjI3MjUsInVzZXJuYW1lIjoibWFzdGVyIn0.B3QQn6_elgOJpxZ28YV5eQrvs_oUfnay1i2am1v3ZBU`,
    );
    return localStorage.getItem(item);
  } else {
    console.warn(`localStorage is not available, key: ${item}`);
  }
  return null;
};
