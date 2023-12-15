import React from 'react'

const Filter = ({ value, handleChange }) => {
    return (
        <div>
            <p>Filter shown with a:</p>
            <input
                className="border-2 border-slate-700 px-2"
                value={value}
                onChange={(e) => handleChange(e.target.value)} />
        </div>
    )
}

export default Filter