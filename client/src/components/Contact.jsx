import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchName from "./SeachName";
import Chat from "./Chat"
import AddContact from "./AddContact";
import Logout from "./Logout"

const Contact =  (props) => {
    const [query, setQuery] = useState('');
    const [chatUser, setChatUser] = useState('')
    const [contacts, setContacts] = useState([])
    const [selectUser, setSelectUser] = useState('')
    const [userId, setUserId] = useState(localStorage.getItem('userId'))
    const [chatId, setChatId] = useState("")
    const [prevChats, setPrevChats] = useState([])
    const [isActive, setIsActive] = useState(false)

    const navigate = useNavigate();

    useEffect(()=> {
        getContact()
    }, [])

    const getContact = async () => {
        const response = await fetch('/get-contact', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                userId: localStorage.getItem('user')
            })
        })
        const message = await response.json()
        setContacts(message.message)
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setQuery(value);
    }

    const listItems = contacts.map((number, index) =>
        <SearchName key={index} setIsActive={setIsActive} setPrevChats={setPrevChats} selectUser={setChatUser} commonKey={setSelectUser} setChatId={setChatId} name={number[0]} findId={number[1]} ckey={number[2]} chatId={number[4]}/>
    );
    
    return (
        <div>
            <Logout />
            <AddContact query={query} handleChange={handleChange} setContacts={setContacts} />

            <div className="">
                <div className="row">
                    <div className="col">
                        <ul>
                            {listItems}
                        </ul>
                    </div>

                    <div className="col">
                        {isActive? <Chat userId={userId} destinationUserId={selectUser} chatId={chatId} /> : ""}            

                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Contact;