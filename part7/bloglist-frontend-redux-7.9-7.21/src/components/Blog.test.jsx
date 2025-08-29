import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

describe('<Blog />', () => {
  let container
  let mockHandler
  const blog = {
    author: 'anne',
    id: '6896',
    likes: 3,
    title: 'part6',
    url: 'http://localhost:5173/blog/9',
    user: {
      id: '995',
      name: 'Superuser',
      username: 'root',
    },
  }

  beforeEach(() => {
    mockHandler = vi.fn()
    container = render(<Blog blog={blog} addLikes={mockHandler} />).container
  })

  test('renders author and title by default', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('part6 anne')
  })

  test('does not render url or likes by default', () => {
    const div = container.querySelector('.blog')
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes.toString())
  })

  test('after clicking the button,render url or likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes.toString())
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
