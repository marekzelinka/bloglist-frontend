import axios from "axios";

const BASE_URL = "/api/blogs";

export const getAllBlogs = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
