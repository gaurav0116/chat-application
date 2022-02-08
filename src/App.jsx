import { ChatEngine } from 'react-chat-engine'      // import React chat engine module  
import ChatFeed from './components/ChatFeed'      // import chat feed from component
import LoginForm from './components/LoginForm'
import './App.css'

const App = () => {
  if (!localStorage.getItem('username')) return <LoginForm />    // if user not login so first of all login 


  return (
    <ChatEngine
      height="100vh"
      projectID="ce14c3d4-b21e-4bce-80b5-1fa5af0835d8"
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  )
}

export default App
