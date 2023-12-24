const BASE_URL = "http://24.144.91.45:5000";

export const request = async (
  url,
  method,
  headers = {},
  body,
  stringify = true
) => {
  const options = {
    method,
    headers,
    body: stringify ? JSON.stringify(body) : body,
  };

  const res = await fetch(BASE_URL + url, options);
  const data = await res.json();
  return data;
};
