import PropTypes from "prop-types";

const Message = ({role, content}) => {

    return (
        <div className={`message ${role}`}>
            <p className = {`mb-4 ${role === 'user' ? 'text-right' : 'text-left'}`}>
                {content}
            </p>
        </div>
    )
}

Message.propTypes = {
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}



export default Message;