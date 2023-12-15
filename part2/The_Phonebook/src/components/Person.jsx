import React from 'react'

const Person = ({ name, number, handleDelete }) => {
    return (

        <div className="flex gap-3">
            <p className="text-lg">{name} {number}</p>

            <button
                onClick={handleDelete}
                className="rounded bg-gray-900 text-white text-sm font-extrabold px-2">Delete</button>
        </div>
    )
}

export default Person