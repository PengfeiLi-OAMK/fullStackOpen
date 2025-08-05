const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const blogsLikes = blogs.map((blog) => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.length === 0 ? 0 : blogsLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const blogsLikes = blogs.map((blog) => blog.likes)
  const mostLikes = Math.max(...blogsLikes)
  return blogs.find((blog) => blog.likes === mostLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const groupbyAuthor = _.groupBy(blogs, 'author')
  const blogCount=_.map(groupbyAuthor, (entries, author) => ({ author, blogs: entries.length }))
  return _.maxBy(blogCount,'blogs')
  
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const groupbyAuthor = _.groupBy(blogs, 'author')
  const likesCount = _.map(groupbyAuthor, (entries, author) => ({
    author,
    likes: totalLikes(entries),
  }))
  return _.maxBy(likesCount, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
