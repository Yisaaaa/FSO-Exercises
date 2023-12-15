import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import axios from "axios"
import numberService from "./service/numbers"
import Add from "./components/Add"
import Person from "./components/Person"
import Filter from "./components/Filter"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    const [filterName, setFilter] = useState("")

    useEffect(() => {
        numberService.getAll().then(all => {
            setPersons(all)
        })
    }, [])


    function handleSubmit(e) {
        e.preventDefault()
        if (nameAlreadyExists()) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        // Add person to the db
        const newPerson = { name: newName, number: newNumber }
        numberService.create(newPerson)
            .then(returnedPerson => {
                setPersons(prev => [...prev, returnedPerson])
                setNewName("")
                setNewNumber("")
            })



    }

    function nameAlreadyExists() {
        for (let person of persons) {
            if (person.name === newName) {
                return true
            }
        }
        return false
    }

    function handleDelete(id, name) {
        const confirmation = confirm(`Delete ${name}?`)
        if (confirmation) {
            numberService.remove(id)
                .then(data => console.log(data))
                .catch(error => alert("The person you is already deleted"))
            setPersons(prevPersons => prevPersons.filter(person => person.id !== id))
        }
    }

    const filteredNumbers = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

    const filteredNumbersElements = filteredNumbers.map(person => <Person
        key={person.name}
        name={person.name}
        number={person.number}
        handleDelete={() => handleDelete(person.id, person.name)} />)


    return (
        <div className="flex gap-4 flex-col text-lg p-9">
            <h1 className="text-4xl text-slate-900 font-extrabold">Phonebook</h1>

            <Filter value={filterName}
                handleChange={setFilter} />

            <Add newName={newName}
                handleNewName={setNewName}
                newNumber={newNumber}
                handleNewNumber={setNewNumber}
                handleSubmit={handleSubmit} />


            <h2 className="text-3xl font-bold">Numbers</h2>

            <div className="flex flex-col gap-4">
                {filteredNumbersElements}

            </div>
        </div>


    )
}

export default App