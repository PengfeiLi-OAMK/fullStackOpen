import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <>
      <Table striped>
        <tbody>
          {sortedBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Blog blog={blog} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
export default BlogList
