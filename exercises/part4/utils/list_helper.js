const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	let count = 0

	for (let i = 0; i < blogs.length; i++) {
		count += blogs[i].likes
	}

	return count
}

const favouriteBlog = (blogs) => {
	let count = -1
	let favBlog = null

	for (let i = 0; i < blogs.length; i++) {
		const current = blogs[i].likes
		if (count < current) {
			count = current
			favBlog = blogs[i]
		}
	}

	return favBlog
}

const mostBlogs = (blogs) => {
	const aux = {}

	for (let i = 0; i < blogs.length; i++) {
		const author = blogs[i].author
		if (!(author in aux)) {
			aux[author] = 1
		} else {
			aux[author] += 1
		}
	}

	const max = Object.entries(aux).reduce(
		(best, entry) => entry[1] > best[1] ? entry : best,
		[null, -Infinity]
	)
	return max[0] === null ? null : { author: max[0], blogs: max[1] }

}

const mostLikes = (blogs) => {
	const aux = {}

	for (let i = 0; i < blogs.length; i++) {
		const blog = blogs[i]
		if (!(blog.author in aux)) {
			aux[blog.author] = blog.likes
		} else {
			aux[blog.author] += blog.likes
		}
	}

	const max = Object.entries(aux).reduce(
		(best, entry) => entry[1] > best[1] ? entry : best,
		[null, -Infinity]
	)
	return max[0] === null ? null : { author: max[0], likes: max[1] }

}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
}
