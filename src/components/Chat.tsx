import * as React from 'react';
import axios from 'axios';

import Modal from './Modal';
import modalHelpers from '../lib/modalHelpers';

interface Props {
    socket: SocketIOClient.Socket,
    channel: string
}

interface State {
    chatInputEnabled: boolean,
    messages: {
        userEmail: string,
        created: string,
        _id: string,
        text: string
    }[],
    viewingPreviousMessages: boolean,
    scrolling: boolean,
    scrollingTimeout: any,
    messageOffset: number
    userDetails: any
}

class Chat extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            chatInputEnabled: true,
            messages: [],
            viewingPreviousMessages: false,
            scrolling: false,
            scrollingTimeout: false,
            messageOffset: 0,
            userDetails: {},
        }
        props.socket.on('message', this.handleReceiveMessage);
        props.socket.on('message received', this.enableChatInput);
        this.retrieveMessages();
    }
    handleSendMessage = (e: React.FormEvent | React.KeyboardEvent) => {
        e.preventDefault();
        let textarea: HTMLTextAreaElement = document.querySelector('#chat-input-textarea');
        this.props.socket.emit('message', { text: textarea.value, channel: this.props.channel })
        this.setState(Object.assign({}, this.state, {chatInputEnabled: false}));
    }
    handleReceiveMessage = (message: {_id: string, userEmail: string, text: string, created: string}) => {
        console.log('message received', message);
        this.setState(Object.assign({}, this.state, {messages: this.state.messages.concat([message])} ));
        if (this.state.viewingPreviousMessages === false) {
            this.scrollChatHistory();
        }
    }
    handleKeyPress = (e: React.KeyboardEvent | any) => {
        if (e.key === 'Enter') {
            return this.handleSendMessage(e);
        }
    }
    enableChatInput = () => {
        this.setState(Object.assign({}, this.state, { chatInputEnabled: true }));
        let textarea: HTMLTextAreaElement = document.querySelector('#chat-input-textarea');
        textarea.value = '';
    }
    retrieveMessages = () => {
        axios.get('/api/v1/messages/' + this.props.channel).then((res) => {
            console.log(res.data.messages)
            this.setState(Object.assign({}, this.state, {messages: res.data.messages}));
            if(this.state.viewingPreviousMessages === false) {
                this.scrollChatHistory();
            }
        });
    }
    scrollChatHistory = () => {
        let chatDiv: HTMLDivElement = document.querySelector('#chat-history');
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }
    handleUserScroll = () => {
        if (this.state.scrolling)
            return;
        this.setState({scrolling: true});
        
        clearTimeout(this.state.scrollingTimeout);
        this.setState({scrollingTimeout: window.setTimeout(() => {
            this.setState({scrolling: false});
            let chatDiv: HTMLDivElement = document.querySelector('#chat-history');
            if (chatDiv.offsetHeight + chatDiv.scrollTop >= chatDiv.scrollHeight) {
                this.setState({ viewingPreviousMessages: false })
            } else {
                this.setState({ viewingPreviousMessages: true });
            }
        }, 1000)});
    }
    handleDisplayUserDetails = (modalId: string, email: string) => {
        if (this.state.userDetails[email])
            return modalHelpers.toggle(modalId);
        axios.get('/api/v1/user/' + email).then((res) => {
            let user: {email: string, _id: string, name: string} = res.data.user;
            this.setState({userDetails: Object.assign({}, this.state.userDetails, 
                {
                    [user.email]: {
                        _id: user['_id'],
                        name: user.name
                    }
                }
            )});
            modalHelpers.toggle(modalId);
        });
    }
    componentDidUpdate = (prevProps: Props) => {
        if (this.props.channel !== prevProps.channel) {
            this.setState({ messages: [] });
            this.retrieveMessages();
        }
    }
    componentDidMount = () => {
        document.querySelector('#chat-history')
            .addEventListener('scroll', this.handleUserScroll);
    }
    componentWillUnmount = () => {
        document.querySelector('#chat-history')
            .removeEventListener('scroll', this.handleUserScroll);
    }
    render() {
        let messages: JSX.Element[] = [];
        this.state.messages.forEach((m) => {
            let date: Date = new Date(m.created);
            let messageId = 'message-' + m['_id'];
            let modalId = 'modal-' + messageId;
            messages.push(<div key={m['_id']} className="message" >
                <Modal id={modalId} title="User Details">
                    { this.state.userDetails[m.userEmail] ?
                        <div>
                            <div>message id: {m['_id']}</div>
                            <div>user id: {this.state.userDetails[m.userEmail]['_id']}</div>
                            <div>email: {m.userEmail}</div> 
                        </div> :
                    <span></span>
                    }
                </Modal>
                <span className="message-email" onClick={() => { this.handleDisplayUserDetails(modalId, m.userEmail) }}>{m.userEmail}</span>
                <span className="message-content">{m.text}</span>
                <span className="message-date">{date.toDateString()}</span>
            </div>);
        });
        return (
            <div className="chat-container">
                <div id="chat-history" className="chat-history">
                    {messages}
                </div>
                <form className="chat-input" onSubmit={this.handleSendMessage}>
                    <textarea disabled={!this.state.chatInputEnabled} id="chat-input-textarea" onKeyPress={this.handleKeyPress}></textarea>
                    <button disabled={!this.state.chatInputEnabled} type="submit" className="chat-send">send</button>
                </form>
            </div>
        );
    }
}

export default Chat;