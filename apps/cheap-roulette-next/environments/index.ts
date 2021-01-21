export const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_API_URL
    : process.env.PROD_API_URL;
