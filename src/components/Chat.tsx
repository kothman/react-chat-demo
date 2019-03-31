import * as React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import Modal from './Modal';
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
    userDetails: any, // @todo create new reduer to store user details
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
        }
    }
    handleSendMessage = (e: React.FormEvent | React.KeyboardEvent) => {
        e.preventDefault();
        let textarea: HTMLTextAreaElement = document.querySelector('#chat-input-textarea');
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
        let chatDiv: HTMLDivElement = document.querySelector('#chat-history');
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
    componentDidMount = () => {
        if(this.props.currentChannel.messages.length === 0) {
            this.props.retrieveMessages().then(() => {
                this.scrollChatHistory();
                let chatDiv: HTMLElement = document.querySelector('#chat-history');
                chatDiv.addEventListener('scroll', this.handleUserScroll);
            });
        } else {
            this.scrollChatHistory();
        }
    }
    componentWillUnmount = () => {
        document.querySelector('#chat-history')
            .removeEventListener('scroll', this.handleUserScroll);
        this.props.socket.removeEventListener('message', this.handleReceiveMessage);
        this.props.socket.removeEventListener('message received', this.enableChatInput);
        if (this.state.scrollingTimeout) clearTimeout(this.state.scrollingTimeout);
    }
    render() {
        let messages: JSX.Element[] = [];
        if (this.props.currentChannel && this.props.currentChannel.messages) {
            this.props.currentChannel.messages.forEach((m: Message) => {
                let date: Date = new Date(m.created);
                let messageId = 'message-' + m['_id'];
                let modalId = 'modal-' + messageId;
                messages.push(<div key={m['_id']} className="message" >
                    <Modal title="User Details">
                        {this.state.userDetails[m.userEmail] ?
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
                            </div> :
                            <span></span>
                        }
                    </Modal>
                    <span className="message-email" onClick={() => { this.handleDisplayUserDetails(modalId, m.userEmail) }}>{m.userEmail}</span>
                    <span className="message-content">{m.text}</span>
                    <span className="message-date">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>);
            });
        }
        
        return (
            <div className="chat-container">
                <div id="chat-history" className="chat-history">
                    { this.props.currentChannel.fetchingNewMessages ?
                        <div className="message message-loading">
                            <div className="message-content">Loading more messages...</div>
                        </div> : <div></div>
                    }
                    {messages}
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