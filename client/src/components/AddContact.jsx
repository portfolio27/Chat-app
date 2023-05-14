import { useState } from "react"

const AddContact = ({handleChange, query, setContacts})=> {
    const [message, setMessage] = useState('')
    const addContact = async (props) => {
        const response = await fetch('/add', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                query: query,
                userId: localStorage.getItem('user')
            })
        })

        const data = await response.json()
        const message = data.message;
        console.log(message)
        setContacts(message)

        if (response.status === 422 || response.status === 401) {
            setMessage(message)
        } else if (response.status == 200) {
            console.log('Sucess')
        } else {
            console.log(message)
        }

    }


    return (
        <div>
            <input onChange={handleChange} value={query}></input>
            <button onClick={addContact}>Add</button>
        </div>
    )
}

export default AddContact;