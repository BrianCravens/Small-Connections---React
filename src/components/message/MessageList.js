import React, { useState, useEffect } from 'react';
import MessageCard from './MessageCard';
import dataManager from '../../modules/dataManager'
import currentUser from "../../hooks/ui/useSimpleAuth"
import { Link } from 'react-router-dom';


const MessageList = props => {
    
    const [messages, setMessages] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [text, setText] = useState({})

    

    const getRequests = () =>{
        return dataManager.getAll('messages')
            .then((messages)=> {
                setMessages(messages);
                console.log(messages)
            })
            .catch((err) => console.error('There was an issue with getting all messages:', err))
            
        }

    const handleFieldChange = (event) =>{
        const stateToChange = {...text}
        console.log(event.target)
        stateToChange[event.target.id]=event.target.value;
        setText(stateToChange) 
    }
    const handleEdit = (e) =>{
        e.preventDefault()
        setIsLoading(true)
        const editedMessage = {
            id: text.id,
            description: text.description
        }
        if (text.description == undefined){setIsLoading(false)}
            else if (text.id !=null){
            dataManager.update('messages', editedMessage)
            .then(() => {
                setIsLoading(false)
                setText()
                setToggle(!toggle)
            })}else{
                dataManager.create('messages', editedMessage)
                .then(() => {
                    setIsLoading(false)
                    setText()
                    setToggle(!toggle)
                })    

            }
    }

     useEffect(() =>{
        getRequests();
    }, [toggle])

    useEffect(() =>{
        console.log(currentUser)
    }, [messages])

    return (
        <div>
        {props.toggle? null:
        <div className= 'MessagesList'>
            <h1>Messages</h1>
            
            {messages.map((message, idx)=> (<MessageCard setText={setText} key={idx} message={message} toggle={toggle} setToggle={setToggle}/>))}
            
        <textarea id='description' value={text?text.description:""} onChange={handleFieldChange} className='message-textarea' type='text' placeholder='Enter Message'></textarea>
            <button onClick={handleEdit} disabled={isLoading} className='send-message'>Send</button>
        </div>
        }       
        </div>
        
    )
}
export default MessageList