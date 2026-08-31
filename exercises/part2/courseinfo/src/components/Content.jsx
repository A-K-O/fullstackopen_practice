import Part from "./Part"

const Content = ({parts}) => {
	const total = parts.reduce((s,p) => s + p.exercises, 0)
	

	return (
		<>
			{parts.map(part => <Part key={part.id} part={part}/>)}
			<p>total of {total} exercises</p>
		</>
	)
}

export default Content
