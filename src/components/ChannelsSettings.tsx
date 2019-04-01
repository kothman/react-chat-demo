import * as React from 'react';
import { connect } from 'react-redux';

import {Channel} from '../reducers/channels';
import {fetchChannels, deleteChannel, addChannel} from '../actions/channelsActions';

import Modal from './Modal';
import LoadingSpinner from './LoadingSpinner';

interface State {
    promptDeleteChannel: string | boolean,
    isDeletingChannel: boolean,
    promptNewChannel: boolean,
    isAddingNewChannel: boolean,
    newChannelName: string,
}

class ChannelsSettings extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            promptDeleteChannel: false,
            isDeletingChannel: false,
            promptNewChannel: false,
            isAddingNewChannel: false,
            newChannelName: ''
        }
    }
    handleUpdateEmail = (e: React.FormEvent) => {
        e.preventDefault();
    }
    promptDeleteModal = (channelName: string) => {
        this.setState({promptDeleteChannel: channelName});
    }
    confirmDeleteModal = () => {
        this.setState({ isDeletingChannel: true });
        this.props.removeChannel(this.state.promptDeleteChannel).then(() => {
            this.setState({ promptDeleteChannel: false })
            this.setState({ isDeletingChannel: false });
        })
    }
    updateNewChannelName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({newChannelName: e.target.value});
    }
    confirmNewChannel = () => {
        this.setState({ isAddingNewChannel: true });
        this.props.addChannel(this.state.newChannelName).then(() => {
            this.setState({ promptNewChannel: false });
            this.setState({ isAddingNewChannel: false });
            this.setState({ newChannelName: '' });
        });
    }
    componentDidMount = () => {
        this.props.fetchChannels();
    }
    
    render() {
        let channels: JSX.Element[] = [];
        this.props.channels().forEach((c: Channel) => {
            channels.push(
                <div className="channel" key={c.name}>
                    {c.name}
                    { this.props.channels().length > 1 ?
                        <div className="delete" onClick={() => {this.promptDeleteModal(c.name)}}><i className="material-icons">delete</i></div>
                    : <div></div> }
                </div>
            );
        })

        return <div className="channels-settings">
            { this.state.promptDeleteChannel !== false ?
                <Modal
                    title="Confirm deletion"
                    onDismiss={() => {
                        this.setState({promptDeleteChannel: false})
                    }}
                    onConfirm={this.confirmDeleteModal}
                    canConfirm={true}
                    confirmText={this.state.isDeletingChannel ? 'please wait' : 'delete'}
                    confirming={this.state.isDeletingChannel}>
                    <div>
                        Are you sure you want to delete the channel "{this.state.promptDeleteChannel}"?
                    </div>
                </Modal> : <div></div>
            } { this.state.promptNewChannel !== false ?
                <Modal
                    title="New Channel"
                    onDismiss={() => this.setState({promptNewChannel: false})}
                    onConfirm={() => this.confirmNewChannel()}
                    canConfirm={true}
                    confirmText={this.state.isAddingNewChannel ? 'please wait' : 'create'}
                    confirming={this.state.isAddingNewChannel}>
                    <form onSubmit={(e: React.FormEvent) => {
                        e.preventDefault();
                        this.confirmNewChannel();
                    }}>
                        <div className="input-group">
                            <label htmlFor="new-channel-name">name:</label>
                            <input type="text" id="new-channel-name" value={this.state.newChannelName} onChange={this.updateNewChannelName} />
                        </div>
                    </form>
                    </Modal> : <div></div>
            }
            <div className="settings-group">
                <div className="subtitle">
                    Add/Remove Channels
                    <i onClick={() => this.setState({promptNewChannel: true})}
                       className="material-icons add-channel-icon">add_box</i></div>
                <div className="channels">
                    {channels.length > 0 ? channels : <LoadingSpinner />}
                </div>
            </div>
        </div>;
    }
}

export default connect((state: any) => {
    return {
        channels: () => {
            return state.channels.sort((a: Channel, b: Channel) => {
                let nameA: string = a.name.toUpperCase();
                let nameB: string = b.name.toUpperCase();
                return (nameA < nameB) ? -1 : (nameB < nameA) ? 1 : 0;
            });
        }
    };
}, (dispatch) => {
    return {
        fetchChannels: () => { return dispatch<any>(fetchChannels()); },
        addChannel: (name: string) => { return dispatch<any>(addChannel(name)); },
        removeChannel: (name: string) => { return dispatch<any>(deleteChannel(name)); }
    };
})(ChannelsSettings);