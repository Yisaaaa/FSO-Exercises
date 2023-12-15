import React from 'react'

const Add = ({ newName, newNumber, handleNewNumber, handleNewName, handleSubmit }) => {
    return (
        <>

            <h2 className="text-3xl font-semibold">Add a new</h2>
            <form className="flex gap-0 flex-col " onSubmit={handleSubmit}>
                <div className="mb-3 flex flex-col gap-2">
                    <div className="">
                        <span className="font-semibold">name:</span> <input
                            required
                            value={newName}
                            onChange={(e) => handleNewName(e.target.value)}
                            className="border-2 border-gray-600 " />
                    </div>
                    <div>
                        <span className="font-semibold">number: </span>
                        <input
                            required
                            className="border-2 border-gray-600"
                            value={newNumber}
                            onChange={(e) => handleNewNumber(e.target.value)} />
                    </div>
                </div>
                <div>
                    <button
                        className="text-white bg-slate-800 px-4 rounded"
                        type="submit">add</button>
                </div>
            </form>
            <div className="mb-8">debug: {newName} {newNumber}</div>
        </>
    )
}

export default Add