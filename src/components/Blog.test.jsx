import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('url and likes are rendered when expanded', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()

  await user.click(screen.getByRole('button', { name: /view/i }))

  expect(screen.getByText(/reactpatterns.com/i)).toBeVisible()
  expect(screen.getByText(/likes 7/i)).toBeVisible()
})
