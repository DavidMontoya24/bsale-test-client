import { URI } from "../config.js";

const fetchAPI = async (endpoint, { method, body } = {}) => {
  const config = {
    method: method || (body ? "POST" : "GET"),
  };

  const response = await fetch(URI + endpoint, config);

  let data;
  if (!response.ok) {
    try {
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    throw new Error(JSON.stringify(data));
  }

  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }
  return data;
};

export default fetchAPI;
