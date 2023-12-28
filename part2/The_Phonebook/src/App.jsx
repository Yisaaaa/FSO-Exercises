import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import axios from "axios";
import numberService from "./service/numbers";
import Add from "./components/Add";
import Person from "./components/Person";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterName, setFilter] = useState("");
    const [message, setMessage] = useState({});

    useEffect(() => {
        numberService.getAll().then((all) => {
            setPersons(all);
        });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        let personIfExists = nameAlreadyExists();

        if (personIfExists) {
            if (!checkIfSameNumber(personIfExists)) {
                let newPerson = { ...personIfExists, number: newNumber };
                numberService
                    .changeNumber(personIfExists.id, newPerson)
                    .then((data) => {
                        setPersons((prevPersons) => {
                            return prevPersons.map((person) =>
                                person.id !== personIfExists.id ? person : data
                            );
                        });
                    })
                    .catch((err) => {
                        console.log(err.response.data.error);
                        setMessage({
                            status: "error",
                            content: err.response.data.error,
                        });
                        setTimeout(() => setMessage({}), 5000);
                    });
                return;
            } else {
                // alert(`${newName} is already added to phonebook`)
                const content = `${personIfExists.name} has already been 
                added to phonebook`;
                setMessage({ status: "error", content });
                setTimeout(() => {
                    setMessage({});
                }, 5000);
                return;
            }
        }

        addPerson();
    }

    function addPerson() {
        // Add person to the db
        const newPerson = { name: newName, number: newNumber };
        numberService
            .create(newPerson)
            .then((returnedPerson) => {
                setPersons((prev) => [...prev, returnedPerson]);
                setNewName("");
                setNewNumber("");

                const content = `Added ${newPerson.name} to the phonebook`;
                setMessage({ status: "success", content });
                setTimeout(() => setMessage({}), 5000);
            })
            .catch((err) => {
                console.log(err);
                setMessage({
                    status: "error",
                    content: err.response.data.error,
                });
                setTimeout(() => setMessage({}), 5000);
            });
    }

    function nameAlreadyExists() {
        for (let person of persons) {
            if (person.name === newName) {
                return person;
            }
        }
        return false;
    }

    function checkIfSameNumber(person) {
        return person.number === newNumber;
    }

    function handleDelete(id, name) {
        const confirmation = confirm(`Delete ${name}?`);
        if (confirmation) {
            numberService
                .remove(id)
                .then(() => {
                    const content = `${name} is deleted from the phonebook`;
                    setMessage({ status: "error", content });

                    setTimeout(() => setMessage({}), 5000);
                })
                .catch((error) => {
                    const content = `Information of ${name} has already
                    been removed from the server`;

                    setMessage({ status: "error", content });

                    setTimeout(() => setMessage({}), 5000);
                });
            setPersons((prevPersons) =>
                prevPersons.filter((person) => person.id !== id)
            );
        }
    }

    const filteredNumbers = persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
    );

    const filteredNumbersElements = filteredNumbers.map((person) => (
        <Person
            key={person.name}
            name={person.name}
            number={person.number}
            handleDelete={() => handleDelete(person.id, person.name)}
        />
    ));

    return (
        <div className="flex gap-4 flex-col text-lg p-9">
            <h1 className="text-4xl text-slate-900 font-extrabold">
                Phonebook
            </h1>

            {message.status && (
                <Notification
                    status={message.status}
                    message={message.content}
                />
            )}

            <Filter value={filterName} handleChange={setFilter} />

            <Add
                newName={newName}
                handleNewName={setNewName}
                newNumber={newNumber}
                handleNewNumber={setNewNumber}
                handleSubmit={handleSubmit}
            />

            <h2 className="text-3xl font-bold">Numbers</h2>

            <div className="flex flex-col gap-4">{filteredNumbersElements}</div>
        </div>
    );
};

export default App;
