import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Chatbody from "../components/Chat/Chatbody";
import Chatlist from "../components/Chat/Chatlist";
import Navbar from "../components/Navbar/Navbar";
import { io } from "socket.io-client";
import "./Home/Styled.css";
import { UserContext } from "../context/userContext";

let socket;

const Admincomplain = () => {
    const [contact, setContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);
    const [state] = useContext(UserContext);
  
  
    // connect to server in useEffect function
    useEffect(() => {
      socket = io("http://localhost:5000", {
        auth: {
          token: localStorage.getItem("token"), // we must set options to get access to socket server
        },
        query: {
          id: state.user.id,
        },
      });
  
      
  
      // define corresponding socket listener
      socket.on("new message", () => {
        console.log("contact", contact);
        console.log("triggered", contact?.id);
        socket.emit("load messages", contact?.id);
      });
  
  
      loadContact();
      loadMessages();
  
      // listen error sent from server
      socket.on("connect_error", (err) => {
        console.error(err.message); // not authorized
      });
  
      return () => {
        socket.disconnect();
      };
    }, [messages]);
  
    const loadContact = () => {
      // emit event to load admin contact
      socket.emit("load customers contact");
  
      // listen event to get admin contact
      socket.on("customers contact", (data) => {
        let dataContact = data.filter((item) => item.status !== "admin" && (item.recipientMessage.length >= 0 || item.senderMessage.length >= 0));
  
        console.log(data);
        dataContact = dataContact.map((item) => {
          return {
            ...item,
            message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : "Click here to start message",
          };
        });
  
        console.log(data);
        setContacts(dataContact);
      });
    };
  
    const onClickContact = (data) => {
      console.log("On Click Contact ",data);
      setContact(data);
  
      socket.emit("load messages", data.id);
    };
  
    const loadMessages = (value) => {
      // listen event to get admin contact
      socket.on("customers contact", (data) => {
        socket.on("messages", async (data) => {
          if (data.length > 0) {
            const dataMessages = data.map((item) => ({
              idSender: item.sender.id,
              message: item.message,
            }));
            console.log("Data Messages", dataMessages);
            setMessages(dataMessages);
          } else{
            const dataMessages = null
            console.log("Data Messages", dataMessages);
            setMessages(dataMessages);
          }
          const chatMessages = document.getElementById("chat-messages");
          chatMessages.scrollTop = chatMessages?.scrollHeight;
        });
      });
    };
  
    const onSendMessage = (e) => {
      if (e.key === "Enter") {
        const data = {
          idRecipient: contact.id,
          message: e.target.value,
        };
  
        socket.emit("send messages", data);
        e.target.value = "";
      }
    };
  return (
    <div>
      <Navbar />
      <Container fluid style={{ height: "89.5vh" }}>
        <Row>
          <Col
            md={3}
            style={{ height: "89.5vh" }}
            className="px-3 border-end border-dark overflow-auto"
          >
            <Chatlist
              dataContact={contacts}
              clickContact={onClickContact}
              contact={contact}
            />
          </Col>
          <Col md={9} style={{ maxHeight: "89.5vh" }} className="px-0">
            <Chatbody
              contact={contact}
              messages={messages}
              user={state.user}
              sendMessage={onSendMessage}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admincomplain;
