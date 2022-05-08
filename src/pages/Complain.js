import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Chatbody from '../components/Chat/Chatbody'
import Chatlist from '../components/Chat/Chatlist'
import Navbar from '../components/Navbar/Navbar'
import { UserContext } from '../context/userContext'
import {io} from 'socket.io-client'

import "./Home/Styled.css"

let socket
const Complain = () => {
  const [contact, setContact] = useState(null)
  const [contacts, setContacts] = useState([])
  // code here
  const [messages, setMessages] = useState([])

  
  // code here
  const [state, dispatch] = useContext(UserContext)
  useEffect(() =>{
      socket = io('http://localhost:5000', {
          auth: {
              token: localStorage.getItem("token")
          },
          // code here
          query: {
              id: state.user.id
          }
      })

      // code here
      // define corresponding socket listener 
      socket.on("new message", () => {
          console.log("contact", contact)
          console.log("triggered", contact?.id)
          socket.emit("load messages", contact?.id)
      })
              
      // listen error sent from server
      socket.on("connect_error", (err) => {
          console.error(err.message); // not authorized
      });
      // code here
      loadContact()
      loadMessages()

      return () => {
          socket.disconnect()
      }
  }, [messages]) // code here

  const loadContact = () => {
      // emit event load admin contact
      socket.emit("load admin contact")
      // listen event to get admin contact

      socket.on("admin contact",async(data)=>{
          const dataContact={
              ...data,
              message: messages.length > 0 ? messages[messages.length - 1].message : "Click here to start message"
          }
          console.log(data);
          setContacts([dataContact])
      })

  }

  // used for active style when click contact
  const onClickContact = (data) => {
      setContact(data)
      // code here
      socket.emit("load messages", data.id)
  }

  // code here
  const loadMessages = (value) => {
      socket.on("admin contact", (data) => {
          
          socket.on("messages",async(data)=>{
              if(data.length>0){
                  const dataMessages = data.map((item)=>({
                      idSender:  item.sender.id,
                      message: item.message
                  }))
                  console.log(dataMessages);
                  setMessages(dataMessages)
              }
              const chatMessages = document.getElementById("chat-messages")
              chatMessages.scrollTop = chatMessages?.scrollHeight
          })

      })
  }

  const onSendMessage = (e)=>{
      if(e.key === 'Enter'){
          const data = {
              idRecipient: contact.id,
              message: e.target.value
          }

          socket.emit("send messages",data)
          e.target.value = ""
      }
  }
  return (
    <div>
      <Navbar/>
      <Container fluid style={{height: '89.5vh'}}>
          <Row>
              <Col md={3} style={{height: '89.5vh'}} className="px-3 border-end border-dark overflow-auto">
                  <Chatlist dataContact={contacts}  clickContact={onClickContact} contact={contact}/>
              </Col>
              <Col md={9} style={{maxHeight: '89.5vh'}} className="px-0">
                  <Chatbody contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}/>
              </Col>
          </Row>
      </Container>
    </div>
  )
}

export default Complain
