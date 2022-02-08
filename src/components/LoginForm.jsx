import React, {useState} from "react";
import axios from "axios";

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Username & Password => chatengine -> give message
        const  authObject = { 'Project-ID': 'ce14c3d4-b21e-4bce-80b5-1fa5af0835d8', 'User-Name': username, 'User-Secret': password };

        try {
            await axios.get('https://api.chatengine.io/chats', {headers: authObject});

            // Work out -> logged in

            localStorage.setItem('username', username);     // store username in local storage
            localStorage.setItem('password', password);     // store password in local storage

            window.location.reload();
        } catch (error) {
            // error -> try with new username
            setError('Oops! Invalid Authentication...');
        }
    }

    return(
        <div className="wrapper">
            <div className="form">
                <h1 className="title" >Chat Application</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={username} onChange={ (event) => setUsername(event.target.value) } className="input" placeholder="Enter Username" required />
                        <input type="password" value={password} onChange={ (event) => setPassword(event.target.value) } className="input" placeholder="Enter Password" required />
                        <div align="center">
                            <button type="submit" className="button" >
                                <span> Let's Start </span>
                            </button>        
                        </div>
                        <h2 className="error">{error}</h2>
                    </form>
            </div>
        </div>
    )

}

export default LoginForm;