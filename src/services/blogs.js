import axios from "axios";

const BASE_URL = "/api/blogs";

let token = null;
export const setToken = (newToken) => (token = newToken);

export async function getAllBlogs() {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function createBlog(blogObject) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(BASE_URL, blogObject, config);

  return response.data;
}
