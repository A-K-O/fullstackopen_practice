const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogList = await Blog.find({})
	response.json(blogList)
})

blogsRouter.post('/', (request, response, next) => {
	const { title, author, url, likes } = request.body

	console.log(request.body)

	const blog = new Blog({ title, author, url, likes })

	blog.save()
		.then((savedBlog) => {
			response.json(savedBlog)
		})
		.catch(error => next(error))
})

module.exports = blogsRouter
