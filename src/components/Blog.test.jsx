import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Blog } from './Blog.jsx'

test('shows title and author, but hides url or likes by default', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  render(<Blog blog={blog} />)

  expect(screen.getByText(/React patterns/i)).toBeVisible()
  expect(screen.getByText(/Michael Chan/i)).toBeVisible()
})
