import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
	if (props.total === 0) {
		return (
			<p>No feedback given</p>
		)
	}
	return (
		<>
			<h1>statistics</h1>
			<table>
			<StatisticLine text="good" value={props.good} />
			<StatisticLine text="neutral" value={props.neutral} />
			<StatisticLine text="bad" value={props.bad} />
			<StatisticLine text="all" value={props.total} />
			<StatisticLine text="average" value={props.average} />
			<StatisticLine text="positive" value={props.positive} />
			</table>
		</>
	)
}

const StatisticLine = (props) => {
	return (
		<tr>
			<td>{props.text}</td>
			<td>{props.value}</td>
		</tr>
	)
}

const increaseByOne = (value, setValue) => setValue(value + 1)

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	
	let total = good + neutral + bad
	let average = ((good * 1) + (neutral * 0) + (bad * -1))/ total
	let positive = (good/total) * 100

	console.log("good", good)
	console.log("neutral", neutral)
	console.log("bad", bad)
		
	return (
		<div>
			<h1>give feedback</h1>
			<Button onClick={() => increaseByOne(good, setGood)} text="good" />
			<Button onClick={() => increaseByOne(neutral, setNeutral)} text="neutral" />
			<Button onClick={() => increaseByOne(bad, setBad)} text="bad" />
			<Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
		</div>
	)
}

export default App

