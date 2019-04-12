import {State, Channel, Message} from '../reducers/channels';
import axios, { AxiosResponse, AxiosError } from 'axios';

import {addError, addInfo} from './notificationsActions';

export const ADD_CHANNELS = 'ADD_CHANNELS';
export const SET_CHANNEL_FETCHING_NEW_MESSAGES = 'SET_CHANNEL_FETCHING_NEW_MESSAGES';
export const SET_CHANNEL_HAS_MORE_MESSAGES = 'SET_CHANNEL_HAS_MORE_MESSAGE';
export const ADD_RECEIVED_CHANNEL_MESSAGE = 'ADD_RECEIVED_CHANNEL_MESSAGE';
export const ADD_RETRIEVED_CHANNEL_MESSAGES = 'ADD_RETRIEVED_CHANNEL_MESSAGES';
export const INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET = 'INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET';
export const RETRIEVE_CHANNEL_MESSAGES = 'RETRIEVE_CHANNEL_MESSAGES';
export const CLEAR_CHANNELS_DATA = 'CLEAR_CHANNELS_DATA';

export const addChannels = (channelNames: string[]) => {
    let channels: State = [];
    channelNames.forEach((name: string) => {
        channels.push({
            name: name,
            messages: [],
            retrieveMessagesOffset: 0,
            hasMoreMessages: true,
            fetchingNewMessages: false
        });
    });
    return {
        type: ADD_CHANNELS,
        data: { channels: channels }
    };
}

export const incrementChannelRetrieveMessagesOffset = (channel: string, n: number) => {
    return {
        type: INCREMENT_CHANNEL_RETRIEVE_MESSAGES_OFFSET,
        data: {
            channel: channel,
            increment: n
        }
    };
}

export const setChannelFetchingNewMessages = (channel: string, isFetching: boolean) => {
    return {
        type: SET_CHANNEL_FETCHING_NEW_MESSAGES,
        data: {
            channelName: channel,
            isFetching: isFetching
        }
    };
}

export const setChannelHasMoreMessages = (channelName: string, hasMore: boolean) => {
    return {
        type: SET_CHANNEL_HAS_MORE_MESSAGES,
        data: { channelName: channelName, hasMore: hasMore }
    };
}

export const addReceivedChannelMessage = (channelName: string, message: Message) => {
    return {
        type: ADD_RECEIVED_CHANNEL_MESSAGE,
        data: { message: message, channelName: channelName }
    };
}

export const addRetrievedChannelMessages = (channelName: string, messages: Message[]) => {
    return {
        type: ADD_RETRIEVED_CHANNEL_MESSAGES,
        data: {channelName: channelName, messages: messages}
    };
}

export const clearChannelsData = () => {
    return {
        type: CLEAR_CHANNELS_DATA
    }
}

/* Async Actions */

export const fetchChannels = () => {
    return (dispatch: any)  => {
        return axios.get('/api/v1/channels').then((res: AxiosResponse) => {
            let channels = res.data.channels.map( (c: {name: string, _id: string}) => {
                return c.name;
            });
            return dispatch(addChannels(channels));
        }).catch((err: AxiosError) => {
            console.log(err);
            return dispatch(addError('Something went wrong while trying to fetch the channels'));
        });
    }
}

export const retrieveChannelMessages = (channelName: string) => {
    return async (dispatch: any, getState: any) => {
        let channel: Channel = getState().channels.find( (c: Channel) => {
            return c.name === channelName;
        })
        if (!channel || channel.fetchingNewMessages || !channel.hasMoreMessages) {
            console.log('Retrieve Channel Messages dispatched with incorrect channel name or while already fetching messages',
                        channelName,
                        getState());
            return Promise.resolve();
        }
        dispatch(setChannelFetchingNewMessages(channel.name, true));
        return axios.get('/api/v1/messages/' + channel.name + '/' + channel.retrieveMessagesOffset).then((res: AxiosResponse) => {
            if (res.data.messages.length === 0) {
                dispatch(setChannelHasMoreMessages(channel.name, false));
                return res;
            }
            dispatch(incrementChannelRetrieveMessagesOffset(channelName, 20));
            dispatch(addRetrievedChannelMessages(channel.name, res.data.messages))
        }).catch((err: AxiosError) => {
            console.log('Error fetching messages', channel, err);
            dispatch(addError('Something went wrong while trying to fetch messages'));
        }).then(() => {
            return dispatch(setChannelFetchingNewMessages(channel.name, false));
        });
    }
}

export const deleteChannel = (channelName: string) => {
    return (dispatch: any) => {
        return axios.get('/api/v1/channel/delete/' + channelName).
            then((res: AxiosResponse) => {
                dispatch(addInfo('Channel deleted'));
                return dispatch(fetchChannels());
            }).catch((err: AxiosError) => {
                console.log('Error deleting channel', err);
                return dispatch(addError(err.response.data.error));
            });
    };
}

export const addChannel = (channelName: string) => {
    return (dispatch: any) => {
        return axios.post('/api/v1/channel/create', {
            channelName: channelName
        }).then((res: AxiosResponse) => {
            dispatch(addInfo('Channel created'));
            return dispatch(fetchChannels());
        }).catch((err: AxiosError) => {
            console.log('Error creating chanel', err);
            return dispatch(addError(err.response.data.error));
        })
    };
}
