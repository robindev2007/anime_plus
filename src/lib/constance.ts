export const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
export const BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : process.env.BASE_URL;
