import MessageForm from "./MessageForm";        // Message_Form component
import MyMessage from "./MyMessage";            // My_Message component
import TheirMessage from "./TheirMessage";      // Their_Message component

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];        // curent chat

    // Read Reaceipt function
    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map( (person, index) => person.last_read === message.id && (
            <div
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage:`url(${person.person.avatar})`
                }}
            />
        ))
    }

    // Render Messages component
    const renderMessages = () => {
        const keys = Object.keys(messages);

        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const isMyMessage = userName === message.sender.username;

            return (
                <div key={`msg_${index}`} style={{ width: '100%' }} >
                    <div className="message-block">
                        {isMyMessage 
                        ? <MyMessage message={message} />
                        : <TheirMessage message={message} lastMessage={message[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message,MyMessage)}
                    </div>
                </div>
            )
        })
    }

    if (!chat) return 'Loding ...';

    return (
        <div className="chat-feed">
            <div className="ce-chat-form-container">
                <div className="chat-title" >{chat.title}</div>
                <div className="chat-subtitle" >
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: '100px' }} />
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    );

}

export default ChatFeed;