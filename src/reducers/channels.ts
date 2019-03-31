import {ADD_CHANNELS,
        SET_CHANNEL_FETCHING_NEW_MESSAGES,
        SET_CHANNEL_HAS_MORE_MESSAGES,
        ADD_RECEIVED_CHANNEL_MESSAGE,
        ADD_RETRIEVED_CHANNEL_MESSAGES,
        INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET}
    from '../actions/channelsActions';

export interface Message {
    userEmail: string,
    created: string,
    _id: string,
    text: string
}

export interface Channel {
    name: string,
    messages: Message[],
    retrieveMessagesOffset: number,
    hasMoreMessages: boolean
    fetchingNewMessages: boolean
}

export interface State extends Array<Channel> {

}

interface Action {
    type: string,
    data: any
}

let initialState: State = [];

export const channelExists = (channels: Channel[] | State, channelName: string): any =>  {
    let channel = channels.find( (c: Channel) => {
        return c.name === channelName;
    });
    if (!channel) return false;
    return channel;
}

export default function (state: State = initialState, action: Action) {
    switch(action.type) {
        case ADD_CHANNELS:
            return action.data.channels;
        case INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET: {
            let channel: Channel = channelExists(state, action.data.channel);
            let increment: number = action.data.increment;
            if (!channel) {
                console.log('Unknown channel while incrementing messages offset', action);
                return state;
            }
            let newChannels: Channel[] = state.map( (c: Channel) => {
                if(c.name === channel.name) {
                    c.retrieveMessagesOffset += increment;
                }
                return c;
            });
            return newChannels;
        }
        case SET_CHANNEL_FETCHING_NEW_MESSAGES:
            let channel: Channel = channelExists(state, action.data.channelName);
            if (!channel) {
                console.log('Unknown channel while fetching new messages', action);
                return state;
            }
            let newChannels: Channel[] = state.map( (c: Channel) => {
                if (c.name === action.data.channelName) {
                    c.fetchingNewMessages = action.data.isFetching;
                }
                return c;
            });
            return newChannels;
        case SET_CHANNEL_HAS_MORE_MESSAGES: {
            let channel: Channel = channelExists(state, action.data.channelName);
            let hasMore: boolean = action.data.hasMore;
            if (!channel) {
                console.log('Unknown channel while setting hasMore messages', action);
                return state;
            }
            let newChannels: Channel[] = state.map( (c: Channel) => {
                if (c.name === action.data.channelName)
                    c.hasMoreMessages = hasMore;
                return c;
            });
            return newChannels;
        }
        case ADD_RETRIEVED_CHANNEL_MESSAGES: {
            let retrievedMessages: Message[] = action.data.messages;
            let channelName: string = action.data.channelName;
            let channel: Channel = channelExists(state, channelName);
            if(!channel) {
                console.log('Unknown channel while adding retrieved channel messages', action);
                return state;
            }
            let newChannels: Channel[] = state.map( (c: Channel) => {
                if (c.name === channelName)
                    c.messages = retrievedMessages.concat(c.messages);//c.messages.concat(messages);
                return c;
            });
            return newChannels;
        }
        case ADD_RECEIVED_CHANNEL_MESSAGE: {
            let receivedMessage = action.data.message;
            let channelName = action.data.channelName;
            let channel: Channel = channelExists(state, channelName);
            if (!channel) {
                console.log('Unknown channel while adding received message', state, action);
                return state;
            }
            let newChannels: Channel[] = state.map((c: Channel) => {
                if(c.name === channelName) 
                    c.messages = c.messages.concat([receivedMessage]);
                return c;
            })
            return newChannels;
        }
        default:
            return state;
    }
}