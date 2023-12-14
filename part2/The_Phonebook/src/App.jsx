import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilter] = useState("")


  function handleSubmit(e) {
    e.preventDefault()
    if (nameAlreadyExists()) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(prev => [...prev, { name: newName, number: newNumber }])
    setNewName("")
    setNewNumber("")
  }

  function nameAlreadyExists() {
    for (let person of persons) {
      if (person.name === newName) {
        return true
      }
    }
    return false
  }

  const filteredNumbers = persons.filter(person => person.name.toLowerCase().startsWith(filterName))
  const filteredNumbersElements = filteredNumbers.map(person => <p key={person.name} className="text-lg">{person.name} {person.number}</p>)


  return (
    <div className="flex gap-4 flex-col text-lg p-9">
      <h1 className="text-4xl text-slate-900 font-extrabold">Phonebook</h1>

      <div>
        <p>Filter shown with a:</p>
        <input
          className="border-2 border-slate-700 px-2"
          value={filterName}
          onChange={(e) => setFilter(e.target.value)} />
      </div>


      <h2 className="text-3xl font-semibold">Add a new</h2>
      <form className="flex gap-0 flex-col " onSubmit={handleSubmit}>
        <div className="mb-3 flex flex-col gap-2">
          <div className="">
            <span className="font-semibold">name:</span> <input
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border-2 border-gray-600 " />
          </div>
          <div>
            <span className="font-semibold">number: </span>
            <input
              required
              className="border-2 border-gray-600"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)} />
          </div>
        </div>
        <div>
          <button
            className="text-white bg-slate-800 px-4 rounded"
            type="submit">add</button>
        </div>
      </form>
      <div className="mb-8">debug: {newName} {newNumber}</div>
      <h2 className="text-3xl font-bold">Numbers</h2>

      <div className="flex flex-col gap-1">
        {filteredNumbersElements}

      </div>
    </div>


  )
}

export default App