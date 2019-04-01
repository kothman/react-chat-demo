import * as React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Modal from './Modal';
import LoadingFadeIn from './LoadingFadeIn';

import modalHelpers from '../lib/modalHelpers';
import { retrieveChannelMessages, incrementChannelRetrieveMessagesOffset, addReceivedChannelMessage } from '../actions/channelsActions';
import { Channel, Message } from '../reducers/channels';

interface Props {
    socket: SocketIOClient.Socket,
    channel: string,
}

interface State {
    textareaValue: string,
    chatInputEnabled: boolean, 
    viewingPreviousMessages: boolean,
    scrolling: boolean,
    scrollingTimeout: any,
    userDetails: any, // @todo create new reduer to store user details,
    currentMessage: Message | any
}

interface ScrollEvent extends Event {
    target: {
        scrollTop: number,
        addEventListener: any,
        removeEventListener: any,
        dispatchEvent: any
    }
}

class Chat extends React.Component<Props | any, State> {
    private ref: React.RefObject<HTMLDivElement>;
    constructor(props: Props) {
        super(props);

        this.props.socket.on('message', this.handleReceiveMessage);
        this.props.socket.on('message received', this.enableChatInput);

        this.state = {
            textareaValue: '',
            chatInputEnabled: true,
            viewingPreviousMessages: false,
            scrolling: false,
            scrollingTimeout: false,
            userDetails: {},
            currentMessage: false
        }
        this.ref = React.createRef();
    }
    handleSendMessage = (e: React.FormEvent | React.KeyboardEvent) => {
        e.preventDefault();
        let textarea: any = document.querySelector('#chat-input-textarea');
        this.props.socket.emit('message', { text: textarea.value, channel: this.props.channel })
        this.setState(Object.assign({}, this.state, {chatInputEnabled: false}));
    }
    handleReceiveMessage = (message: Message) => {
        console.log('Message received', message);
        this.props.addReceivedMessageData(message);
        if (this.state.viewingPreviousMessages === false) {
            this.scrollChatHistory();
        }
        this.props.incrementRetrieveOffset(1);
    }
    handleKeyPress = (e: React.KeyboardEvent | any) => {
        if (e.key === 'Enter') {
            return this.handleSendMessage(e);
        }
    }
    handleTextareaChange = (e: React.ChangeEvent | any) => {
        this.setState({ textareaValue: e.target.value });
    }
    enableChatInput = () => {
        this.setState({ chatInputEnabled: true });
        this.setState({ textareaValue: '' });
    }
    scrollChatHistory = () => {
        let chatDiv: HTMLDivElement = this.ref.current;
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }
    handleUserScroll = (e: ScrollEvent) => {
        if (e.target.scrollTop <= 600 && !this.props.currentChannel.fetchingNewMessages && this.props.currentChannel.hasMoreMessages)
            this.props.retrieveMessages();
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
        }, 50)});
    }
    handleDisplayUserDetails = (m: Message) => {
        if (this.state.userDetails[m.userEmail])
            return this.setMessage(m);
        axios.get('/api/v1/user/' + m.userEmail).then((res) => {
            let user: {email: string, _id: string, name: string} = res.data.user;
            this.setState({userDetails: Object.assign({}, this.state.userDetails, 
                {
                    [user.email]: {
                        _id: user['_id'],
                        name: user.name
                    }
                }
            )});
            this.setMessage(m);
        });
    }
    setMessage = (m: Message) => {
        this.setState({currentMessage: m});
    }
    componentDidMount = () => {
        console.log(this.props);
        if(this.props.currentChannel.messages.length === 0 &&
           !this.props.currentChannel.fetchingNewMessages &&
           this.ref && this.ref.current) {
            this.props.retrieveMessages().then(() => {
                this.scrollChatHistory();
                this.ref.current.addEventListener('scroll', this.handleUserScroll);
            });
        } else {
            this.scrollChatHistory();
        }
    }
    componentWillUnmount = () => {
        this.ref.current.removeEventListener('scroll', this.handleUserScroll);
        this.props.socket.removeEventListener('message', this.handleReceiveMessage);
        this.props.socket.removeEventListener('message received', this.enableChatInput);
        if (this.state.scrollingTimeout) clearTimeout(this.state.scrollingTimeout);
    }
    render() {
        let modal: JSX.Element = <div></div>;
        if (this.state.currentMessage !== false) {
            let m: Message = this.state.currentMessage;
            let date: Date = new Date(m.created);
            modal = <Modal title="Message Details"
                           onDismiss={() => this.setState({currentMessage: false})}>
                <div>
                    <div className="row">
                        <span className="column">message id:</span>
                        <span>{m['_id']}</span></div>
                    <div className="row">
                        <span className="column">user id:</span>
                        <span className="column">{this.state.userDetails[m.userEmail]['_id']}</span></div>
                    <div className="row">
                        <span className="column">email:</span>
                        <span className="column">{m.userEmail}</span></div>
                    <div className="row">
                        <span className="column">timestamp:</span>
                        <span className="column">{date.toLocaleDateString()} {date.toLocaleTimeString()}</span></div>
                </div>
            </Modal>
        }
        let messages: JSX.Element[] = [];
        if (this.props.currentChannel && this.props.currentChannel.messages) {
            this.props.currentChannel.messages.forEach((m: Message) => {
                let date: Date = new Date(m.created);
                let messageId = 'message-' + m['_id'];
                messages.push(<div key={m['_id']} className="message" >
                    <span className="message-email" onClick={() => { this.handleDisplayUserDetails(m) }}>{m.userEmail}</span>
                    <span className="message-content">{m.text}</span>
                    <span className="message-date">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>);
            });
        }
        
        return (
            <div className="chat-container">
                <LoadingFadeIn active={this.props.channels.length === 0} />
                {modal}
                <div id="chat-history" className="chat-history" ref={this.ref}>
                    { this.props.currentChannel.fetchingNewMessages ?
                        <div className="message message-loading">
                            <div className="message-content"><span>Loading more messages...</span></div>
                        </div> : <div></div>
                    }
                    {messages}
                    <LoadingFadeIn active={messages.length===0} />
                </div>
                <form className="chat-input" onSubmit={this.handleSendMessage}>
                    <textarea value={this.state.textareaValue} disabled={!this.state.chatInputEnabled} id="chat-input-textarea" onKeyPress={this.handleKeyPress} onChange={this.handleTextareaChange} />
                    <button disabled={!this.state.chatInputEnabled} type="submit" className="chat-send">send</button>
                </form>
            </div>
        );
    }
}

export default connect(
    (state: any, ownProps: Props) => {
        return {
            channels: state.channels,
            currentChannel: state.channels.find( (c: Channel) => {
                return c.name === ownProps.channel;
            })
        };
    }, (dispatch, ownProps: Props) => {
        return {
            retrieveMessages: () => {
                return dispatch<any>(retrieveChannelMessages(ownProps.channel));
            },
            incrementRetrieveOffset: (n: number) => {
                return dispatch(incrementChannelRetrieveMessagesOffset(ownProps.channel, n));
            },
            addReceivedMessageData: (m: Message) => {
                return dispatch(addReceivedChannelMessage(ownProps.channel, m));
            }
        };
    })(Chat);