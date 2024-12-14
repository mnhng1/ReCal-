import Message from './Message';
import PropTypes from 'prop-types';
import InputField from './InputField';
const ChatWindow = ({messages, onSend}) => {
    return(
        <div className='flex flex-col h-full'>
            <div className='flex-1 overflow-y-auto p-4'>
                {messages.map((message, index) => (
                    <Message key={index} role={message.role} content={message.content} />
                ))}
            </div>
            <InputField onSend={onSend} />  
        </div>
    )
}

ChatWindow.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            role: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        })
    ).isRequired,
    onSend: PropTypes.func.isRequired
}

export default ChatWindow