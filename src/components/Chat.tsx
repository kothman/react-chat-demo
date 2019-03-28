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
    messageOffset: number,
    fetchingNewMessages: boolean,
    hasMoreMessages: boolean,
    userDetails: any,
}

interface ScrollEvent extends Event {
    target: {
        scrollTop: number,
        addEventListener: any,
        removeEventListener: any,
        dispatchEvent: any
    }
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
            fetchingNewMessages: false,
            hasMoreMessages: true,
            userDetails: {},
        }
        props.socket.on('message', this.handleReceiveMessage);
        props.socket.on('message received', this.enableChatInput);
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
        this.setState({ messageOffset: this.state.messageOffset + 1 })
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
        // don't try and fetch more messages if already in progress or all messages fetched
        if (this.state.fetchingNewMessages || !this.state.hasMoreMessages)
            return;
        this.setState({fetchingNewMessages: true});
        axios.get('/api/v1/messages/' + this.props.channel + '/' + this.state.messageOffset).then((res) => {
            console.log(res.data.messages)
            if (res.data.messages.length === 0) {
                this.setState({hasMoreMessages: false});
                return;
            }
            this.setState({messages: res.data.messages.concat(this.state.messages)});
            if(this.state.viewingPreviousMessages === false) {
                this.scrollChatHistory();
            }
            this.setState({messageOffset: this.state.messageOffset + 20})
        }).catch().then(() => this.setState({ fetchingNewMessages: false }));
    }
    scrollChatHistory = () => {
        let chatDiv: HTMLDivElement = document.querySelector('#chat-history');
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }
    handleUserScroll = (e: ScrollEvent) => {
        if (e.target.scrollTop <= 50 && !this.state.fetchingNewMessages)
            return this.retrieveMessages();
        if (this.state.scrolling) {
            return;
        }
        this.setState({scrolling: true});
        
        clearTimeout(this.state.scrollingTimeout);
        this.setState({scrollingTimeout: window.setTimeout(() => {
            this.setState({scrolling: false});
            let chatDiv: HTMLElement | any = e.target;
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
        this.retrieveMessages();
        let chatDiv: HTMLElement = document.querySelector('#chat-history');
        chatDiv.addEventListener('scroll', this.handleUserScroll);
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
                            <div>timestamp: {date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
                        </div> :
                    <span></span>
                    }
                </Modal>
                <span className="message-email" onClick={() => { this.handleDisplayUserDetails(modalId, m.userEmail) }}>{m.userEmail}</span>
                <span className="message-content">{m.text}</span>
                <span className="message-date">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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