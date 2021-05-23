import React, { useState, useEffect } from "react";
import "./App.css";
import {FormControl, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from 'firebase';
import FlipMove from 'react-flip-move';import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUserName] = useState("");

  useEffect(() => {
   setUserName(prompt("Please enter your name"));
  }, [])

  useEffect(() => {
    db.collection("messages").orderBy("timestamp","desc").onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  },[]);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });   
    setInput("");
  };

  return (
    <div className="App">
      <h1>Welcome to FB Messenger Clone</h1>
      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" />
      <h5 className="app__h4">Logged in as {username}</h5>
      <h6 className="app__h6">No authentication required. Chat will be cleared every week.</h6>
      <h6 className="app__h6"> Work in progress.</h6>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input 
           className="app__input"
           placeholder="Enter a message..."
           value={input}
           onChange={(event) => setInput(event.target.value)}
           />
           <IconButton
            className="app__iconButton"
            type="submit"
            variant="contained"
            color="primary"
            disabled={!input}
            onClick={sendMessage}
           >
             <SendIcon/>
           </IconButton>
        </FormControl>

      </form>

      <FlipMove>
      {messages.map(({id, message}) => (
        <Message key={id} username={username}
        message={message}/>
      ))
      }
      </FlipMove> 
    </div>
  );
}

export default App;
