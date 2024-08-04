import axios from 'axios'

const BASE_URL = '/api/blogs'

let token = null
export const setToken = (newToken) => (token = newToken)

export async function getAllBlogs() {
  const response = await axios.get(BASE_URL)
  return response.data
}

export async function createBlog(blogObject) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(BASE_URL, blogObject, config)

  return response.data
}

export async function updateBlog(id, blogObject) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`${BASE_URL}/${id}`, blogObject, config)

  return response.data
}

export async function deleteBlog(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${BASE_URL}/${id}`, config)

  return response.data
}
