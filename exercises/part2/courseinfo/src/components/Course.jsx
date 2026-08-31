import Header from "./Header"
import Content from "./Content"

const Course = ({course}) => {
	return (
		<>
			<Header course={course}/>
			<Content parts={course.parts}/>
		</>
	)
}

export default Course
