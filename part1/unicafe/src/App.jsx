import React from 'react'
import { useState } from 'react'

const Button = ({ onClick, text }) => {
    return <button
        onClick={onClick}
        className="text-base px-2 py-1 text-white font-bold bg-gray-800 rounded">{text}</button>
}

const Display = ({ text, value }) => {
    return <p className="text-xl">{text} {value}</p>
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    function positive() {
        console.log(good, bad, neutral)
        const total = good + bad + neutral;
        if (total === 0) {
            return 0
        } else {
            return (good / total) * 100
        }
    }

    return (
        <div className="p-5">
            <h1 className="text-gray-800 text-4xl font-extrabold mb-5">Give feedback</h1>
            <div className="flex gap-4 mb-8">
                <Button onClick={() => setGood(n => n + 1)} text={"good"} />
                <Button onClick={() => setNeutral(n => n + 1)} text={"neutral"} />
                <Button onClick={() => setBad(n => n + 1)} text={"bad"} />
            </div>

            <h2 className="text-gray-800 text-2xl font-semibold mb-5">Statistics</h2>
            <div className="flex flex-col gap-3">
                <Display text={"good"} value={good} />
                <Display text={"neutral"} value={neutral} />
                <Display text={"bad"} value={bad} />
                <Display text={"all"} value={good + bad + neutral} />
                <Display text={"average"} value={(good + bad + neutral) / 3} />
                <Display text={"positive"} value={`${positive()}%`} />
            </div>
        </div>
    )
}

export default App