import React from 'react'

const Notification = ({ status, message }) => {
    return (
        <div
            className={`border-4 px-3 py-1 font-semibold bg-gray-300
            ${status === "success" ? "border-green-600 text-green-700"
                    : "border-red-600 text-red-600"}`}
        >
            {message}
        </div>
    )
}

export default Notification