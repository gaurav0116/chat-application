import React, { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';      // React Chat enging pre-bulid components 
import { SendOutlined, PictureOutlined } from '@ant-design/icons';      // Use Ant - design icons 

const MessageForm = (props) => {

    const { chatId, creds } = props;    // Object diss-structuring

    const [value, setValue] = useState('')      // Hooks for value attribute

    // Handle Submit function
    const handleSubmit = (event) => {
        event.preventDefault();

        const text = value.trim();      // trim is terminat the starting & ending space of message

        if (text.length > 0) sendMessage(creds, chatId, { text });
        setValue('')    // After the sending message reset the value.
    }

    // Handle Change function
    const handleChange = (event) => {
        setValue(event.target.value);

        isTyping(props, chatId);
    }

    const handleUpload = (event) => {
        sendMessage(creds, chatId, { files: event.target.files, text: '' });
    };

    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input
                className='message-input'
                placeholder='Type a Message ...'
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />

            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon" />
                </span>
            </label>

            <input
                type="file"
                multiple={false}
                id="upload-button"
                style={{ display: 'none' }}
                onChange={handleUpload.bind(this)}
            />

            <button type="submit" className="send-button">
                <SendOutlined className="send-icon" />
            </button>
        </form>
    );
};

export default MessageForm;

