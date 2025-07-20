const config = {
  apiUrl: "",
}
if (process.env.ENV === "development") {
  config.apiUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:3000";
} else {
  // config.apiUrl = process.env.WEB_BASE_URL || "something production";
}

export const NEXT_PUBLIC_SERVER_BASE_URL = config.apiUrl;