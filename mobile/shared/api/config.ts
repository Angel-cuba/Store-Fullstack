export const BASE_URL = (() => {
  const url = process.env.EXPO_PUBLIC_API_URL;
  if (!url) throw new Error('EXPO_PUBLIC_API_URL is not set. Copy .env.example to .env and fill in the values.');
  return url;
})();
